import React from 'react';
import PropTypes from 'prop-types';

import { useHistory } from 'react-router';

export default function Table(props) {
    const history = useHistory();

    const renderCell = (title, titleId, problem) => {
        const key = `${problem.title}_${titleId}`;
        let className = title;

        switch(title) {
            case 'title':
                return (
                    <td key={key}>
                        <a className={className} onClick={() => history.push(`/problems/${problem[title]}`, problem)}>{problem[title]}</a>
                    </td>
                );

            
            case 'acceptance':
                const { accepted, total } = problem.submissions;
                return (
                    <td key={key}>
                        {(accepted / total * 100).toFixed(2)}%
                    </td>
                );

            case 'difficulty':
                className += ` ${problem[title]}`;
        }

        return <td key={key} className={className}>{problem[title]}</td>;
    }

    return (
        <table className={props.className}>
            <thead>
                <tr>
                    {props.headers.map((head, headIndex) => 
                        <td key={`${head}_${headIndex}`}>{head}</td>    
                    )}
                </tr>
            </thead>
            <tbody>
                {props.data.map((problem, problemIndex) => 
                    <tr key={`${problem.title}_${problemIndex}`}>
                        {props.headers.map((title, titleIndex) => renderCell(title, titleIndex, problem))}
                    </tr>    
                )}
            </tbody>
        </table>
    );
}

Table.propTypes = {
    headers: PropTypes.arrayOf(String).isRequired,
    data: PropTypes.arrayOf(Object).isRequired,

    className: PropTypes.string
}