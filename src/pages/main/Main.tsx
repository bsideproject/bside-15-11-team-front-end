import React, {useEffect, useState} from 'react';
import IcSettingBtn from "../../assets/images/icon/ic_setting_btn.svg";
import IcPlusBtnOg from "../../assets/images/icon/ic_plus_btn_orange.svg";
import { inject, observer } from 'mobx-react';
import MainText from "../../components/main/MainText";
import MainExchangedCount from "../../components/main/MainExchangedCount";
import MainSearch from "../../components/main/MainSearch";
import FilterBtn from "../../components/main/MainFilterBtn";
import MainFriendList from "../../components/main/MainFriendList";
import MainRegister from "../../components/main/MainRegister";
import RootStore from "../../store/RootStore";
import IcSearch from "../../assets/images/icon/ic_search.svg";

const Main = () => {
    let key = RootStore.userStore.getJwtKey;
    // 리스트 비었을 때 분기처리
    const [isEmptyList, setIsEmptyList] = useState<boolean>(true);
    const [registerBtn, setRegisterBtn] = useState<boolean>(false);
    // count
    const [count, setCount] = useState<any>(null);
    // 친구 목록
    const [mainFriendList, setMainFriendList] = useState<any>(null);
    // 검색
    const [searchText, setSearchText] = useState<string>("");

    // 친구 목록 불러오기 api
    useEffect(() => {
        if(key){
            RootStore.mindStore.setMindCount(setCount);
            RootStore.friendStore.getFriendListMain(setMainFriendList);
        }

        // 친구 존재 여부 확인
        if(mainFriendList){
            setIsEmptyList(true);
        }else{
            setIsEmptyList(false);
        }

    }, [key]);
    // 검색
    const handleSearchText = (event:any) => {
        if(event.target.type === "text"){
            setSearchText(event.target.value.toLowerCase());
        }
    }
    //검색 내용 필터
    const searchList = mainFriendList?.filter((item:any) => {
        return item.nickname.toLowerCase().includes(searchText);
    });


    const handleRegisterBtn = () => {
        if(registerBtn){
            setRegisterBtn(false);
        } else {
            setRegisterBtn(true);
        }
    }

    return (
        <div className="Main inner">
            <div className="main-header">
                <span className="setting-btn"><img src={IcSettingBtn} alt="setting-btn" /></span>
            </div>
            <MainText
                isEmptyList={isEmptyList}
                length={mainFriendList? mainFriendList.length : null}
                count={count? count : ""}
            />
            <MainExchangedCount
                count={count? count : ""}
            />
            <div className="MainSearch">
                <span className="search-icon">
                    <img src={IcSearch} alt="search-icon" />
                </span>
                <input
                    type="text"
                    id="searchText"
                    className="search-text"
                    value={searchText}
                    onChange={handleSearchText}
                    placeholder="찾으시는 이름이 있으신가요?"
                />
            </div>
            <FilterBtn />
            <MainFriendList
                isEmptyList={isEmptyList}
                searchList={searchList}
            />
            {registerBtn ? <MainRegister handleRegisterBtn={handleRegisterBtn} isEmptyList={isEmptyList}  /> :
                <button type="button" className="add-btn" onClick={handleRegisterBtn}>
                    <span className="add-btn-plus"><img src={IcPlusBtnOg} alt="ic_plus_btn"/></span>
                </button>
            }
        </div>
    );
};


export default inject('RootStore')(observer(Main));
