class dbManagement{
    constructor(obj) {
        let objects = new Array();
        const object = {};
        for (const key in obj) {
            object[key] = obj[key];
        }
        console.log(object);
    }
    initObj(obj) {
    }
}