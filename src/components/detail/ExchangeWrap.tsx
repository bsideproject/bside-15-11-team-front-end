import IcFilter from "../../assets/images/icon/ic_detail_filter.svg"
import {useEffect} from "react";
import RootStore from "../../store/RootStore";

const ExchangeWrap = (sequence:any) => {

    console.log(sequence.sequence)

    useEffect(() => {
        RootStore.friendStore.getFriendExchange(sequence.sequence);
    }, []);

    return(
        <div className="ExchangeWrap">
            <div className="exchange-title">
                <h3>마음 히스토리</h3>
                <div className="filter-wrap">
                    <img src={IcFilter} alt="filter-icon" />
                    <span>최신순</span>
                </div>
            </div>
                <ul className="exchange-wrap">
                    <li className="exchange-cont">
                        <i className="exchanged-circle"></i>
                        <h4>[이름]님의 [이벤트명]</h4>
                        <span className="exchanged-item">50,000원</span>
                        <span className="exchanged-date">2022년 07월 13일</span>
                        <span className="exchanged-givtak">준 마음</span>
                    </li>
                    <li className="exchange-cont">
                        <i className="exchanged-circle"></i>
                        <h4>[이름]님의 [이벤트명]</h4>
                        <span className="exchanged-item">50,000원</span>
                        <span className="exchanged-date">2022년 07월 13일</span>
                        <span className="exchanged-givtak">준 마음</span>
                    </li>
                    <li className="exchange-cont">
                        <i className="exchanged-circle"></i>
                        <h4>[이름]님의 [이벤트명]</h4>
                        <span className="exchanged-item">50,000원</span>
                        <span className="exchanged-date">2022년 07월 13일</span>
                        <span className="exchanged-givtak">준 마음</span>
                    </li>
                    <li className="exchange-cont">
                        <i className="exchanged-circle"></i>
                        <h4>[이름]님의 [이벤트명]</h4>
                        <span className="exchanged-item">50,000원</span>
                        <span className="exchanged-date">2022년 07월 13일</span>
                        <span className="exchanged-givtak">준 마음</span>
                    </li>
                </ul>


        </div>
    )
}

export default ExchangeWrap;
