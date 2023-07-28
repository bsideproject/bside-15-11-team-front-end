import React from "react";
import { MutatingDots } from "react-loader-spinner";
import Bg from "../../assets/images/bg_spinner.svg";

const Spinner = () => {
    return(
        <div className="spinner-wrap">
            <div className="spinner-bg"><img src={Bg} alt="spinner-bg" /></div>
            <div className="spinner-opacity">
                <MutatingDots
                    height="100"
                    width="100"
                    color="#FA7F64"
                    secondaryColor= '#FA7F64'
                    radius='12.5'
                    ariaLabel="mutating-dots-loading"
                    wrapperStyle={{}}
                    wrapperClass="spinner"
                    visible={true}
                />
            </div>
        </div>
    )
}

export default Spinner;
