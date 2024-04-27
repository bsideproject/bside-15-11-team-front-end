import React, {useState} from "react";
// import IcFilterBtn from "../../assets/images/icon/ic_filter_btn.svg";
import Exchange from "../../assets/images/icon/exchange.png";

const FilterBtn = (props:any) => {

    const [isIntimacy, isSetIntimacy] = useState<boolean>(false);

    const handleFilterBtn = () => {
        props.handleFilter();
        if(isIntimacy){
            isSetIntimacy(false);
        } else {
            isSetIntimacy(true);
        }
    }

    return (
        <div className="FilterBtn" onClick={handleFilterBtn}>
            <span className="filter-icon"><img src={Exchange} alt="filter-icon"/></span>
            {isIntimacy ?
                <span className="filter-text">친밀도 순</span> :
                <span className="filter-text">가나다 순</span>
            }
        </div>
    )
}

export default FilterBtn;
