class Job {
    customer: string;
    site: string;
    name: string;
    type: string;
    workToBeDone: string;
    startDate: string;
    endDate: string;

    status: string;
    returnVisitRequired: boolean;
    actualWorkDone: string;
    recommendations: string;

    constructor() {
        this.customer = undefined;
        this.site = undefined;
        this.name = undefined;
        this.type = undefined;
        this.workToBeDone = undefined;
        this.startDate = undefined;
        this.endDate = undefined;

        this.status = undefined;
        this.returnVisitRequired = undefined;
        this.actualWorkDone = undefined;
        this.recommendations = undefined;
    }
}

export default Job;
