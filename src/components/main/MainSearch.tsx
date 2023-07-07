import React, {useState} from "react";
import IcSearch from "../../assets/images/icon/ic_search.svg";
import {FriendResponseProto} from "../../prototypes/friend/FriendResponse";

const MainSearch = (mainFriendList:[]) => {

    const [searchText, setSearchText] = useState<string>("");

    const handleSearchText = (event:any) => {
        if(event.target.id === "searchText"){
            setSearchText(event.target.value);
        }
    }

    return(
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
    )
}
export default MainSearch;
