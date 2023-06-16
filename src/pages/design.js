import React from "react"
import IcBackBtn from "../assets/images/icon/ic_back_btn.png";
import InputTextBox from "../components/common/InputTextBox";
import TitleWrap from "../components/common/TitleWrap";

const design = () => {
    return(
        <div className="design" style={{"padding": "20px"}}>
            <br/>
            <br/>
            <TitleWrap title="여기에 제목 입력" />
            <br/>
            <hr/>
            <br/>
            <InputTextBox
                inputTitle="여기에 제목 입력"
                placeholder="입력하세요."
                value=""
                onChange=""
                id=""
            />
            <br/>
            <hr/>
        </div>
    )
}

export default design;
