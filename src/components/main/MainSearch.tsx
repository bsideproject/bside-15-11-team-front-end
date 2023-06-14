import React, {useState} from "react";

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
                placeholder="친구를 검색해주세요."
            />
        </div>
    )
}
export default MainSearch;
