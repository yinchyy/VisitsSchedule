class VisitsSchedule {
    constructor() {
        this.currentMonthDate = new Date();
        this.today = new Date();

        this.currentMonthDate.setDate(1);
    }
    initiateMainContainer() {
        if (!document.getElementById("mainContainer")) {
            let tmp = document.createElement("div");
            tmp.setAttribute("id", "mainContainer");
            document.body.appendChild(tmp);
        }
    }
    generateCalendar(date) {
        this.initiateMainContainer();
        this.renderElem("div", "calendarBox", null, "mainContainer", null);
        this.renderElem("div", "monthContainer", null, "calendarBox", null);
        this.renderElem("button", "previousMonth", null, "monthContainer", "<");
        this.renderElem("h2", "currentMonth", null, "monthContainer", date.toLocaleDateString("en-GB", { month: 'long' }));
        this.renderElem("button", "nextMonth", null, "monthContainer", ">");
        this.renderElem("div", "dateContainer", null, "calendarBox", null);
        for (let i = 0; i <= 6; ++i) {
            this.renderElem("div", `d${i}`, `d`, "dateContainer", null);
            this.renderElem("p", `dayLabel${i}`, `dayLabel`, `d${i}`, new Date(date.getFullYear(), date.getMonth(), i).toLocaleDateString('en-GB', { weekday: 'short' }));
        }
        date.setDate(-date.getDay() + 1)
        for (let i = 0; i <= 34; ++i) {
            this.renderElem("button", `${date.getFullYear()} - ${date.getMonth()} - ${date.getDate()}`, "dateButton", `d${date.getDay()}`, date.getDate());
            date.setDate(date.getDate() + 1);
        }
    }
    renderElem(elementTag, id, className, elementParentID, elementContent) {
        if (!document.getElementById(id)) {
            const element = document.createElement(elementTag);
            if (id) element.setAttribute('id', id);
            if (className) element.setAttribute('class', className);
            document.getElementById(elementParentID).appendChild(element);
        }
        if (id && elementContent) document.getElementById(id).innerText = elementContent;
    }
}
v1 = new VisitsSchedule();
console.log(v1.generateCalendar(v1.currentMonthDate));