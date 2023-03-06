class TimeEntry {
    engineer: string;
    type: string;
    startDate: string;
    startTime: string;
    endDate: string;
    endTime: string;

    constructor() {
        this.engineer = undefined;
        this.type = undefined;
        this.startDate = undefined;
        this.startTime = undefined;
        this.endDate = undefined;
        this.endTime = undefined;
    }
}

export default TimeEntry;
