import React from "react";
import {useNavigate} from "react-router-dom";
import {RelationshipResponseProto} from "../../prototypes/relationship/RelationshipResponseProto";

interface PropsType{
    isEmptyList: boolean,
    searchList?: RelationshipResponseProto[]
}

const MainFriendList = ({ isEmptyList, searchList }:PropsType) => {

    let navigate = useNavigate();

    const handleFriendClick = (sequence:any) => {
        navigate(`/page/detail?sequence=${sequence}`);
    }

    const levelImgSwitch = (num:any) => {
        if(num === 0){
            return "1";
        }else if(num >= 1 && num <= 3 ){
            return "2";
        }else if(num >= 4 && num <= 7 ){
            return "3";
        }else if(num >= 8 && num <= 12 ){
            return "4";
        }else if(num >= 13 && num <= 19 ){
            return "5";
        }else if(num >= 20){
            return "6";
        }
    }

    return(
        <div className="MainFriendList">
            {isEmptyList ?
                <p className="empty-message">아직 등록한 친구가 없어요.<br/>마음을 기록하려면 먼처 친구를 등록하세요.</p> :
                (searchList?.length !== 0 ?
                    <ul className="friend-list-wrap">
                        {searchList?.map((data:RelationshipResponseProto, key) => (
                            <li className="friend-cont" key={data.sequence} onClick={() => handleFriendClick(data.sequence)}>
                                <span className="friend-name">{data.nickname}</span>
                                <span className="friend-relation">{data.relationship}</span>
                                <span className="friend-level"><img src={require("../../assets/images/level/level_"+levelImgSwitch(data.levelInformation?.level ? data.levelInformation?.level - 1 : 0 )+".svg")} alt="level"/><em className="level">{data.levelInformation?.level ? data.levelInformation?.level - 1 : 0 }</em></span>
                            </li>
                        ))}
                    </ul>:<p className="empty-message">찾으시는 친구가 없어요.<br/>마음을 기록하려면 먼처 친구를 등록하세요.</p>
                )
            }
        </div>
    )
}

export default MainFriendList;
