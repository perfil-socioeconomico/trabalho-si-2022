const colors = [
    "#FF6384", 
    "#36A2EB",
    "#FFCD56",
    "#F963FF",
    "#BB63FF",
    "#7563FF",
    "#63FF80",
    "#FFA163"
]

const charts = []

const findLabelByName = (object, name) => {
    for(let i = 0; i < object.labels.length; i++){
        if(object.labels[i] === name) return i;
    }
}

const splitFields = (fields) => {
    fields.map(i => {
        i.split(";")
    })
        //fields[i] = fields[i].split(";");
        
    
    /*
    let result = []
    fields.forEach((i) => {
        result = result.concat(i)
    })
    fields = result;*/
}