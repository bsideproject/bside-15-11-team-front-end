import React, { useEffect, useState } from 'react';
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
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/common/Spinner";

const Main = () => {
    let key = RootStore.userStore.getJwtKey;
    let navigate = useNavigate();

    // 리스트 비었을 때 분기처리
    const [isEmptyList, setIsEmptyList] = useState<boolean>(true);
    const [registerBtn, setRegisterBtn] = useState<boolean>(false);
    const [count, setCount] = useState<any>(null);
    const [mainFriendList, setMainFriendList] = useState<any>(null);
    const [searchText, setSearchText] = useState<string>("");
    const [filterParams, setFilterParams] = useState<string>("nickname");
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        navigate("/page/main");
        const isFirstVisit = sessionStorage.getItem('isFirstVisit');

        if (isFirstVisit !== null) {
            setIsLoading(false);
        } else {
            setIsLoading(true);
            sessionStorage.setItem('isFirstVisit', 'true');
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 1500);
    }, []);

    // 친구 목록 불러오기 api
    useEffect(() => {
        if (key) {
            apiCallSet();
        }
    }, [key]);

    useEffect(() => {
        // 친구 존재 여부 확인
        if (mainFriendList?.length === 0 || mainFriendList?.length === undefined) {
            setIsEmptyList(true);
        } else {
            setIsEmptyList(false);
        }
    }, [mainFriendList]);

    const apiCallSet = () => {
        RootStore.userStore.getUser();
        RootStore.friendStore.getFriendListMain(setMainFriendList, "NICKNAME");
        RootStore.mindStore.setMindCount(setCount);
    }
    // 필터링
    const handleFilter = () => {
        if (filterParams === "level") {

            const sortedList = [...mainFriendList].sort(function (f1: any, f2: any) {
                const name1: string = f1.nickname;
                const name2: string = f2.nickname;

                return name1.localeCompare(name2);
            });

            setFilterParams("nickname");
            setMainFriendList(sortedList);

        } else {

            const sortedList = [...mainFriendList].sort(function (f1: any, f2: any) {
                let total1: number = f1.levelInformation.total;
                let total2: number = f2.levelInformation.total;

                total1 = total1 ? total1 : 0;
                total2 = total2 ? total2 : 0;

                return total2 - total1;
            });

            setFilterParams("level");
            setMainFriendList(sortedList);
        }
    }

    // 검색
    const handleSearchText = (event: any) => {
        if (event.target.type === "text") {
            setSearchText(event.target.value.toLowerCase());
        }
    }
    // 검색 내용 필터
    const searchList = mainFriendList?.filter((item: any) => {
        return item.nickname.toLowerCase().includes(searchText);
    });

    // 추가 버튼
    const handleRegisterBtn = () => {
        if (registerBtn) {
            setRegisterBtn(false);
        } else {
            setRegisterBtn(true);
        }
    }

    return (
        <>
            {isLoading && <Spinner />}
            <div className="Main inner">
                <div className="main-header">
                    <span className="setting-btn" onClick={() => navigate(`/page/setting?nick=${RootStore.userStore.getUserName}`)}><img src={IcSettingBtn} alt="setting-btn" /></span>
                </div>
                <div className="main-filter-div">
                    <MainText
                        isEmptyList={isEmptyList}
                        length={mainFriendList ? mainFriendList.length : null}
                        count={count ? count : ""}
                        nickname={RootStore.userStore.getUserName}
                    />
                    <MainExchangedCount
                        count={count ? count : ""}
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
                </div>
                <MainFriendList
                    isEmptyList={isEmptyList}
                    searchList={searchList}
                />
                {!registerBtn ?
                    <button type="button" className="add-btn" onClick={handleRegisterBtn}>
                        <span className="add-btn-plus"><img src={IcPlusBtnOg} alt="ic_plus_btn" /></span>
                    </button> : null
                }
                <MainRegister
                    registerBtn={registerBtn}
                    handleRegisterBtn={handleRegisterBtn}
                    isEmptyList={isEmptyList}
                />
            </div>
        </>
    );
};


export default inject('RootStore')(observer(Main));
