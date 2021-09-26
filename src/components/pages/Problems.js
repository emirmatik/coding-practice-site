import React, { PureComponent, Fragment } from 'react'

import { get } from '../common/Utilities';
import Table from '../parts/Table';

import "../../css/problems.scss";

export default class Problems extends PureComponent {
    
    state = {
        problems: [],
        isLoading: true,
    }

    componentDidMount = () => {
        get('http://localhost:5000/problem', "problems", (_k, res) => {
            this.setState({ 
                problems: res, 
                isLoading: false 
            });
        });
    }

    render() {
        const { problems, isLoading } = this.state;

        return (
            <div className="problems">
                {isLoading ? 
                    'loading...'
                :
                    <Fragment>
                        {/* TODO: FILTERS */}
                        <Table 
                            headers={["title", "acceptance", "difficulty"]}
                            data={problems}
                            className="mt-3"
                        />
                    </Fragment>
                }
            </div>
        );
    }
}
