import React from "react";
import ImgLevel1 from "../../assets/images/level/level_1.png";
import ImgLevel2 from "../../assets/images/level/level_2.png";
import ImgLevel3 from "../../assets/images/level/level_3.png";
import ImgLevel4 from "../../assets/images/level/level_4.png";
import ImgLevel5 from "../../assets/images/level/level_5.png";
import ImgLevel6 from "../../assets/images/level/level_6.png";
import {useNavigate} from "react-router-dom";
import {FriendResponseProto} from "../../prototypes/friend/FriendResponse";

interface PropsType{
    isEmptyList: boolean,
    searchList?: []
}

const MainFriendList = ({ isEmptyList, searchList }:PropsType) => {

    let navigate = useNavigate();
    const handleFriendClick = () => {
        navigate("/page/detail");
    }

    return(
        <div className="MainFriendList">
            {isEmptyList ?
                <p className="empty-message">아직 등록한 친구가 없어요.<br/>마음을 기록하려면 먼처 친구를 등록하세요.</p> :
                (searchList?.length !== 0 ?
                    <ul className="friend-list-wrap">
                        {searchList?.map((data:FriendResponseProto, key) => (
                            <li className="friend-cont" key={key} onClick={handleFriendClick}>
                                <span className="friend-name">{data.nickname}</span>
                                <span className="friend-relation">{data.relationship}</span>
                                <span className="friend-level"><img src={ImgLevel1} alt="level"/><em className="level">0</em></span>
                            </li>
                        ))}
                    </ul>:<p className="empty-message">찾으시는 친구가 없어요.<br/>마음을 기록하려면 먼처 친구를 등록하세요.</p>
                )


            }
        </div>
    )
}

export default MainFriendList;
