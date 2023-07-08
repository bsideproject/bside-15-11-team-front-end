import React,{useState} from 'react';
import DatePicker from 'react-mobile-datepicker';

const DatePickerWrap = () => {
    let now = new Date(1990,0,1);
    console.log(now.getDate())
    let [selectDate, setSelectDate] = useState();
    const [confirm, setConfirm] = useState("")
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(true)
    }

    const handleCancel = () => {
        setIsOpen(false)
    }

    const handleSelect = (date) => {
        setSelectDate(date);
        setConfirm(selectDate)
        setIsOpen(false);
    }
    console.log(new Date(confirm))
    return(
        <div className="DatePicker">
            <div
                className="select-btn"
                onClick={handleClick}
                style={{
                    textAlign: "center",
                    margin: "20px 0",
                    width: "100%",
                    padding: "10px 0"
                }}
            >
                open
            </div>

            <div>select date : {selectDate}</div>

            <DatePicker
                value={selectDate}
                isOpen={isOpen}
                onSelect={handleSelect}
                onCancel={handleCancel}
                confirmText="확인"
                cancelText={false}
            />
        </div>
    )
}

export default DatePickerWrap;
