import React, {useEffect, useState} from 'react';
import IcSettingBtn from "../../assets/images/icon/ic_setting_btn.svg";
import IcPlusBtnOg from "../../assets/images/icon/ic_plus_btn_orange.svg";
import { inject, observer } from 'mobx-react';
import MainText from "../../components/main/MainText";
import MainExchangedCount from "../../components/main/MainExchangedCount";
import FilterBtn from "../../components/main/MainFilterBtn";
import MainFriendList from "../../components/main/MainFriendList";
import MainRegister from "../../components/main/MainRegister";
import RootStore from "../../store/RootStore";
import IcSearch from "../../assets/images/icon/ic_search.svg";
import {useNavigate} from "react-router-dom";


const Main = () => {
    let key = RootStore.userStore.getJwtKey;
    let navigate = useNavigate();
    let testNick = "test";
    // 리스트 비었을 때 분기처리
    const [isEmptyList, setIsEmptyList] = useState<boolean>(true);
    const [registerBtn, setRegisterBtn] = useState<boolean>(false);
    const [count, setCount] = useState<any>(null);
    const [mainFriendList, setMainFriendList] = useState<any>(null);
    const [searchText, setSearchText] = useState<string>("");
    const [filterParams, setFilterParams] = useState<string>("level");

    // 친구 목록 불러오기 api
    useEffect(() => {
        sessionStorage.setItem("jwt", key);

        if(key){
            apiCallSet();
        }

        // 친구 존재 여부 확인
        if(mainFriendList){
            setIsEmptyList(true);
        }else{
            setIsEmptyList(false);
        }

    }, [key]);

    const apiCallSet = async () => {
        await RootStore.friendStore.getFriendListMain(setMainFriendList, "nickname");
        await RootStore.mindStore.setMindCount(setCount);
    }
    // 필터링
    const handleFilter = async () => {
        if(filterParams === "level"){
            setFilterParams("nickname");
            await RootStore.friendStore.getFriendListMain(setMainFriendList, filterParams);
        } else if (filterParams === "nickname"){
            setFilterParams("level");
            await RootStore.friendStore.getFriendListMain(setMainFriendList, filterParams);
        }
    }

    // 검색
    const handleSearchText = (event:any) => {
        if(event.target.type === "text"){
            setSearchText(event.target.value.toLowerCase());
        }
    }
    // 검색 내용 필터
    const searchList = mainFriendList?.filter((item:any) => {
        return item.nickname.toLowerCase().includes(searchText);
    });

    // 추가 버튼
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
                <span className="setting-btn" onClick={() => navigate(`/page/setting?nick=${testNick}`)}><img src={IcSettingBtn} alt="setting-btn" /></span>
            </div>
            <MainText
                isEmptyList={isEmptyList}
                length={mainFriendList? mainFriendList.length : null}
                count={count? count : ""}
                nickname={testNick}
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
            <FilterBtn handleFilter={handleFilter} />
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
