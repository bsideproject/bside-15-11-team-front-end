import React from "react";
import ImgLevel1 from "../../assets/images/level/level_1.png";
import ImgLevel2 from "../../assets/images/level/level_2.png";
import ImgLevel3 from "../../assets/images/level/level_3.png";
import ImgLevel4 from "../../assets/images/level/level_4.png";
import ImgLevel5 from "../../assets/images/level/level_5.png";
import ImgLevel6 from "../../assets/images/level/level_6.png";
import {useNavigate} from "react-router-dom";

interface PropsType{
    isEmptyList: boolean,
}

const MainFriendList = ({ isEmptyList }:PropsType) => {

    let navigate = useNavigate();

    const handleFriendClick = () => {
        navigate("/detail");
    }

    return(
        <div className="MainFriendList">
            {isEmptyList ?
                <p className="empty-message">아직 등록한 친구가 없어요.<br/>마음을 기록하려면 먼처 친구를 등록하세요.</p> :
                <ul className="friend-list-wrap">
                    <li className="friend-cont" onClick={handleFriendClick}>
                        <span className="friend-name">강호동</span>
                        <span className="friend-relation">친구</span>
                        <span className="friend-level"><img src={ImgLevel1} alt="level"/><em className="level">0</em></span>
                    </li>
                    <li className="friend-cont" onClick={handleFriendClick}>
                        <span className="friend-name">나영석</span>
                        <span className="friend-relation">친구</span>
                        <span className="friend-level"><img src={ImgLevel3} alt="level"/><em className="level">6</em></span>
                    </li>
                    <li className="friend-cont" onClick={handleFriendClick}>
                        <span className="friend-name">조규현</span>
                        <span className="friend-relation">친구</span>
                        <span className="friend-level"><img src={ImgLevel6} alt="level"/><em className="level">20</em></span>
                    </li>
                    <li className="friend-cont" onClick={handleFriendClick}>
                        <span className="friend-name">이수근</span>
                        <span className="friend-relation">친구</span>
                        <span className="friend-level"><img src={ImgLevel2} alt="level"/><em className="level">2</em></span>
                    </li>
                    <li className="friend-cont" onClick={handleFriendClick}>
                        <span className="friend-name">유재석</span>
                        <span className="friend-relation">친구</span>
                        <span className="friend-level"><img src={ImgLevel4} alt="level"/><em className="level">12</em></span>
                    </li>
                    <li className="friend-cont" onClick={handleFriendClick}>
                        <span className="friend-name">정준하</span>
                        <span className="friend-relation">친구</span>
                        <span className="friend-level"><img src={ImgLevel5} alt="level"/><em className="level">14</em></span>
                    </li>
                    <li className="friend-cont" onClick={handleFriendClick}>
                        <span className="friend-name">하하</span>
                        <span className="friend-relation">친구</span>
                        <span className="friend-level"><img src={ImgLevel3} alt="level"/><em className="level">14</em></span>
                    </li>
                    <li className="friend-cont" onClick={handleFriendClick}>
                        <span className="friend-name">노홍철</span>
                        <span className="friend-relation">친구</span>
                        <span className="friend-level"><img src={ImgLevel1} alt="level"/><em className="level">14</em></span>
                    </li>
                    <li className="friend-cont" onClick={handleFriendClick}>
                        <span className="friend-name">정형돈</span>
                        <span className="friend-relation">친구</span>
                        <span className="friend-level"><img src={ImgLevel6} alt="level"/><em className="level">14</em></span>
                    </li>
                </ul>
            }
        </div>
    )
}

export default MainFriendList;
