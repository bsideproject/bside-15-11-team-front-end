import React from 'react';

const MindType = (props : any) => {
    return (
        <div className="MindWrap">
            <label className="input-title">
                마음의 종류 (필수)
            </label>

            <div className="mind-wrap">
                <input type="radio" name='mind'
                    id='cash'
                    checked={props.defaultSelect === 'cash'}
                    onClick={() => props.onSelect('cash')}
                    readOnly
                />
                <label htmlFor='cash'>
                    현금
                </label>
                <input type="radio" name='mind'
                    id='gift'
                    checked={props.defaultSelect === 'gift'}
                    onClick={() => props.onSelect('gift')}
                    readOnly
                />
                <label htmlFor='gift'>
                    선물
                </label>
            </div>
        </div>
    );
};

export default MindType;
