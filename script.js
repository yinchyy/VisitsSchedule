class VisitsSchedule {
    constructor() {
        this.currentDate = new Date();


    }
    generateCalendar(date) {
        date.GetDay;
        for (let i = 0; i < 30; ++i) {
            this.renderElem("button", `${date.getFullYear()}-${date.getMonth()}-${i + 1}`, "dayButton", "dateContainer", i + 1);
        }
    }
    renderElem(elementTag, id, className, elementParentID, elementContent) {
        if (!document.getElementById(id)) {
            const element = document.createElement(elementTag);
            element.setAttribute('id', id);
            element.setAttribute('class', className);
            document.getElementById(elementParentID).appendChild(element);
        }
        document.getElementById(id).innerText = elementContent;
    }
}
v1 = new VisitsSchedule();
console.log(v1.generateCalendar(v1.currentDate));