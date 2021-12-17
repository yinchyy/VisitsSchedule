class dbManagement{
    constructor(obj) {
        this.objects = new Array();
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
        console.log(this.objects);
        return true;
    }
}