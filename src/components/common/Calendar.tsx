import React, { useEffect, useState, useRef } from 'react';
import Sheet from 'react-modal-sheet';
import DateUtil from '../../utils/DateUtil';
import { DateProto } from '../../prototypes/common/DateProto';
import { useSwipeable } from 'react-swipeable';
import ModalSheetTitleWrap from './ModalSheetTitleWrap';

interface PropsType {
    isOpen : boolean,
    onClose : any,
    title : string,
    inputArray : string[],
    setInputArray : any,
    setContainerHeight : (arg0 : any, arg1 : string) => void,
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
} : PropsType) => {

    const [date, setDate] = useState<DateProto>({
        year : 0,
        month : 0,
        day : 0
    });

    const containerRef = useRef<HTMLDivElement>(null);

    const [years, setYears] = useState<number[]>([]);
    const [months, setMonths] = useState<number[]>([]);
    const [days, setDays] = useState<number[]>([]);

    const yearHandlers = useSwipeable({
        onSwipedUp : (eventData) => {
            if (date.year && date.year < 2100) {
                const year : number = date.year;
                let obj = date;
                obj.year = year + 1;
                setDate({...obj});
            }
        },
        onSwipedDown : (eventData) => {
            if (date.year && date.year > 1990) {
                const year : number = date.year;
                let obj = date;
                obj.year = year - 1;
                setDate({...obj});
            }
        }
    });

    const monthHandlers = useSwipeable({
        onSwipedUp : (eventData) => {
            if (date.year && date.day && date.month && date.month < 12) {
                const month : number = date.month;

                let obj = date;
                obj.month = month+1;
                const dayCount = DateUtil.getNumberOfDays(date.year, month);
                if (date.day > dayCount) {
                    obj.day = dayCount;
                }

                setDate({...obj});
            }
        },
        onSwipedDown : (eventData) => {
            if (date.year && date.day && date.month && date.month > 1) {
                const month : number = date.month;
                let obj = date;
                obj.month = month-1;
                const dayCount = DateUtil.getNumberOfDays(date.year, month-2);
                if (date.day > dayCount) {
                    obj.day = dayCount;
                }
                setDate({...obj});
            }
        }
    });

    const dayHandlers = useSwipeable({
        onSwipedUp : (eventData) => {
            if (date.year && date.month) {
                const dayCount = DateUtil.getNumberOfDays(date.year, date.month-1);
                if (date.day && date.day < dayCount) {
                    const day : number = date.day;
                    let obj = date;
                    obj.day = day+1;
                    setDate({...obj});
                }
            }
        },
        onSwipedDown : (eventData) => {
            if (date.day && date.day > 1) {
                const day : number = date.day;
                let obj = date;
                obj.day = day - 1;
                setDate({...obj});
            }
        }
    });

    useEffect(() => {
        const dateString : string = DateUtil.getTodayString();

        const y = dateString.split('-')[0];
        const m = dateString.split('-')[1];
        const d = dateString.split('-')[2];

        setDate({
            year : parseInt(y),
            month : parseInt(m),
            day : parseInt(d),
        });

        // 캘린더 양쪽 위 border-radius
        setContainerTopBorderRadius(24, 24);
        setContainerHeight(containerRef, '95vw');
    }, [isOpen]);

    useEffect(() => {

        const y = date.year as number;
        const m = date.month as number;
        const d = date.day as number;

        const dayCount = DateUtil.getNumberOfDays(y, m-1);

        setYears([...[y-1,y,y+1]]);

        if (2 <= m && m <= 11) {
            setMonths([...[m-1, m, m+1]]);
        } else if (m === 1){
            setMonths([...[0, 1, 2]]);
        } else if (m === 12) {
            setMonths([...[11, 12]]);
        }

        if (2 <= d && d <= dayCount - 1) {
            setDays([...[d-1,d,d+1]]);
        } else if (d === 1) {
            setDays([...[0, 1, 2]]);
        } else if (d >= dayCount) {
            setDays([...[d-1, d]]);
        }
    }, [date]);

    const setContainerTopBorderRadius = (left : number, right : number) : void => {
        if (containerRef.current) {
            containerRef.current.style.borderTopLeftRadius = `${left}px`;
            containerRef.current.style.borderTopRightRadius = `${right}px`;
        }
    }

    const saveDate = () : void => {

        let text : string = '';

        if (date.year && date.month && date.day) {
            const selectedDate = new Date(date.year, date.month - 1, date.day);

            text = DateUtil.getDateString(selectedDate);
        }

        let array = inputArray;

        array[1] = text;

        setInputArray([...array]);

        onClose();
    }

    return (
        <Sheet className='calendar-sheet'
            isOpen={isOpen}
            onClose={function(){}}
            disableDrag={true}
        >
        <Sheet.Container ref={containerRef}
                         style={{
                             backgroundColor: "#242424",
                         }}
        >
            <Sheet.Content>
                <ModalSheetTitleWrap
                    title='날짜'
                    onClose={onClose}
                    id={id}
                    onChange={onChange}
                    checked={checked}
                />
                <div className='calendar'>
                    <div className="slider-container"
                        {...yearHandlers}
                    >
                        {years.map((number) => (
                            <p
                                key={number}
                                className={`${number === date.year ? 'selected' : ''} ${number < 1 ? 'none' : 'block'}`}>
                                {number}년
                            </p>
                        ))}
                    </div>
                    <div className="slider-container" style={{ width: '33%', textAlign: 'center', touchAction: 'pan-y', justifyContent: 'center', alignItems: 'center',  verticalAlign: 'middle', display: 'flex', flexDirection: 'column', float : 'left' }}
                        {...monthHandlers}
                    >
                        {months.map((number) => (
                            <p
                                key={number}
                                className={`${number === date.month ? 'selected' : ''} ${number < 1 ? 'none' : 'block'}`}>
                                {number}월
                            </p>
                        ))}
                    </div>
                    <div className="slider-container" style={{ width: '33%', textAlign: 'center', touchAction: 'pan-y', justifyContent: 'center', alignItems: 'center',  verticalAlign: 'middle', display: 'flex', flexDirection: 'column', float : 'left' }}
                        {...dayHandlers}
                    >
                        {days.map((number) => (
                            <p
                                key={number}
                                className={`${number === date.day ? 'selected' : ''} ${number < 1 ? 'none' : 'block'}`}>
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
        <Sheet.Backdrop />
        </Sheet>
    );
};

export default Calendar;
