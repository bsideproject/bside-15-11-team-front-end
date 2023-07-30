import React from "react"
import IcBackBtn from "../../assets/images/icon/ic_back_btn.svg";
import { useNavigate } from "react-router-dom";

interface PropsType{
    title?: string,
    relation?: string,
    detail?: boolean
}

const TitleWrap = ({title, relation, detail}:PropsType) => {

    let navigate = useNavigate();

    return (
        <div className="title-wrap">
            <span className="back-btn" onClick={detail ? () => navigate("/page/main") : () => navigate(-1)} ><img src={IcBackBtn} alt="back-btn" /></span>
            <h2 className="title">{title}</h2>
            <h3 className="relation">{relation}</h3>
        </div>
    )
}

export default TitleWrap;
