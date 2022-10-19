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
    console.log(fields.length);
    let result = []
    for(let i = 0; i < fields.length; i++){
        let x = fields[i];
        result.push(x.split(";"))
    }

    let temp = []
    for(let i = 0; i < result.length; i++) {
        temp = temp.concat(result[i])
    }
    result = [...new Set(temp)]
    return result;
}