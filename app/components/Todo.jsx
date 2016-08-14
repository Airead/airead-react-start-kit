import React from 'react';

const Todo = ({ onClick, completed, id, text }) => {
    return (
        <li
            onClick={onClick}
            style={{
                textDecoration: completed ? 'line-through' : 'none'
            }}
        >
            {id}-{text}
        </li>
    );
};

export default Todo;
