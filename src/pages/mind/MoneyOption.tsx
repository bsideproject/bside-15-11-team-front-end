import React, { Fragment } from 'react';

interface PropsType {
    options : string[];
    onSelect : any;
}

const MoneyOption = ({options, onSelect} : PropsType) => {
    return (
        <div className="MoneyOptionWrap">
            
            <div className="money-option-wrap">
                {
                    options.map((option) => (
                        <Fragment key={option}>
                            <input type="radio" name='money' id={option}
                                onClick={() => onSelect(parseInt(option) * 10000)}
                            />
                            <label htmlFor={option}>+{option}만</label>
                        </Fragment>
                    ))
                }
            </div>
        </div>
    );
};

export default MoneyOption;