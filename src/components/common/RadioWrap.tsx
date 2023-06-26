import React, { Fragment } from "react";
import NullChecker from "../../utils/NullChecker";

interface Option {
    name : string,
    id : string,
    htmlFor : string,
    content : string,
    value : string
}

interface PropsType {
    inputTitle : string,
    options : Option[],
    onSelect? : any,
    handleRegister: any
}

const RadioWrap = (props : PropsType) => {
    return (
        <div className="RelationWrap">
            {
                !NullChecker.isEmpty(props.inputTitle) &&
                <label className="input-title">{props.inputTitle}</label>
            }
            
            <div className="relation-wrap">
                {
                    props.options.map((option, key) => (
                        <Fragment key={key}>
                            <input type="radio" name={option.name} id={option.id}
                                onClick={props.onSelect} onChange={props.handleRegister}
                                value={option.value}
                            />
                            <label htmlFor={option.htmlFor}>{option.content}</label>
                        </Fragment>
                    ))
                }
            </div>
        </div>
    )
}

export default RadioWrap;