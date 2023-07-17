import React, {useEffect, useState} from "react";
import Swiper from "swiper";
import 'swiper/css';

interface DateItem {
    year: number;
    month: number;
    day: number;
}


const DatePicker = () => {

    const [selectDate, setSelectDate] = useState(null);
    const [year, setYear] = useState<number>(1990);
    const [month, setMonth] = useState<number>(6);
    const [day, setDay] = useState<number>(30);

    console.log(`${year}년 ${month}월 ${day}일`);
    const createYear = (): number[] => {
        const startYear = 1900;
        const endYear = 2023;
        const years: number[] = [];

        for (let year = startYear; year <= endYear; year++) {
            years.push(year);
        }

        return years;
    }
    const createMonth = (): number[] => {
        return Array.from({ length: 12 }, (_, index) => index + 1);
    };

    const createDay = (): number[] => {
        const lastDay = new Date(year, month, 0).getDate();
        return Array.from({ length: lastDay }, (_, index) => index + 1);
    };

    let swiperYearInstance: Swiper | null = null;
    let swiperMonthInstance: Swiper | null = null;
    let swiperDayInstance: Swiper | null = null;

// Swiper.js 초기화 및 설정
    const initSwiper = () => {
        swiperYearInstance = new Swiper('.year-container', {
            direction: 'vertical',
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 20,
            on: {
                slideChange: () => {
                    const yearList = createYear();
                    setYear(yearList[swiperYearInstance?.activeIndex || 0]);
                },
            },
        });

        swiperMonthInstance = new Swiper('.month-container', {
            direction: 'vertical',
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 20,
            on: {
                slideChange: () => {
                    const monthList = createMonth();
                    setMonth(monthList[swiperMonthInstance?.activeIndex || 0]);
                },
            },
        });

        swiperDayInstance = new Swiper('.day-container', {
            direction: 'vertical',
            slidesPerView: 'auto',
            centeredSlides: true,
            spaceBetween: 20,
            on: {
                slideChange: () => {
                    const dayList = createDay();
                    setDay(dayList[swiperDayInstance?.activeIndex || 0]);
                },
            },
        });
    };

    // 컴포넌트가 마운트된 후 Swiper 초기화
    useEffect(() => {
        initSwiper();
    }, []);

    // 선택한 날짜에 맞게 일 수를 동적으로 변경하는 useEffect
    useEffect(() => {
        const lastDay = new Date(year, month, 0).getDate();
        if (day > lastDay) {
            setDay(lastDay);
        }
    }, [year, month]);

    return(
        <div className="DatePicker">
            {/* Year */}
            <div className="swiper-container year-container">
                <div className="swiper-wrapper">
                    {createYear().map((yearItem) => (
                        <div className="swiper-slide" key={yearItem}>
                            {yearItem}
                        </div>
                    ))}
                </div>
            </div>

            {/* Month */}
            <div className="swiper-container month-container">
                <div className="swiper-wrapper">
                    {createMonth().map((monthItem) => (
                        <div className="swiper-slide" key={monthItem}>
                            {monthItem}
                        </div>
                    ))}
                </div>
            </div>

            {/* Day */}
            <div className="swiper-container day-container">
                <div className="swiper-wrapper">
                    {createDay().map((dayItem) => (
                        <div className="swiper-slide" key={dayItem}>
                            {dayItem}
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default DatePicker;
