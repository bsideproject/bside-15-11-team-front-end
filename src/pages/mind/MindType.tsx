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
                       checked={true}
                    onClick={() => props.onSelect('cash')}
                />
                <label htmlFor='cash'>
                    현금
                </label>
                <input type="radio" name='mind'
                    id='gift'
                    onClick={() => props.onSelect('gift')}
                />
                <label htmlFor='gift'>
                    선물
                </label>
            </div>
        </div>
    );
};

export default MindType;
