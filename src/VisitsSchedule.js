class VisitsSchedule extends elementToolsLib {
    constructor() {
        super();
        this.currentMonthDate = new Date();
        this.today = new Date();
        this.today.setHours(0, 0, 0, 0);
        this.selectedLanguage = 'en-US';
        this.currentMonthDate.setDate(1);
        this.visits = new dbManagement();
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
        let buttonDateID,thisMonth;
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
        if (date.getMonth() === this.today.getMonth()) {
            thisMonth = true;
        }
        date.setDate(-date.getDay() + 2);
        for (let i = 0; i <= 34; ++i) {
            buttonDateID = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
            this.renderElem("button", buttonDateID, "dateButton", `d${(date.getDay() + 6) % 7}`, date.getDate());
            if (date.getMonth() != selectedMonth) {
                document.getElementById(buttonDateID).setAttribute("class", "prevOrNextMonthButton");
            }
            document.getElementById(buttonDateID).setAttribute("onclick", `v1.manageVisit('${buttonDateID}');`);
            date.setDate(date.getDate() + 1);
        }
        if (date.getDate() < 25) {
            date.setMonth(date.getMonth() - 1);
        }
        if (thisMonth) {   
            document.getElementById(`${this.today.getFullYear()}-${this.today.getMonth() + 1}-${this.today.getDate()}`).setAttribute("class", "todayButton");
        }
        date.setDate(1);
    }
    manageVisit(visitDate) {
        if (new Date(visitDate) < this.today) {
            alert("Can't reserve in a day from the past.");
        }
        else {
            
            let phone,time,submitData;
            this.openPopUp();
            this.renderElem("div", "popUpContent", null, "popUpContainer", null);
            this.renderElem("div", "visitData", "contentContainers", "popUpContent", null);
            this.renderElem("div", "reservedDates", "contentContainers", "popUpContent", null);
            
            this.renderElem("label", "clientNameLabel", null, "visitData", "Name:").setAttribute("for", "clientName");
            this.renderElem("input", "clientName", "clientDataInputs", "visitData", null).setAttribute("name", "clientName");
            
            this.renderElem("label", "clientSurnameLabel", null, "visitData", "Surname:").setAttribute("for", "clientSurname");
            this.renderElem("input", "clientSurname", "clientDataInputs", "visitData", null).setAttribute("name", "clientSurname");
            
            this.renderElem("label", "phoneNumberLabel", null, "visitData", "Phone number:").setAttribute("for", "phoneNumber");
            phone = this.renderElem("input", "phoneNumber", "clientDataInputs", "visitData", null);
            phone.setAttribute("name", "phoneNumber");
            phone.setAttribute("type", "tel");
            phone.setAttribute("pattern", "[0-9]{3}-[0-9]{3}-[0-9]{4}");
            phone.setAttribute("placeholder", "123-456-789");
            
            this.renderElem("label", "pickedVisitTimeLabel", null, "visitData", "Visit time:").setAttribute("for", "pickedVisitTime");
            time=this.renderElem("input", "pickedVisitTime", "clientDataInputs", "visitData", null);
            time.setAttribute("name", "pickedVisitTime");
            time.setAttribute("type", "time");
        time.setAttribute("min", "8:00");
        time.setAttribute("max", "16:00");
        time.setAttribute("step", "60");
        

        
        submitData = this.renderElem("button", "test", null, "visitData", "Submit");
        submitData.setAttribute("onclick", "v1.submitData('"+visitDate+"')");
        }
    }
    submitData(visitDate) {
        if (document.getElementById("errorMessage")) {   
            document.getElementById("errorMessage").remove();
        }
        let correctedTime = document.getElementById("pickedVisitTime").value.split(':');
        let minutes = correctedTime[1] - (correctedTime[1] % 30);
        correctedTime = `${correctedTime[0]}:${minutes>10?minutes:"0"+minutes}`;
        console.log(correctedTime);

            let result = this.visits.addObj({
                clientName: document.getElementById("clientName").value,
                clientSurname: document.getElementById("clientSurname").value,
                clientPhone: document.getElementById("phoneNumber").value,
                visitDate: visitDate,
                visitTime: correctedTime
    
            });
            if (!result) {
                this.renderElem("p", "errorMessage", null, "visitData", "No free spaces for given time.");
            }
            else {
                this.renderElem("p", "errorMessage", null, "visitData", "Successfully signed up for a visit.");
            }    
        }
 }