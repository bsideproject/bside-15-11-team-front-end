import React, { useEffect, useRef, useState } from 'react';
import Sheet from 'react-modal-sheet';
import DateUtil from '../../utils/DateUtil';
import uuid from 'react-uuid';

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

const ScrollableCalendar: React.FC<PropsType> = ({
    title,
    isOpen,
    onClose,
    inputArray,
    setInputArray,
    setContainerHeight,
    id, onChange,
    checked }) => {

    const containerRef = useRef<HTMLDivElement>(null);
    const calendarRef = useRef<HTMLDivElement>(null);
    const scrollRef = useRef<HTMLDivElement>(null);
    // const [currentDate, setCurrentDate] = useState(new Date());

    const currentDate: Date = new Date();
    const currentMonth: number = new Date().getMonth();

    // const [months, setMonths] = useState<Date[]>([]);
    // const [currentMonth, setCurrentMonth] = useState<number>(new Date().getMonth());
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const [allCalendar, setAllCalendar] = useState<any>();

    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
    const [selectedDay, setSelectedDay] = useState<number>(new Date().getDate());

    useEffect(() => {

        // 캘린더 양쪽 위 border-radius
        setContainerTopBorderRadius(24, 24);
        setContainerHeight(containerRef, '95vw');

        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ block: 'end' });
        }

        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        };

    }, [isOpen]);

    useEffect(() => {
        // preloadMonths();
        // generateAllCalendar();
    }, []);


    // useEffect(() => {
    //     generateAllCalendar();
    // }, [selectedDate])

    const setContainerTopBorderRadius = (left: number, right: number): void => {
        if (containerRef.current) {
            containerRef.current.style.borderTopLeftRadius = `${left}px`;
            containerRef.current.style.borderTopRightRadius = `${right}px`;
        }
    }

    const preloadMonths = () => {
        const monthsData = [];
        for (let i = currentDate.getFullYear() - 5; i <= currentDate.getFullYear(); i++) {
            for (let j = 0; (i === currentDate.getFullYear() && j <= currentDate.getMonth()) || (i < currentDate.getFullYear() && j < 12); j++) {
                const month = new Date(i, j, 1);
                monthsData.push(month);
            }
            // setMonths(monthsData);
        }
    };

    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year: number, month: number) => {
        return new Date(year, month, 1).getDay();
    };

    // const generateAllCalendar = () => {

    //     let array: JSX.Element[] = [];

    //     for (let year = currentDate.getFullYear() - 5; year <= currentDate.getFullYear(); year++) {
    //         for (let month = 0; (year === currentDate.getFullYear() && month <= currentDate.getMonth()) || (year < currentDate.getFullYear() && month < 12); month++) {
    //             const tempDate = new Date(year, month, 1);
    //             array.push(
    //                 <div key={`${year}-${month}`} className={`month ${year === currentMonth ? 'current-month' : ''}`}>
    //                     <p key={`${year}-${month}-p`}>{year + "년 " + (month + 1) + "월"}</p>
    //                     <div className="days" key={`${year}-${month}`}>{generateCalendar(tempDate)}</div>
    //                 </div>
    //             )
    //         }
    //     }

    //     setAllCalendar(array);
    // }

    // const generateCalendar = (date: Date) => {
    //     const calendar: JSX.Element[] = [];
    //     const firstDayOffset = getFirstDayOfMonth(date) === 0 ? 6 : getFirstDayOfMonth(date) - 1;
    //     const daysInMonth = getDaysInMonth(date);
    //     // calendar.push(<p key={`${date.getFullYear()}-${date.getMonth()}`}>{date.getFullYear() + " " + (date.getMonth() + 1)}</p>)

    //     for (let i = 0; i < daysInMonth + firstDayOffset; i++) {
    //         const day = i - firstDayOffset + 1;

    //         const eachDate = new Date(date.getFullYear(), date.getMonth(), day);

    //         if (i < firstDayOffset || day > daysInMonth) {
    //             calendar.push(<div key={i} className="empty"></div>);
    //         }
    //         else {

    //             const this_year = eachDate.getFullYear();
    //             const this_month = eachDate.getMonth();
    //             const this_day = day;

    //             calendar.push(
    //                 <div
    //                     key={i}
    //                     className={`day ${(this_year === selectedDate.getFullYear()
    //                         && this_month === selectedDate.getMonth()
    //                         && this_day === selectedDate.getDate()
    //                     )
    //                         ? 'selected' : ''}`}
    //                     onClick={() => handleDateClick(eachDate)}
    //                 >
    //                     {day > 0 && day <= daysInMonth ? day : ''}
    //                 </div>
    //             );
    //         }
    //     }

    //     return calendar;
    // };

    const isSelectedDate = (date: Date) => {

        const selected: boolean = date.getDate() === selectedDate.getDate() &&
            date.getMonth() === selectedDate.getMonth() &&
            date.getFullYear() === selectedDate.getFullYear();



        return selected;
    };

    const handleDateClick = (date: Date) => {
        // const formattedDate = DateUtil.getDateString(date);

        // let array = inputArray;

        // array[1] = formattedDate;

        // setInputArray([...array]);

        // onClose();


        setSelectedDate(date);
        setSelectedYear(date.getFullYear());
        setSelectedMonth(date.getMonth());
        setSelectedDay(date.getDate());

    };

    const cancel = () => {
        onClose();
    }

    const confirm = () => {
        const formattedDate = DateUtil.getDateString(selectedDate);

        let array = inputArray;

        array[1] = formattedDate;

        setInputArray([...array]);

        onClose();
    }

    return (
        <>
            {isOpen &&
                <div className="calendar-modal">
                    <div className="calendar-container">
                        <div className="weekdays">
                            <div>일</div>
                            <div>월</div>
                            <div>화</div>
                            <div>수</div>
                            <div>목</div>
                            <div>금</div>
                            <div>토</div>
                        </div>
                        <div className="scroll-calendar" ref={calendarRef}>
                            <div className='scroll-div' ref={scrollRef}>
                                {
                                    [currentDate.getFullYear() - 5,
                                    currentDate.getFullYear() - 4,
                                    currentDate.getFullYear() - 3,
                                    currentDate.getFullYear() - 2,
                                    currentDate.getFullYear() - 1,
                                    currentDate.getFullYear()
                                    ].map((year) => (
                                        <>
                                            {
                                                Array.from({ length: (year === currentDate.getFullYear()) ? currentMonth + 1 : 12 }, (_, month) => {
                                                    const firstDayOffset = getFirstDayOfMonth(year, month) === 0 ? 7 : getFirstDayOfMonth(year, month);
                                                    const daysInMonth = getDaysInMonth(year, month);
                                                    return (
                                                        <div key={`${year}-${month}`} className='month'>
                                                            <p key={`${year}-${month}-p`}>{year + "년 " + (month + 1) + "월"}</p>
                                                            <div className="days" key={`${year}-${month}-div`}>
                                                                {
                                                                    Array.from({ length: daysInMonth + firstDayOffset }, (_, index) => {
                                                                        const day = index - firstDayOffset + 1;

                                                                        const eachDate = new Date(year, month, day);

                                                                        const this_year = eachDate.getFullYear();
                                                                        const this_month = eachDate.getMonth();
                                                                        const this_day = day;

                                                                        return (index < firstDayOffset || day > daysInMonth) ?
                                                                            <div key={`${year}-${month}-${day}`} className="empty"></div> : (
                                                                                <div
                                                                                    key={`${year}-${month}-${day}`}
                                                                                    className={`day ${(this_year === selectedYear
                                                                                        && this_month === selectedMonth
                                                                                        && this_day === selectedDay
                                                                                    )
                                                                                        ? 'selected' : ''}`}
                                                                                    onClick={() => handleDateClick(eachDate)}
                                                                                >
                                                                                    {day > 0 && day <= daysInMonth ? day : ''}
                                                                                </div>
                                                                            );
                                                                    })
                                                                }
                                                            </div>
                                                        </div>
                                                    );
                                                })
                                            }
                                        </>
                                    ))
                                }

                            </div>
                        </div>
                        <div className='modal-btn-wrap'>
                            <button className="cancel-btn" type="button" onClick={cancel}>취소</button>
                            <button className="confirm-btn" type="button" onClick={confirm}>저장</button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default ScrollableCalendar;
