import React, { Fragment, useEffect } from "react";
import NullChecker from "../../utils/NullChecker";
import InputTextBox from "./InputTextBox";

interface Option {
    name: string,
    id: string,
    htmlFor: string,
    content: string,
    value: string,
    friendRelation?: any
}

interface PropsType {
    inputTitle: string,
    options: Option[],
    onSelect?: any,
    handleRegister: any,
    friendRelation?: any,
    friendDirectInput?: string
}

const RadioWrap = (props: PropsType) => {

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
                            <input
                                type="radio"
                                name={option.name}
                                id={option.id}
                                onClick={props.onSelect}
                                onChange={props.handleRegister}
                                value={option.value}
                                checked={option.value === props.friendRelation}
                            />
                            <label htmlFor={option.htmlFor}>{option.content}</label>
                        </Fragment>
                    ))
                }
            </div>
            {
                props.friendRelation === "directInput" ?
                    <InputTextBox
                        inputTitle=""
                        placeholder="입력하세요 (최대 8자)"
                        id="friendDirectInput"
                        value={props.friendDirectInput}
                        onChange={props.handleRegister}
                        maxLength={8}
                    /> : null
            }
        </div>
    )
}

export default RadioWrap;
