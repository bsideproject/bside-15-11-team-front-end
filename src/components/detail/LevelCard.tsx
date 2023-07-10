import {useState} from "react";

const LevelCard = (detailInfo:any) => {

    const [levelCount, setLevelCount] = useState(8);
    // setLevelCount(detailInfo.length !== 0 ? detailInfo.levelInformation?.level : "0")
    console.log(detailInfo)

    let calculate;
    let element: string = ""
    let mainText:string = "";
    let subText:string = "";

    const levelImgSwitch = (num:number) => {
        if(num === 0){
            calculate = (num - 1)* -1;
            mainText = "아직은 보일듯 말듯 우주먼지";
            subText = "먼저 다가가 마음을 표현해보세요";
            element = "우주먼지";
            return "1";
        }else if(num >= 1 && num <= 3 ){
            calculate = (num - 4)* -1;
            mainText = "어디선가 나타난 혜성";
            subText = "앞으로 점점 더 특별한 사이가 될 거예요";
            element = "혜성";
            return "2";
        }else if(num >= 4 && num <= 7 ){
            calculate = (num - 8)* -1;
            mainText = "묵묵히 빛나는 북극성";
            subText = "한 자리에서 늘 반짝이고 있네요";
            element = "북극성";
            return "3";
        }else if(num >= 8 && num <= 12 ){
            calculate = (num - 13)* -1;
            mainText = "어두운 밤을 밝혀주는 보름달";
            subText = "힘든 날에도 용기와 힘이 되어줘요";
            element = "달";
            return "4";
        }else if(num >= 13 && num <= 19 ){
            calculate = (num - 20)* -1;
            mainText = "한결같이 따뜻한 태양";
            subText = "언제 어디서나 날 응원하고 있어요";
            element = "태양";
            return "5";
        }else if(num >= 20){
            mainText = "넌 나의 우주야!";
            subText = "내 우주도 줄 수 있는 소중한 사람이에요 함께 쌓은 신뢰와 애정을 잊지 마세요";
            element = "우주";
            return "6";
        }
    }

    return(
        <div className={`LevelCard l${levelImgSwitch(detailInfo && levelCount)}`}>
            <div className="level-text">
                <img src={require("../../assets/images/level/level_"+levelImgSwitch(detailInfo && levelCount)+".svg")} alt="level-img" />
                <div>
                    <span className="level-text-top">총 마음</span>
                    <span className="level-count">{levelCount}회</span>
                </div>
            </div>
            <p className="level-description">{mainText}</p>
            <p className="sub-description">{subText}</p>
            {levelCount  < 20 ?
                <>
                    <div className="progress-bar-wrap">
                        <div className={`progress l${levelImgSwitch(detailInfo && levelCount)}`}></div>
                    </div>
                    <div className="level-bottom">
                        <span className="planet">{element}</span>
                        <p className="bottom-text">다음 사이까지 {calculate}개의 마음이 남았어요.</p>
                    </div>
                </> : null
            }
        </div>
    )
}

export default LevelCard;
