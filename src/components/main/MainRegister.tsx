import React from "react";
import IcMindRegister from "../../assets/images/icon/ic_mind_register.png";
import IcFriendRegister from "../../assets/images/icon/ic_friend_register.png";

interface PropsType{
    handleRegisterBtn: () => void,
}

const MainRegister = ({handleRegisterBtn}:PropsType) => {
    return(
        <div className="MainRegister">
            <div className="register-btn-wrap">
                <button type="button" className="resgister-btn">
                    <img src={IcMindRegister} alt="mind-icon" />
                    <span className="sm-text">마음 기록하기</span>
                </button>
                <button type="button" className="resgister-btn">
                    <img src={IcFriendRegister} alt="friend-icon" />
                    <span className="sm-text">사람 등록하기</span>
                </button>
                <button type="button" className="cls-btn" onClick={handleRegisterBtn}>
                    <span className="material-symbols-rounded">add</span>
                </button>
            </div>
        </div>
    )
}

export default MainRegister;
