import React from "react"
import IcBackBtn from "../../assets/images/icon/ic_back_btn.svg";
import { useNavigate } from "react-router-dom";

interface PropsType{
    title: string,
    relation?: string
}

const TitleWrap = ({title, relation}:PropsType) => {

    let navigate = useNavigate();

    return (
        <div className="title-wrap">
            <span className="back-btn" onClick={() => navigate(-1)}><img src={IcBackBtn} alt="back-btn" /></span>
            <h2 className="title">{title}</h2>
            <h3 className="relation">{relation}</h3>
        </div>
    )
}

export default TitleWrap;
