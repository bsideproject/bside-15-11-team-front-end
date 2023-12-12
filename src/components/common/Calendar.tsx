import React, { useEffect, useState, useRef } from 'react';
import Sheet from 'react-modal-sheet';
import DateUtil from '../../utils/DateUtil';
import { DateProto } from '../../prototypes/common/DateProto';
import ModalSheetTitleWrap from './ModalSheetTitleWrap';

interface PropsType {
    isOpen: boolean,
    onClose: any,
    title: string,
    inputArray: string[],
    setInputArray: any,
    setContainerHeight: (arg0: any, arg1: string) => void,
    id?: string,
    onChange?: any,
    checked?: boolean
}

const Calendar = ({
    title,
    isOpen,
    onClose,
    inputArray,
    setInputArray,
    setContainerHeight,
    id, onChange,
    checked
}: PropsType) => {

    const [date, setDate] = useState<DateProto>({
        year: 0,
        month: 0,
        day: 0
    });

    const containerRef = useRef<HTMLDivElement>(null);
    const yearRef = useRef<HTMLDivElement>(null);
    const monthRef = useRef<HTMLDivElement>(null);
    const dayRef = useRef<HTMLDivElement>(null);

    const [years, setYears] = useState<number[]>([]);
    const [months, setMonths] = useState<number[]>([]);
    const [days, setDays] = useState<number[]>([]);

    const [yearMove, setYearMove] = useState<number>(0);
    const [monthMove, setMonthMove] = useState<number>(0);
    const [dayMove, setDayMove] = useState<number>(0);

    const maxYear = DateUtil.getYearofToday();
    const minYear = 1900;

    const maxMonth = 12;
    const minMonth = 1;

    const minDay = 1;
    const [maxDay, setMaxDay] = useState<number>(0);

    let yearTouchStartY = 0;
    let yearTouchEndY = 0;

    let monthTouchStartY = 0;
    let monthTouchEndY = 0;

    let dayTouchStartY = 0;
    let dayTouchEndY = 0;

    const clientWidth = window.innerWidth;

    const vw = clientWidth * 0.01;

    const delta: number = 4.5 * vw + 2 * 15 + 2 * vw;

    useEffect(() => {

        let dateString: string = inputArray[1] ? inputArray[1] : DateUtil.getTodayString();

        let y = dateString.split('-')[0];
        let m = dateString.split('-')[1];
        let d = dateString.split('-')[2];

        // swiper 초기화 로직
        initSwiper();

        // years, months, days 배열 세팅
        initArrays(parseInt(y), parseInt(m));

        setDate({
            year: parseInt(y),
            month: parseInt(m),
            day: parseInt(d),
        });

        // 캘린더 양쪽 위 border-radius
        setContainerTopBorderRadius(24, 24);
        setContainerHeight(containerRef, '95vw');

        setMaxDay(DateUtil.getNumberOfDays(parseInt(y), parseInt(m) - 1));
    }, [isOpen]);

    // date 전체가 아니라 year, month 바뀔 때만 호출해야 함. 
    // 그렇지 않으면 useEffect 무한 호출됨.
    useEffect(() => {
        updateMaxDay();
    }, [yearMove, monthMove])

    // 년도, 월 바뀔 때마다 maxDay랑 days 및 선택된 날짜 갱신해야 함
    useEffect(() => {

        let dayCount = 0;
        let selectedDay = 0;
        if (date && date.year && date.month && date.day) {
            const y = date.year;
            const m = date.month;
            selectedDay = date.day;

            dayCount = DateUtil.getNumberOfDays(y, m - 1);
        }

        let dayArray = [0];

        for (let i = 1; i <= dayCount; i++) {
            dayArray.push(i);
        }

        dayArray.push(0);

        setDays(dayArray);

        if (dayRef.current) {
            if (selectedDay > maxDay) {
                dayRef.current.style.setProperty('transform', `translateY(${0 * delta}px)`);
                dayRef.current.style.setProperty('transition', '0.3s');
                setDayMove(0);
                updateDay(maxDay);
            } else {
                if (date && date.day && dayRef.current) {
                    let diffDay = 0;

                    if (date && date.day) {
                        diffDay = maxDay - selectedDay;
                    }

                    dayRef.current.style.setProperty('transform', `translateY(${(diffDay) * delta}px)`);
                    dayRef.current.style.removeProperty('transition');
                    setDayMove(diffDay);
                }
            }
        }

    }, [maxDay])

    const setContainerTopBorderRadius = (left: number, right: number): void => {
        if (containerRef.current) {
            containerRef.current.style.borderTopLeftRadius = `${left}px`;
            containerRef.current.style.borderTopRightRadius = `${right}px`;
        }
    }

    const saveDate = (): void => {

        let text: string = '';

        if (date.year && date.month && date.day) {
            const selectedDate = new Date(date.year, date.month - 1, date.day);

            text = DateUtil.getDateString(selectedDate);
        }

        let array = inputArray;

        array[1] = text;

        setInputArray([...array]);

        onClose();
    }

    const updateYear = (year: number): void => {
        let obj = { ...date };

        obj.year = year;

        setDate(obj);
    }

    // move에는 +1, -1 만 들어와야 함
    const yearMoveHandler = (move: number) => {

        if (date && date.year) {
            console.log(date.year + move, maxYear, minYear);
            if (date.year + move > maxYear || date.year + move < minYear) {
                return;
            }
        }

        if (date && date.year && yearRef.current) {

            yearRef.current.style.setProperty('transform', `translateY(${(yearMove - move) * delta}px)`);
            yearRef.current.style.setProperty('transition', `0.3s`);
            setYearMove(yearMove - move);
            updateYear(date.year + move);
        }
    }

    // 연도 터치 시 발생 이벤트
    const yearTouchStartHandler = (e: any) => {
        yearTouchStartY = e.touches[0].clientY;
    }

    const yearTouchEndHandler = (e: any) => {
        yearTouchEndY = e.changedTouches[0].clientY;
        if (yearTouchEndY < yearTouchStartY) {
            yearMoveHandler(1);
        } else if (yearTouchEndY > yearTouchStartY) {
            yearMoveHandler(-1);
        }
    }

    // 월 터치 시 발생 이벤트

    const updateMonth = (month: number): void => {
        let obj = { ...date };

        obj.month = month;
        setDate(obj);
    }

    const monthMoveHandler = (move: number): void => {
        if (date && date.month) {
            if (date.month + move > maxMonth || date.month + move < minMonth) {
                return;
            }
        }

        if (date && date.month && monthRef.current) {
            monthRef.current.style.setProperty('transform', `translateY(${(monthMove - move) * delta}px)`);
            monthRef.current.style.setProperty('transition', '0.3s');
            setMonthMove(monthMove - move);
            updateMonth(date.month + move);
        }
    }

    const monthTouchStartHandler = (e: any) => {
        monthTouchStartY = e.touches[0].clientY;
    }

    const monthTouchEndHandler = (e: any) => {
        monthTouchEndY = e.changedTouches[0].clientY;
        if (monthTouchEndY < monthTouchStartY) {
            monthMoveHandler(1);
        } else if (monthTouchEndY > monthTouchStartY) {
            monthMoveHandler(-1);
        }
    }

    // 일 터치시 발생 이벤트

    const updateDay = (day: number): void => {
        let obj = { ...date };
        obj.day = day;
        setDate(obj);
    }

    const dayMoveHandler = (move: number): void => {
        if (date && date.day) {
            if (date.day + move > maxDay || date.day + move < minDay) {
                return;
            }
        }
        if (date && date.day && dayRef.current) {
            dayRef.current.style.setProperty('transform', `translateY(${(dayMove - move) * delta}px)`);
            dayRef.current.style.setProperty('transition', '0.3s');
            setDayMove(dayMove - move);
            updateDay(date.day + move);
        }
    }

    const dayTouchStartHandler = (e: any) => {
        dayTouchStartY = e.touches[0].clientY;
    }

    const dayTouchEndHandler = (e: any) => {
        dayTouchEndY = e.changedTouches[0].clientY;
        if (dayTouchEndY < dayTouchStartY) {
            dayMoveHandler(1);
        } else if (dayTouchEndY > dayTouchStartY) {
            dayMoveHandler(-1);
        }
    }

    const initSwiper = (): void => {

        if (yearRef.current) {

            let diffYear = 0;

            if (date && date.year) {
                diffYear = maxYear - date.year;
            }

            yearRef.current.style.setProperty('transform', `translateY(${(diffYear) * delta}px)`);
            yearRef.current.style.setProperty('transition', `0.3s`);
            setYearMove(diffYear);
        }

        if (monthRef.current) {
            let diffMonth = 0;

            if (date && date.month) {
                diffMonth = maxMonth - date.month;
            }

            monthRef.current.style.setProperty('transform', `translateY(${(diffMonth) * delta}px)`);
            monthRef.current.style.setProperty('transition', `0.3s`);
            setMonthMove(diffMonth);
        }

        if (dayRef.current) {
            let diffDay = 0;

            if (date && date.day) {
                diffDay = maxDay - date.day;
            }

            dayRef.current.style.setProperty('transform', `translateY(${(diffDay) * delta}px)`);
            dayRef.current.style.setProperty('transition', `0.3s`);
            setDayMove(diffDay);
        }
    }

    const initArrays = (y: number, m: number): void => {
        const dayCount = DateUtil.getNumberOfDays(y, m - 1);

        // 연도 세팅
        let yearArray = [0];

        for (let i = minYear; i <= maxYear; i++) {
            yearArray.push(i);
        }

        yearArray.push(0);

        setYears(yearArray);

        let monthArray = [0];

        for (let i = minMonth; i <= maxMonth; i++) {
            monthArray.push(i);
        }

        monthArray.push(0);

        setMonths(monthArray);

        let dayArray = [0];

        for (let i = 1; i <= dayCount; i++) {
            dayArray.push(i);
        }

        dayArray.push(0);

        setDays(dayArray);
    }

    const updateMaxDay = () => {
        let y = 0;
        let m = 0;

        if (date && date.year && date.month) {
            y = date.year;
            m = date.month;

            const dayCount = DateUtil.getNumberOfDays(y, m - 1);

            setMaxDay(dayCount);
        }
    }

    return (
        <Sheet className='calendar-sheet'
            isOpen={isOpen}
            onClose={function () { }}
            disableDrag={true}
        >
            <Sheet.Container ref={containerRef}
                style={{
                    backgroundColor: "#242424",
                }}
            >
                <Sheet.Content>
                    <ModalSheetTitleWrap
                        title={title}
                        onClose={onClose}
                        id={id}
                        onChange={onChange}
                        checked={checked}
                    />
                    <div className='calendar'>
                        <div className="slider-container"
                            onTouchStart={yearTouchStartHandler}
                            onTouchEnd={yearTouchEndHandler}
                            ref={yearRef}
                        // {...yearHandlers}
                        >
                            {years.map((number, index) => (
                                <p
                                    key={index}
                                    className={`${number === 0 ? 'none' : number === date.year ? 'selected block' :
                                        number + 1 === date.year ? 'prev block' :
                                            number - 1 === date.year ? 'next block' :
                                                'none'
                                        }`}>
                                    {number}년
                                </p>
                            ))}
                        </div>
                        <div className="slider-container"
                            onTouchStart={monthTouchStartHandler}
                            onTouchEnd={monthTouchEndHandler}
                            ref={monthRef}
                            style={{ width: '33%', textAlign: 'center', touchAction: 'pan-y', justifyContent: 'center', alignItems: 'center', verticalAlign: 'middle', display: 'flex', flexDirection: 'column', float: 'left' }}
                        // {...monthHandlers}
                        >
                            {months.map((number, index) => (
                                <p
                                    key={index}
                                    className={`${number === 0 ? 'none' : number === date.month ? 'selected block' :
                                        number + 1 === date.month ? 'prev block' :
                                            number - 1 === date.month ? 'next block' : 'none'}`}>
                                    {number}월
                                </p>
                            ))}
                        </div>
                        <div className="slider-container"
                            onTouchStart={dayTouchStartHandler}
                            onTouchEnd={dayTouchEndHandler}
                            ref={dayRef}
                            style={{ width: '33%', textAlign: 'center', touchAction: 'pan-y', justifyContent: 'center', alignItems: 'center', verticalAlign: 'middle', display: 'flex', flexDirection: 'column', float: 'left' }}
                        // {...dayHandlers}
                        >
                            {days.map((number, index) => (
                                <p
                                    key={index}
                                    className={`${number === 0 ? 'none' : number === date.day ? 'selected block' :
                                        number + 1 === date.day ? 'prev block' :
                                            number - 1 === date.day ? 'next block' : 'none'}`}>
                                    {number}일
                                </p>
                            ))}
                        </div>
                    </div>
                    <button type="button" className="common-btn-og" onClick={saveDate}>
                        저장하기
                    </button>
                </Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop
                onTap={onClose}
            />
        </Sheet>
    );
};

export default Calendar;
