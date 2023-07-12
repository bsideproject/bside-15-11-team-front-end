import React from 'react';

const EventType = ({selected, setEventType} : any) => {
    return (
        <div className='EventTypeWrap'>
            <input
                type='radio'
                className={selected === 'give' ? 'event-type-btn on' : 'event-type-btn'}
                name='event'
                defaultChecked={selected === 'give'}
                onClick = {() => setEventType('give')}
                id='give' />
            <label htmlFor='give'>준 마음</label>
            <input
                type='radio'
                className={selected === 'take' ? 'event-type-btn on' : 'event-type-btn'}
                name='event'
                defaultChecked={selected === 'take'}
                onClick={() => setEventType('take')}
                id='take' />
            <label htmlFor='take'>받은 마음</label>
        </div>
    );
};

export default EventType;
