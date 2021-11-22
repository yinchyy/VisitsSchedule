class VisitsSchedule extends elementToolsLib {
    constructor() {
        super();
        this.currentMonthDate = new Date();
        this.today = new Date();
        this.selectedLanguage = 'en-US';
        this.currentMonthDate.setDate(1);
    }
    switchMonth(direction) {
        try {
            if (direction === -1 || direction === 1) {
                console.log(direction);
                console.log(this.currentMonthDate);
                this.currentMonthDate.setMonth(this.currentMonthDate.getMonth() + direction);
                document.getElementById("monthContainer").remove();
                document.getElementById("dateContainer").remove();
                this.generateCalendar(this.currentMonthDate);
            }
            else throw Error;

        }
        catch (Error) {
            console.log("Something went wrong, try again later or check your settings");
        }
    }
    generateCalendar(date) {
        const selectedMonth = date.getMonth();
        this.initiateMainContainer();
        this.renderElem("div", "calendarBox", null, "mainContainer", null);
        this.renderElem("div", "monthContainer", null, "calendarBox", null);
        this.renderElem("button", "previousMonth", null, "monthContainer", "<");
        document.getElementById("previousMonth").setAttribute("onclick", "v1.switchMonth(-1)");
        this.renderElem("h2", "currentMonth", null, "monthContainer", `${date.toLocaleDateString(this.selectedLanguage, { month: 'long' })} ${date.getFullYear()}`);
        this.renderElem("button", "nextMonth", null, "monthContainer", ">");
        document.getElementById("nextMonth").setAttribute("onclick", "v1.switchMonth(1)");
        this.renderElem("div", "dateContainer", null, "calendarBox", null);
        for (let i = 0; i <= 6; ++i) {
            this.renderElem("div", `d${i}`, `d`, "dateContainer", null);
            this.renderElem("p", `dayLabel${i}`, `dayLabel`, `d${i}`, new Date(2020, 11, i).toLocaleDateString(this.selectedLanguage, { weekday: 'short' }));
        }
        date.setDate(-date.getDay() + 2);
        for (let i = 0; i <= 34; ++i) {
            this.renderElem("button", `${date.getFullYear()} - ${date.getMonth() + 1} - ${date.getDate()}`, "dateButton", `d${(date.getDay() + 6) % 7}`, date.getDate());
            if (date.getMonth() != selectedMonth) {
                document.getElementById(`${date.getFullYear()} - ${date.getMonth() + 1} - ${date.getDate()}`).setAttribute("class", "prevOrNextMonthButton");
            }
            date.setDate(date.getDate() + 1);
        }
        if (date.getDate() < 25) {
            date.setMonth(date.getMonth() - 1);
        }
        date.setDate(1);
        console.log(date);
    }

}