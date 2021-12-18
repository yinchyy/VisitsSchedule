class dbManagement{
    constructor(obj) {
        this.objects = new Array();
        if ('calendar' in localStorage) {
            this.objects = JSON.parse(localStorage.getItem('calendar'));
        }
    }
    editData(obj) {
        for (const key in obj) {
            this.object[key] = obj[key];
        }
    }
    addObj(obj) {
        for (let index of this.objects) {
            if (index.visitDate === obj.visitDate) {
                if(index.visitTime===obj.visitTime){
                    return false;  
                }   
            }
        }
        this.objects.push(obj);
        localStorage.setItem('calendar', JSON.stringify(this.objects));
        return true;
    }
    getObjectsMatchingParameterValue(parameter, value) {
        let matchingObjects = new Array();
        for (let index of this.objects) {
            if (index[parameter] === value) {
                matchingObjects.push(index);
            }
        }
        return matchingObjects;
    }
}