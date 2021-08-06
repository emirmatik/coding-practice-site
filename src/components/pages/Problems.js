import React, { PureComponent } from 'react'

import { get } from '../common/Utilities';
import Table from '../parts/Table';

import "../../css/problems.scss";

export default class Problems extends PureComponent {
    
    state = {
        problems: [],
        isLoading: true,
    }

    componentDidMount = () => {
        get('/data/problems.json', "problems", (_k, res) => {
            this.setState({ problems: res._data, isLoading: false });
        });
    }

    render() {
        const { problems, isLoading } = this.state;

        return (
            <div>
                Problems
                {isLoading ? 
                    'loading...'
                :
                    <Table 
                        headers={["title", "acceptance", "difficulty"]}
                        data={problems}
                        className="mt-3"
                    />
                }
            </div>
        )
    }
}
