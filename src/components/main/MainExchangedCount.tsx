import React from "react";

interface propType{
    count?: any,
}

const MainExchangedCount = (count:propType) => {

    return(
        <div className="MainExchangedCount">
            <span className="exchanged-count">준 마음<em className="color">{count ? count.count.given : "0"}회</em></span>
            <span className="exchanged-count">받은 마음<em className="color">{count ? count.count.taken : "0"}회</em></span>
        </div>
    )
}

export default MainExchangedCount;
