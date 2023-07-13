class DateUtil {

    getTodayString = () : string => {
        const date : Date = new Date();

        return this.getDateString(date);
    }

    getDateString = (date : string | Date) : string => {
        if (date instanceof Date) {
            const year : number = date.getFullYear();
            const month : number = date.getMonth() + 1;
            const day : number = date.getDate();

            return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
        } else {
            return date;
        }
    }

    getNumberOfDays = (year : number, month : number) : number => {
        const date = new Date(year, month, 1);

        date.setMonth(date.getMonth() + 1);
        date.setDate(date.getDate() - 1);

        return date.getDate();
    }

}

const instance : DateUtil = new DateUtil();

export default instance;
