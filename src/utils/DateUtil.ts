import { DateProto } from "../prototypes/common/DateProto";

class DateUtil {

    getTodayString = () : string => {
        const date : Date = new Date();

        return this.getDateString(date);
    }

    getDateString = (date : string | Date | DateProto) : string => {
        if (date instanceof Date) {
            const year : number = date.getFullYear();
            const month : number = date.getMonth() + 1;
            const day : number = date.getDate();

            return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
        } else if (date && typeof date === 'object' && ('year' in date || 'month' in date || 'day' in date)) {
            const year : number = date.year === undefined ? 0 : date.year;
            const month : number = date.month === undefined ? 0 : date.month;
            const day : number = date.day === undefined ? 0 : date.day;

            return `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
        } else if (typeof date === 'string') {
            return date;
        }

        return '';
    }

    getNumberOfDays = (year : number, month : number) : number => {
        const date = new Date(year, month, 1);

        date.setMonth(date.getMonth() + 1);
        date.setDate(date.getDate() - 1);

        return date.getDate();
    }

    getYearofToday = () : number => {
        const todayString = this.getTodayString();

        return parseInt(todayString.split('-')[0]);
    }

}

const instance : DateUtil = new DateUtil();

export default instance;
