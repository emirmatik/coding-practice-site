import React, { Component, Fragment } from 'react'
import { get, handleProblemSubmission } from '../common/Utilities';

import Iblize from "iblize";
import { CheckCircle, xCircle } from '../parts/Icons';

export default class Problem extends Component {
    
    constructor(props) {
        super(props);

        const { state } = this.props.location;

        this.state = {
            problemData: state,
            isAccepted: null,
            isLoading: false,  
            results: [],
            editor: null,
        }

        if (state === undefined) {
            this.state.isLoading = true;

            get('/data/problems.json', 'problems', (_k, res) => {
                const problemData = res._data.find(problem => problem.title === this.props.match.params.problem_title);

                this.setState({problemData, isLoading: false});
            })
        }
    };

    componentDidMount = () => {
        const iblize = new Iblize(".editor", {
            theme: 'iblize-light'
        });

        this.setState({ editor: iblize })

        iblize.setValue(this.state.problemData.initialCode);
    };

    onSubmit = e => {
        e.preventDefault();

        const { problemData, editor } = this.state;

        const val = editor.getValue();
        this.setState({ isAccepted: null, results: null }, async () => {
            const { isAccepted, results } = await handleProblemSubmission(val, problemData.title);
    
            this.setState({ isAccepted, results });
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
        const { problemData, isLoading, results } = this.state;

        const className = this.getClassName();

        return (
            <div className="problem">
                {isLoading ? 
                    'loading...'
                :
                    <div className={className}>
                        <h3>{problemData.title}</h3>
                        <div className="mt-3">
                            {problemData.description}
                        </div>
                        <div className="editor mt-3"></div>
                        <button className="btn btn-primary mt-2" onClick={this.onSubmit}>Submit</button>
                        {results === null ?
                        
                            'Fetching results..'
                        :
                            this.renderResults()
                        }
                    </div>
                }
            </div>
        )
    }
}