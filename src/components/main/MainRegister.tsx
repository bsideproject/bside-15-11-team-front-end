import React from "react";
import IcMindRegisterOff from "../../assets/images/icon/ic_mind_register_off.svg";
import IcMindRegisterOn from "../../assets/images/icon/ic_mind_register_on.svg";
import IcFriendRegister from "../../assets/images/icon/ic_friend_register.svg";
import {useNavigate} from "react-router-dom";
import IcClsBtn from "../../assets/images/icon/ic_close_btn.svg";

interface PropsType{
    handleRegisterBtn: () => void,
    isEmptyList: boolean
}

const MainRegister = ({handleRegisterBtn, isEmptyList}:PropsType) => {

    let navigate = useNavigate();

    return(
        <div className="MainRegister">
            <div className="register-btn-wrap">
                <button type="button" disabled={isEmptyList} className="resgister-btn" onClick={() => navigate("/page/mind")}>
                    {isEmptyList ? <img src={IcMindRegisterOff} alt="mind-icon" /> : <img src={IcMindRegisterOn} alt="mind-icon" />}
                    <span className="sm-text">마음 기록하기</span>
                </button>
                <button type="button" className="resgister-btn" onClick={() => navigate("/page/friend")}>
                    <img src={IcFriendRegister} alt="friend-icon" />
                    <span className="sm-text">사람 등록하기</span>
                </button>
                <button type="button" className="cls-btn" onClick={handleRegisterBtn}>
                    <span className="add-btn-plus"><img src={IcClsBtn} alt="ic_plus_btn"/></span>
                </button>
            </div>
        </div>
    )
}

export default MainRegister;
