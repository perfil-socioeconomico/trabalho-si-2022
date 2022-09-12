const upload = () => {
    let files = document.getElementById('file_upload').files;
    if(files.length==0){
      alert("Please choose any file...");
      return;
    }
    var filename = files[0].name;
    var extension = filename.substring(filename.lastIndexOf(".")).toUpperCase();
    if (extension == '.XLS' || extension == '.XLSX') {
        excelFileToJSON(files[0]);
    }else{
        alert("Please select a valid excel file.");
    }
}

const excelFileToJSON = (file) => {
    try {
        let reader = new FileReader();
        reader.readAsBinaryString(file);
        reader.onload = (e) => {

        let data = e.target.result;
        let workbook = XLSX.read(data, {
            type : 'binary'
        });
        let result = {};
        workbook.SheetNames.forEach((sheetName) => {
            let roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
            if (roa.length > 0) {
                result[sheetName] = roa;
            }
        });
            console.log(result)
        }
    }catch(e){
        console.error(e);
    }
}

//displaying the json result
/*
var resultEle=document.getElementById("json-result");
resultEle.value=JSON.stringify(result, null, 4);
resultEle.style.display='block';*/