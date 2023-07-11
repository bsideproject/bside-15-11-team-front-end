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

        </div>
    )
}

export default ExchangeWrap;
