class JobItem {
    itemType: string;
    description: string;
    qty: string;
    costEach: string;

    constructor() {
        this.itemType = undefined;
        this.description = undefined;
        this.qty = undefined;
        this.costEach = undefined;
    }
}

export default JobItem;
