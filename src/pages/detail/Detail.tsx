import React, { useEffect, useState } from "react";
import TitleWrap from "../../components/common/TitleWrap";
import ImgModifyIcon from "../../assets/images/icon/ic_modify_btn.png";
import LevelCard from "../../components/detail/LevelCard";
import RootStore from "../../store/RootStore";
import ExchangeWrap from "../../components/detail/ExchangeWrap";
import Sheet, { type SheetProps } from "react-dynamic-bottom-sheet";
import { useNavigate } from "react-router-dom";
import MainRegister from "../../components/main/MainRegister";
import IcPlusBtn from "../../assets/images/icon/ic_plus_btn_white.svg";

const Detail = () => {

    const navigate = useNavigate();
    const getSequence = new URLSearchParams(window.location.search).get("sequence");
    const [detailInfo, setDetailInfo] = useState<any>();
    const [registerBtn, setRegisterBtn] = useState<boolean>(false);

    const sheetProps: SheetProps = {
        isVisible: true,
        isEdge: true,
        initialPosition: "edge",
        sheetLimit: [37, 50],
        defaultHeight: .37
    };
    useEffect(() => {
        apiCallSet(getSequence);
    }, []);

    const apiCallSet = async (sequence: any) => {
        await RootStore.friendStore.getFriendDetail(sequence, setDetailInfo);
    }

    // 추가 버튼
    const handleRegisterBtn = () => {
        if (registerBtn) {
            setRegisterBtn(false);
        } else {
            setRegisterBtn(true);
        }
    }

    return (
        <div className="Detail inner">
            <TitleWrap detail={true} title={detailInfo && detailInfo.nickname} relation={detailInfo && detailInfo.relationship} />
            <span className="modify-icon" onClick={() => navigate(`/page/friend?sequence=${getSequence}&edit=edit`)}><img src={ImgModifyIcon} alt="modify-icon" /></span>
            <LevelCard detailInfo={detailInfo && detailInfo} />

            <ExchangeWrap
                detailInfo={detailInfo}
                sequence={getSequence}
            />

            <button type="button" className="add-btn" onClick={() => navigate('/page/relationship', { state: { friendData: detailInfo } })}>
                <span className="add-btn-plus"><img src={IcPlusBtn} alt="ic_plus_btn" /></span>
            </button>

        </div>
    )
}

export default Detail;
