import React, { PureComponent } from 'react'
import Iblize from "iblize";

import { CheckCircle, xCircle } from '../parts/Icons';

import { post, get } from '../common/Utilities';

export default class Problem extends PureComponent {
    
    state = {
        isLoadingSubmission: false,
        submissionError: null,
        problemData: null,
        isAccepted: null,
        isLoadingInitial: true,  
        results: [],
        editor: null,
    }

    componentDidMount() {
        const { state } = this.props.location;
        
        if (state === undefined) {
            get('http://localhost:5000/problem', 'problems', (_k, res) => {
                const problemData = res.find(problem => problem.title === this.props.match.params.problem_title);

                this.setState({
                    problemData,
                    isLoadingInitial: false,
                }, () => {
                    const iblize = new Iblize(".editor", {
                        theme: 'iblize-light'
                    });
            
                    this.setState({ editor: iblize });
            
                    iblize.setValue(this.state.problemData.initialCode);
                });
            })
        } else {
            this.setState({ 
                problemData: state,
                isLoadingInitial: false
            }, () => {
                const iblize = new Iblize(".editor", {
                    theme: 'iblize-light'
                });
        
                this.setState({ editor: iblize });
        
                iblize.setValue(this.state.problemData.initialCode);
            });
        }
    };

    onSubmit = e => {
        e.preventDefault();

        const { problemData, editor } = this.state;

        const val = editor.getValue();
        this.setState({ 
            isLoadingSubmission: true, 
            isAccepted: null, 
            results: [] 
        }, async () => {
            let submissionError = null;
            const res = await post('http://localhost:5000/problem/submission', null, {submission: val, problemTitle: problemData.title});
            
            const { isAccepted, results } = res;

            if (res.err) {
                submissionError = res.err;
            } 

            this.setState({ 
                isLoadingSubmission: false,
                submissionError,
                isAccepted,
                results
            });
        });
    };

    getClassName = (isAccepted = this.state.isAccepted) => {
        let className = "problem-inner";

        switch(isAccepted) {
            case true:
                className += ' accepted';
                break;
            
            case false:
                className += ' not-accepted';
                break;

            default:
                break;
        }

        return className;
    }

    renderIcon = isAccepted => isAccepted
        ? CheckCircle
        : xCircle;

    renderResults = (results = this.state.results) => (
        results.length > 0 &&
            <div className="problem-results">
                <div>Result</div>
                <div className="problem-results-inner">
                    {results.map(({ isValid, error }, resultIndex) => (
                        <div key={resultIndex} className={`problem-result ${isValid ? 'accepted' : 'not-accepted'}`}>
                            {this.renderIcon(isValid)(18, 18)} 
                            <div className="problem-result-testcase ml-2">Test case #{resultIndex}</div>
                        </div>
                    ))}
                </div>
            </div>        
    );
    
    render() {
        const { isLoadingSubmission, isLoadingInitial, problemData } = this.state;

        const className = this.getClassName();

        return (
            <div className="problem">
                {isLoadingInitial ? 
                    'loading...'
                :
                    <div className={className}>
                        <h3>{problemData.title}</h3>
                        <div className="mt-3">
                            {problemData.description}
                        </div>
                        <div className="editor mt-3"></div>
                        <button className="btn btn-primary mt-2" onClick={this.onSubmit}>Submit</button>
                        {isLoadingSubmission ?
                            'Fetching results..'
                        :
                            this.renderResults()
                        }
                    </div>
                }
            </div>
        );
    }
}