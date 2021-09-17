// allback = null) => {
// //     const res = await fetch(path);
// //     const data = await res.json();

// //     if (callback !== null) {
// //         callback(key, data)
// //     } else {
// //         return data;
// //     }
// // }

// // export const handleProblemSubmission = async (submission, problemTitle) => {
// //     // submission [string] -> user's solution
// //     // problemName [string] -> problem's name

// //     // var addition = Function("a", "b", "return a + b;");
// //     // alert(addition(5, 3)); // shows '8'

// //     const data = await get('/data/test-cases.json');
// //     console.log(data);
// //     const problem = data._data.find(pr => pr.title === problemTitle);
// //     let isAccepted = true;
// //     let testCaseIndex = 0;

// //     const { solution, testCases } = problem;
    
// //     const usersFunction = new Function(submission);
// //     const solutionFunction = new Function(solution);

// //     console.log(usersFunction(1, 5), solutionFunction(1, 5));

// //     for (let i = 0; i < testCases.length; i++) {
// //         const params = testCases[i];

// //         console.log(usersFunction(...params), solutionFunction(...params))

// //         if (usersFunction(...params) !== solutionFunction(...params)) {
// //             isAccepted = false;
// //             testCaseIndex = i + 1;
// //             break;
// //         }
// //     };

// //     return { isAccepted, testCaseIndex };
// // }