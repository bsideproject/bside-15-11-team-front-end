import React, {useEffect, useState} from "react";
import TitleWrap from "../../components/common/TitleWrap";
import ImgModifyIcon from "../../assets/images/icon/ic_modify_btn.png";
import LevelCard from "../../components/detail/LevelCard";
import ImgBirth from "../../assets/images/icon/ic_birth.png";
import ImgMemo from "../../assets/images/icon/ic_memo.png";
import RootStore from "../../store/RootStore";
import {FriendResponseProto} from "../../prototypes/friend/FriendResponse";

const Detail = () => {

    const getSequence = new URLSearchParams(window.location.search).get("sequence");
    const [detailInfo, setDetailInfo] = useState<any>();

    useEffect(() => {
        apiCallSet(getSequence);
    }, []);
    console.log(detailInfo);
    const apiCallSet = async (sequence:any) => {
        await RootStore.friendStore.getFriendDetail(sequence, setDetailInfo);
    }

    return(
        <div className="Detail inner">
            <TitleWrap title={detailInfo && detailInfo.nickname} relation={detailInfo && detailInfo.relationship} />
            <span className="modify-icon"><img src={ImgModifyIcon} alt="modify-icon"/></span>
            <LevelCard detailInfo={detailInfo && detailInfo} />
            <div className="other-info-wrap">
                <div className="other-info">
                    <div className="other-info-tit"><img src={ImgBirth} alt="birth-icon"/>&nbsp;생일</div>
                    {detailInfo && detailInfo.birth === null ? <div className="other-info-cont">{detailInfo.birth && detailInfo.birth.date.year}년 {detailInfo && detailInfo.birth.date.month}월 {detailInfo && detailInfo.birth.date.day}일 ({detailInfo && detailInfo.birth.isLunar === "N" ? "양력" : detailInfo.birth.isLunar === "Y" ? "음력" : null})</div> : null}
                </div>
                <div className="other-info">
                    <div className="other-info-tit"><img src={ImgMemo} alt="birth-icon"/>&nbsp;메모</div>
                    {detailInfo && <div className="other-info-cont">{detailInfo && detailInfo.memo}</div>}
                </div>
            </div>
        </div>
    )
}

export default Detail;
