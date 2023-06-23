import React, {useState} from "react";
import IcSearch from "../../assets/images/icon/ic_search.png";

const MainSearch = () => {

    const [searchText, setSearchText] = useState<string>("");

    const handleSearchText = (event:any) => {
        if(event.target.id === "searchText"){
            setSearchText(event.target.value);
        }
    }

    return(
        <div className="MainSearch">
            <input
                type="text"
                id="searchText"
                className="search-text"
                value={searchText}
                onChange={handleSearchText}
                placeholder="찾으시는 이름이 있으신가요?"
            />
            <span className="search-icon">
                <img src={IcSearch} alt="search-icon"/>
            </span>
        </div>
    )
}
export default MainSearch;
