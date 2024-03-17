import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RelationshipResponseProto } from "../../prototypes/relationship/RelationshipResponseProto";
import NullChecker from '../../utils/NullChecker';

import favorite_check from "../../assets/images/icon/check_favorite.png";
import favorite_uncheck from "../../assets/images/icon/uncheck_favorite.png";
import FilterBtn from "./MainFilterBtn";
import { YnTypeProto } from "../../prototypes/common/type/YnTypeProto";

interface PropsType {
    isEmptyList: boolean,
    searchList?: RelationshipResponseProto[]
}

const MainFriendList = ({ isEmptyList, searchList }: PropsType) => {

    let navigate = useNavigate();

    const [favoriteList, setFavoriteList] = useState<RelationshipResponseProto[]>([]);

    useEffect(() => {
        if (searchList && searchList.length > 0) {
            let tempList : RelationshipResponseProto[] = 
                searchList.filter(friend => friend.favoriteYn === 'Y');

            setFavoriteList(tempList);
        }
    } , [])

    const handleFriendClick = (sequence: any) => {
        navigate(`/page/detail?sequence=${sequence}`);
    }

    const handleFavoriteClick = (friend : RelationshipResponseProto) => {
        
        if (friend) {
            if (friend.favoriteYn === YnTypeProto.N || NullChecker.isEmpty(friend.favoriteYn)){
                friend.favoriteYn = YnTypeProto.Y;
            } else{
                friend.favoriteYn = YnTypeProto.N;
            }
            console.log("data : " + JSON.stringify(friend));
        }
    }

    const levelImgSwitch = (num: any) => {
        if (num === 0) {
            return "1";
        } else if (num >= 1 && num <= 3) {
            return "2";
        } else if (num >= 4 && num <= 7) {
            return "3";
        } else if (num >= 8 && num <= 12) {
            return "4";
        } else if (num >= 13 && num <= 19) {
            return "5";
        } else if (num >= 20) {
            return "6";
        } else {
            // undefine, null
            return "1";
        }
    }

    return (
        <div className="MainFriendList">
            {isEmptyList ?
                <p className="empty-message">아직 등록한 친구가 없어요.</p> :
                (searchList?.length !== 0 ?
                    <>
                        {favoriteList.length > 0 ? 
                            <div className="friend-list-title">
                                즐겨찾는 친구
                            </div> : null
                        }
                        <div className="friend-list-title">
                            친구 목록
                            <FilterBtn />
                        </div>
                        <ul className="friend-list-wrap">
                            {searchList?.map((data: RelationshipResponseProto, key) => (
                                <li className="friend-cont" key={data.sequence} onClick={() => handleFriendClick(data.sequence)}>
                                    <span className={`friend-level level-${levelImgSwitch(data.levelInformation?.total)}`}>{data.levelInformation?.total ? data.levelInformation?.total : 0}</span>
                                    <span className="friend-name">{data.nickname}</span>
                                    <span className="friend-favorite"
                                        onClick={(e) => {e.stopPropagation();handleFavoriteClick(data)}}>
                                        <img src={data.favoriteYn === YnTypeProto.Y ? favorite_check : favorite_uncheck}
                                            alt="즐겨찾기"
                                        />
                                    </span>


                                </li>
                            ))}
                        </ul>
                    </> : <p className="empty-message">찾으시는 친구가 없어요.<br />마음을 기록하려면 먼처 친구를 등록하세요.</p>
                )
            }
        </div>
    )
}

export default MainFriendList;
