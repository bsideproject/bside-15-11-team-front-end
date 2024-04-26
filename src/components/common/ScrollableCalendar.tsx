import React, { Fragment, useEffect, useRef, useState } from 'react';
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

    const currentDate: Date = new Date();
    const currentMonth: number = new Date().getMonth();

    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear());
    const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth());
    const [selectedDay, setSelectedDay] = useState<number>(new Date().getDate());

    useEffect(() => {

        // 캘린더 양쪽 위 border-radius
        setContainerTopBorderRadius(24, 24);
        setContainerHeight(containerRef, '95vw');

        if (scrollRef.current) {
            // scrollRef.current.scrollIntoView({ block: 'end' });

            const index = (selectedYear - (currentDate.getFullYear() - 5)) * 12 + (selectedMonth);

            const childElement = scrollRef.current.children[index];

            if (childElement) {
                childElement.scrollIntoView({ block: 'end' });
            }
        }

        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        };

    }, [isOpen]);

    const setContainerTopBorderRadius = (left: number, right: number): void => {
        if (containerRef.current) {
            containerRef.current.style.borderTopLeftRadius = `${left}px`;
            containerRef.current.style.borderTopRightRadius = `${right}px`;
        }
    }

    const getDaysInMonth = (year: number, month: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (year: number, month: number) => {
        return new Date(year, month, 1).getDay();
    };

    const handleDateClick = (date: Date) => {
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
                                        <Fragment key={`${year}-Fragment`}>
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
                                                                        const isWeekend = eachDate.getDay() === 0 || eachDate.getDay() === 6;

                                                                        return (index < firstDayOffset || day > daysInMonth) ?
                                                                            <div key={`${year}-${month}-${day}`} className="empty"></div> : (
                                                                                <div
                                                                                    key={`${year}-${month}-${day}`}
                                                                                    className={`day ${(this_year === selectedYear
                                                                                        && this_month === selectedMonth
                                                                                        && this_day === selectedDay
                                                                                    )
                                                                                        ? 'selected' : ''} ${isWeekend ? 'weekend' : ''}`}
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
                                        </Fragment>
                                    ))
                                }

                            </div>
                        </div>
                        <div className='modal-btn-wrap2'>
                            <button className="cancel-btn" type="button" onClick={cancel}>취소</button>
                            <button className="confirm-btn active" type="button" onClick={confirm}>저장하기</button>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default ScrollableCalendar;
