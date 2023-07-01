import React from "react";
import TitleWrap from "../../components/common/TitleWrap";
import ImgModifyIcon from "../../assets/images/icon/ic_modify_btn.png";
import LevelCard from "../../components/detail/LevelCard";
import ImgBirth from "../../assets/images/icon/ic_birth.png";
import ImgMemo from "../../assets/images/icon/ic_memo.png";

const Detail = () => {
    return(
        <div className="Detail inner">
            <TitleWrap title="강호동" relation="친구" />
            <span className="modify-icon"><img src={ImgModifyIcon} alt="modify-icon"/></span>
            <LevelCard />
            <div className="other-info-wrap">
                <div className="other-info">
                    <div className="other-info-tit"><img src={ImgBirth} alt="birth-icon"/>&nbsp;생일</div>
                    <div className="other-info-cont">1992년 8월 29일 (양력)</div>
                </div>
                <div className="other-info">
                    <div className="other-info-tit"><img src={ImgMemo} alt="birth-icon"/>&nbsp;메모</div>
                    <div className="other-info-cont">
                        메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모메모
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Detail;
