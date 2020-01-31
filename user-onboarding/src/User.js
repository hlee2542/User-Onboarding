import React from 'react';

const User = (props) => {
    return (
        <div>
            <p>{props.name}</p>
            <p>{props.email}</p>
        </div>
    )
}

export default User;