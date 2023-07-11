import React, {useEffect, useState} from "react";
import TitleWrap from "../../components/common/TitleWrap";
import ImgModifyIcon from "../../assets/images/icon/ic_modify_btn.png";
import LevelCard from "../../components/detail/LevelCard";
import ImgBirth from "../../assets/images/icon/ic_birth.png";
import ImgMemo from "../../assets/images/icon/ic_memo.png";
import RootStore from "../../store/RootStore";
import ExchangeWrap from "../../components/detail/ExchangeWrap";
import Sheet, { type SheetProps } from "react-dynamic-bottom-sheet";

const Detail = () => {

    const getSequence = new URLSearchParams(window.location.search).get("sequence");
    const [detailInfo, setDetailInfo] = useState<any>();

    const sheetProps: SheetProps = {
        isVisible: true,
        isEdge: true,
        initialPosition: "edge",
        sheetLimit: [37, 50],
        defaultHeight: .37
    };
    console.log(detailInfo)
    useEffect(() => {
        apiCallSet(getSequence);
    }, []);

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
                    {detailInfo  ?
                        <div className="other-info-cont">{detailInfo && detailInfo.birth?.date?.year}{detailInfo.birth?.date?.year && "년"}&nbsp;
                            {detailInfo && detailInfo.birth?.date?.month}{detailInfo.birth?.date?.month && "월"}&nbsp;
                            {detailInfo && detailInfo.birth?.date?.day}{detailInfo.birth?.date?.day && "일"}&nbsp;
                            {detailInfo && detailInfo.birth?.isLunar === "N" ? "(양력)" : detailInfo.birth?.isLunar === "Y" ? "(음력)" : null}</div> : null
                    }
                </div>
                <div className="other-info">
                    <div className="other-info-tit"><img src={ImgMemo} alt="birth-icon"/>&nbsp;메모</div>
                    {detailInfo && <div className="other-info-cont">{detailInfo && detailInfo.memo}</div>}
                </div>
            </div>
            <Sheet {...sheetProps}>
                <ExchangeWrap sequence={getSequence} />
            </Sheet>

        </div>
    )
}

export default Detail;
