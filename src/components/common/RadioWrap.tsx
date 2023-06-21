import React, { Fragment } from "react";
import NullChecker from "../../utils/NullChecker";

interface Option {
    name : string,
    id : string,
    htmlFor : string,
    content : string
}

interface PropsType {
    inputTitle : string,
    options : Option[]
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
                    props.options.map((option) => (
                        <Fragment key={option.id}>
                            <input type="radio" name={option.name} id={option.id}/>
                            <label htmlFor={option.htmlFor}>{option.content}</label>
                        </Fragment>
                    ))
                }
            </div>
        </div>
    )
}

export default RadioWrap;