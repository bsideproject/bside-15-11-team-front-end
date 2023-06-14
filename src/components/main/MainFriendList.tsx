import React from "react";

interface PropsType{
    isEmptyList: boolean,
}

const MainFriendList = ({ isEmptyList }:PropsType) => {
    return(
        <div className="MainFriendList">
            {isEmptyList ?
                <p className="empty-message">아직 등록한 친구가 없어요.<br/>마음을 기록하려면 먼처 친구를 등록하세요.</p> :
                <ul className="friend-list-wrap">
                    <li className="friend-cont">
                        <span className="friend-name">유동우</span>
                        <span className="friend-relation">친구</span>
                        <span className="friend-level">Lv.5</span>
                    </li>
                    <li className="friend-cont">
                        <span className="friend-name">유동우</span>
                        <span className="friend-relation">친구</span>
                        <span className="friend-level">Lv.5</span>
                    </li>
                    <li className="friend-cont">
                        <span className="friend-name">유동우</span>
                        <span className="friend-relation">친구</span>
                        <span className="friend-level">Lv.5</span>
                    </li>
                </ul>
            }
        </div>
    )
}

export default MainFriendList;
