import React from "react";
import IcMindRegister from "../../assets/images/icon/ic_mind_register.png";
import IcFriendRegister from "../../assets/images/icon/ic_friend_register.png";
import {useNavigate} from "react-router-dom";
import IcPlusBtnOg from "../../assets/images/icon/ic_plus_btn_orange.png";

interface PropsType{
    handleRegisterBtn: () => void,
}

const MainRegister = ({handleRegisterBtn}:PropsType) => {

    let navigate = useNavigate();

    return(
        <div className="MainRegister">
            <div className="register-btn-wrap">
                <button type="button" className="resgister-btn" onClick={() => navigate("/page/relationship")}>
                    <img src={IcMindRegister} alt="mind-icon" />
                    <span className="sm-text">마음 기록하기</span>
                </button>
                <button type="button" className="resgister-btn" onClick={() => navigate("/page/friend")}>
                    <img src={IcFriendRegister} alt="friend-icon" />
                    <span className="sm-text">사람 등록하기</span>
                </button>
                <button type="button" className="cls-btn" onClick={handleRegisterBtn}>
                    <span className="add-btn-plus"><img src={IcPlusBtnOg} alt="ic_plus_btn"/></span>
                </button>
            </div>
        </div>
    )
}

export default MainRegister;
