import React, { useEffect, useRef, useState } from 'react';
import Sheet from 'react-modal-sheet';
import ModalSheetTitleWrap from '../../components/common/ModalSheetTitleWrap';
import IcCheckOn from '../../assets/images/icon/ic_check_on2.png';
import IcCheckOff from '../../assets/images/icon/ic_check_off2.png';
import IcInactiveSaveBtn from '../../assets/images/icon/ic_inactive_save_btn.png';
import IcActiveSaveBtn from '../../assets/images/icon/ic_save_btn.png';

interface PropsType {
    isOpen : boolean,
    onClose : any,
    inputArray : string[],
    setInputArray : (arg0 : string[]) => void
}

const Event = ({isOpen, onClose, inputArray, setInputArray} : PropsType) => {

    const containerRef = useRef<HTMLDivElement>(null);
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    const [isSavable, setSavable] = useState<boolean>(false);

    const events = ['생일', '결혼식', '장례식', '기념일', '기타'];

    const [selectEvent, setSelectEvent] = useState<string>('');

    useEffect(() => {

        // 캘린더 양쪽 위 border-radius
        setContainerTopBorderRadius(24, 24);
    }, [isOpen]);

    useEffect(() => {
        checkValidation();
    }, [selectEvent])

    const setContainerTopBorderRadius = (left : number, right : number) : void => {
        if (containerRef.current) {
            containerRef.current.style.borderTopLeftRadius = `${left}px`;
            containerRef.current.style.borderTopRightRadius = `${right}px`;
        }
    }

    const checkValidation = () : void => {
        if (selectEvent && selectEvent.length > 0) {
            if (selectEvent === '기타') {
                if (textAreaRef.current) {
                    const text = textAreaRef.current.value;
                    console.log("text : " + text);
                    if (text && text.length > 0) {
                        setSavable(true);
                    }
                }
            } else {
                setSavable(true);
            }
        }
    }

    const save = () : void => {
        let array = inputArray;

        if (selectEvent === '기타' && textAreaRef.current) {
            const text = textAreaRef.current.value;
            array[2] = text;
            setInputArray([...array]);
        } else {
            array[2] = selectEvent;
            setInputArray([...array]);
        }

        onClose();
    }

    return (
        <Sheet className='event-sheet'
            isOpen={isOpen}
            onClose={function(){}}
            snapPoints={[0.82]}
            disableDrag={true}
        >
            <Sheet.Container ref={containerRef}>
                <Sheet.Content>
                    <ModalSheetTitleWrap 
                        title='이벤트'
                        onClose={onClose}
                    />
                    <div className='event-option-list'>
                    {
                        events.map((event) => (
                            <div className='event-option' key={event}>
                                <div style={{width : '5vw'}}>
                                    <img src={event === selectEvent ? IcCheckOn : IcCheckOff} 
                                        alt='select'
                                        onClick={() => {setSelectEvent(event);}}
                                    />
                                </div>
                                <span>
                                    {event}
                                </span>
                            </div>
                        ))
                    }
                    </div>
                    <textarea 
                        placeholder='입력하세요'
                        ref={textAreaRef}
                    />
                    <button className='save' disabled={!isSavable}
                        onClick={() => save()}
                    >
                        <img src={isSavable ? IcActiveSaveBtn : IcInactiveSaveBtn} alt='save'/>
                    </button>
                </Sheet.Content>
            </Sheet.Container>
            <Sheet.Backdrop />
        </Sheet>
    );
};

export default Event;