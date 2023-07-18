import IcFilter from "../../assets/images/icon/ic_detail_filter.svg"
import {useEffect, useState} from "react";
import RootStore from "../../store/RootStore";

interface params{
    detailInfo?: any,
    sequence?: any
}

const ExchangeWrap = ({detailInfo, sequence}:params) => {

    const [sort, setSort] = useState("ASC");
    const [exchangeData, setExchangeData] = useState<any>();

    useEffect(() => {
        handleApiCall("DESC");
    }, []);
    // useEffect(() => {
    //     console.log(exchangeData && exchangeData.relationships)
    // }, [exchangeData]);

    const handleFilter = async () => {

        if(sort === "ASC"){
            setSort("DESC");
            await handleApiCall(sort);
        }else if(sort === "DESC"){
            setSort("ASC");
            await handleApiCall(sort);
        }

    }
    const handleApiCall = async (sort: string) => {
        await RootStore.friendStore.getFriendExchange(sequence, sort, setExchangeData);
    }

    return(
        <div className="ExchangeWrap">
            <div className="exchange-title">
                <h3>마음 히스토리</h3>
                <div className="filter-wrap" onClick={handleFilter}>
                    <img src={IcFilter} alt="filter-icon" />
                    <span>{sort === "DESC" ? "과거순" : "최신순"}</span>
                </div>
            </div>
            {exchangeData && exchangeData.length !== 0 ?
                <ul className="exchange-wrap">
                    {exchangeData && exchangeData.relationships.map((item:any, key:any) => (
                        <li className="exchange-cont" key={key}>
                            <i className={item?.type === "TAKEN" ? "exchanged-circle tak" : item?.type === "GIVEN" ? "exchanged-circle giv" : "exchanged-circle giv"}></i>
                            <h4 className={item?.type === "TAKEN" ? "taken" : ""}>
                                {item?.type === "GIVEN" ?
                                    `${detailInfo?.nickname}님` :
                                    item?.type === "TAKEN" ?
                                        "나" : null}의 {item?.event}</h4>
                            <span className="exchanged-item">
                                {item?.item?.type === "CASH" ? item?.item?.name.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ","):item?.item?.name}
                                {item?.item?.type === "CASH" && "원"}
                            </span>
                            <span className="exchanged-date">{item?.date?.year}년 {item?.date?.month}월 {item?.date?.day}일</span>
                            {item?.type === "GIVEN" &&
                                <span className="exchanged-givtak giv">준 마음</span>
                            }
                            {item?.type === "TAKEN" &&
                                <span className="exchanged-givtak tak">받은 마음</span>
                            }
                        </li>
                    ))}
                </ul>
            :
                <div style={{
                    color: "#818181",
                    textAlign: "center",
                    fontSize: "3.7vw",
                    fontWeight: "400",
                    paddingTop: "20%"
                }}>아직 기록이 없어요.</div>
            }



        </div>
    )
}

export default ExchangeWrap;
