import ImgLevel1 from "../../assets/images/level/level_1.png";
import ImgLevel2 from "../../assets/images/level/level_2.png";
import ImgLevel3 from "../../assets/images/level/level_3.png";
import ImgLevel4 from "../../assets/images/level/level_4.png";
import ImgLevel5 from "../../assets/images/level/level_5.png";
import ImgLevel6 from "../../assets/images/level/level_6.png";

const LevelCard = () => {
    return(
        <div className="LevelCard">
            <div className="level-text">
                <img src={ImgLevel2} alt="level-img" />
                <div>
                    <span className="level-text-top">총 마음</span>
                    <span className="level-count">3회</span>
                </div>
            </div>
            <p className="level-description">우린 혜성같은 사이</p>
            <p className="sub-description">은은하게 내 주변을 채워주고 있어요!</p>
            <div className="progress-bar-wrap">
                <div className="progress l3"></div>
            </div>
            <div className="level-bottom">
                <span className="planet">혜성</span>
                <p className="bottom-text">다음 사이까지 1개의 마음이 남았어요.</p>
            </div>
        </div>
    )
}

export default LevelCard;
