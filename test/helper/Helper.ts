import crypto from 'crypto';

class Helper {
    public getRandomNumber(min: number, max: number): number {
        return Math.round(Math.random() * (max - min) + min);
    }

    public generateRandomString (length = 4): string {
        return crypto.randomBytes(length).toString('hex');
    }

    public generateRandomText(length = 6) {
        let result = '';
        let characters = 'abcdefghijklmnopqrstuvwxyz';
        let charactersLength = characters.length;
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    public formatNumberDate(number: number): string {
        let result = number.toString();

        if (result.length === 1) {
            result = '0' + result;
        }

        return result;
    }

    public daysInMonth(month, year): number {
        return new Date(year, month, 0).getDate();
    }

    public getCurrentDay(currentDay, day, currentMonth, month, year): number {
        if (currentDay > day && currentMonth !== month) {
            return this.daysInMonth(month, year);
        } else {
            return currentDay;
        }
    }
}

export default new Helper();
