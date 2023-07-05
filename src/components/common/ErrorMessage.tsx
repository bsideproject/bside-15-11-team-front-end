import React from 'react';

interface PropsType {
    message : string
}

const ErrorMessage = ({message} : PropsType) => {
    return (
        <div className='error-message'>
            <p>{message}</p>
        </div>
    );
};

export default ErrorMessage;