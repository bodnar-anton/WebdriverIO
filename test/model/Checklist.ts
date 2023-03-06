import Checkbox from './Checkbox';

class Checklist {
    name: string;
    selectedCheckbox: Checkbox;
    notes: string;

    constructor() {
        this.name = undefined;
        this.selectedCheckbox = new Checkbox();
        this.notes = undefined;
    }
}

export default Checklist;
