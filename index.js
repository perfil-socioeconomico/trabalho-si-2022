const upload = () => {
    //Recebe o arquivo do input 'file_upload'
    let files = document.getElementById('file_upload').files;
    
    //Verifica se algo foi enviado
    if(files.length==0){
      alert("Please choose any file...");
      return;
    }

    //Pega o nome do arquivo
    var filename = files[0].name;

    //Pega a extensão do arquivo
    var extension = filename.substring(filename.lastIndexOf(".")).toUpperCase();
    
    //Verifica se a extensão é válida
    if (extension == '.XLS' || extension == '.XLSX') {
        excelFileToJSON(files[0]);
    }else{
        alert("Please select a valid excel file.");
    }
}

const excelFileToJSON = (file) => {
    try {
        //Cria uma instância de um leitor de arquivos
        let reader = new FileReader();

        //Lê o arquivo como uma String
        reader.readAsBinaryString(file);

        //Função executada quando o arquivo é carregado
        reader.onload = (e) => {
            let data = e.target.result;
            let workbook = XLSX.read(data, {
                type : 'binary'
            });
            let result = {};

            //Para cada nome de coluna, uma nova propriedade é adicionada ao objeto result
            workbook.SheetNames.forEach((sheetName) => {
                let roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                if (roa.length > 0) {
                    result[sheetName] = roa;
                }
            });
            
            //O resultado é tratado para que as propriedades tenham nomes acessíveis
            result = result[`QUESTIONÁRIO SOCIOECONÔMICO`]
            fixData(result);
            console.log(result)
        }
    }catch(e){
        console.error(e);
    }
}

//Função de tratamento de dados
const fixData = (result) => {
    result.forEach(element => {
        Object.getOwnPropertyNames(element).forEach(property => {
            //Substituição de caracteres que podem atrapalhar o desenvolvimento
            propertyTemp = property.replaceAll(" ", "");
            propertyTemp = propertyTemp.replaceAll(".", "");
            propertyTemp = propertyTemp.replaceAll("-", ".");

            //Transforma as propriedades em seus respectivos números de questões
            amount = propertyTemp.length;
            for(let i = 0; i < amount; i++) {
                if(isNaN(Number(propertyTemp))){
                    propertyTemp = propertyTemp.slice(0, -1);
                }
            }

            //A única propriedade vazia receberá o nome Date
            if(propertyTemp === "") propertyTemp = "date";

            //Substituição das propriedades no objeto
            propertyTemp = propertyTemp.replaceAll(".", "x");
            element[`q${propertyTemp}`] = element[`${property}`];
            delete element[`${property}`];
        })
    })
    dataToGraph(result);
}

const dataToGraph = (data) => {
    const results = [];
    const findByName = (name) => results.findIndex(i => i.name === name);
    
    Object.getOwnPropertyNames(data[0]).forEach(j => {
        results.push({name:j, labels: [], results:[]});
    })

    const haveLabel = (name) => {
        let have = false;
        results[0].labels.forEach(i => {
            if(i === name) have = true;
        })
        return have;
    }

    const findLabelByName = (name) => {
        for(let i = 0; i < results[0].labels.length; i++){
            if(results[0].labels[i] === name) return i;
        }
    }
    
    data.forEach(i => {
        if(!haveLabel(i.q1)){
            results[0].labels.push(i.q1);
            results[0].results.push(1);
        } else {
            results[0].results[findLabelByName(i.q1)] += 1
        }
    })
    
    console.log(results);
}

