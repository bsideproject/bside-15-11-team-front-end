import React, { Fragment, MouseEventHandler, useEffect, useState } from "react";
import NullChecker from "../../utils/NullChecker";

interface Option {
    name: string,
    id: string,
    htmlFor: string,
    content: string,
    value: string,
}

interface PropsType {
    inputTitle?: string,
    options: Option[],
    onSelect?: any,
    default?: string,
}

const RadioWrap = (props: PropsType) => {

    const [selected, setSelected] = useState<string>();

    useEffect(() => {
        setSelected(props.default);
    }, []);

    const onSelect = (id : string) => {
        setSelected(id);
        props.onSelect(id);
    }

    return (
        <div className="radio-title-wrap">
            {
                !NullChecker.isEmpty(props.inputTitle) &&
                <label className="input-title">{props.inputTitle}</label>
            }

            <div className="radio-wrap">
                {
                    props.options.map((option, key) => (
                        <Fragment key={key}>
                            <input
                                type="radio"
                                name={option.name}
                                id={option.id}
                                onChange={() => onSelect(option.id)}
                                value={option.value}
                                checked={option.id === selected}
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
