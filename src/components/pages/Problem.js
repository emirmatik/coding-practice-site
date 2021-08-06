import React, { Component, Fragment } from 'react'
import { get } from '../common/Utilities';
import Editor from 'react-simple-code-editor';

export default class Problem extends Component {
    
    constructor(props) {
        super(props);

        const { pathname, state } = this.props.location;

        this.state = {
            problemData: state,
            isLoading: false,  
            rows: new Array(10).fill(0),
            code: `function add(a, b) {
                return a + b;
              }
              `,
        }

        if (state === undefined) {
            this.state.isLoading = true;
            get('/data/problems.json', 'problems', (_k, res) => {
                const problemData = res._data.find(problem => problem.title === this.props.match.params.problem_title);
                console.log(problemData);

                this.setState({problemData, isLoading: false});
            })
        }
    }

    onPress = (e, rowIndex) => {
        switch(e.key.toLowerCase()) {
            case 'enter':
                const { rows } = this.state;
                rows.splice(rowIndex, 0, 'hey');
                this.setState({ rows })
                console.log("hehe");
        }
    }
    
    render() {
        const { problemData, isLoading, rows } = this.state;

        console.log(rows);

        return (
            <div>
                {isLoading ? 
                    'loading...'
                :
                    <Fragment>
                        <h3>{problemData.title}</h3>
                        <div className="mt-3">
                            {problemData.description}
                        </div>
                        <div className="editor">
                            <div className="indexes">
                                {rows.map((row, rowIndex) => (
                                    <span key={rowIndex}>{rowIndex + 1}</span>
                                ))}
                            </div>
                            <div className="rows">
                                {rows.map((row, rowIndex) => (
                                    <div key={rowIndex} className="row">
                                        {/* <span>{rowIndex + 1}</span> */}
                                        <input onKeyDown={this.onPress} defaultValue="code will be here" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Fragment>
                }
            </div>
        )
    }
}
