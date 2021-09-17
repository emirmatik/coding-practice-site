const vm = require('vm');
const contextOptions = {
    timeout: 12 * 1000
}

export const get = async (path, key, callback = null) => {
    const res = await fetch(path);
    const data = await res.json();

    if (callback !== null) {
        callback(key, data)
    } else {
        return data;
    }
}

export const handleProblemSubmission = async (submission, problemTitle) => {
    /**
     * @var submission: string => user's solution
     * @var problemName: string => problem's name
     */

    const data = await get('/data/test-cases.json');
    const problem = data._data.find(pr => pr.title === problemTitle);

    const { functionName, solution, testCases } = problem;
    let logs = [];

    try {
        const userContext = {
            console: {
                log: (...args) => logs.push(...args)
            }
        };

        const submissionScript = new vm.Script(submission.replaceAll('const', 'var'));
        submissionScript.runInNewContext(userContext, contextOptions);

        const solutionContext = {};
        const solutionScript = new vm.Script(solution);
        solutionScript.runInNewContext(solutionContext, contextOptions);

        const userFunction = userContext[functionName];
        const solutionFunction = solutionContext[functionName];

        const results = testCases.map((testcase, testcaseIndex) => {
            const result = handleCase(userFunction, solutionFunction, testcase);

            const consoleLog = logs;
            logs = [];

            return { ...result, consoleLog };
        });

        const isAccepted = results.every(result => result.isValid);

        return { isAccepted, results };
    } catch (err) {

        return {
            err,
            results: [],
            isAccepted: null,
        };
    }
}

const handleCase = (userFunction, solutionFunction, params) => {
    let error = null;
    let isValid = false;
    let userResult = null;
    let solutionResult = null;

    try {
        userResult = userFunction(...params);
        solutionResult = solutionFunction(...params);
        isValid = userResult === solutionResult;
    } catch (err) {
        error = err;
    }

    return {
        error,
        isValid,
        userResult,
        solutionResult,
    };
}
