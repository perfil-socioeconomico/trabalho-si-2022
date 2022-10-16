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

            fixWorkbook(workbook)
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
    chartData = [];

    Object.getOwnPropertyNames(data[0]).forEach(j => {
        chartData.push({name:j, labels: [], datas:[]});
    })

    chartData.shift();
    
    const haveLabel = (object, name) => {
        let result = false;
        object.labels.forEach(i => {
            if(i === name){
                result = true;
            }
        });
        return result;
    }

    chartData.forEach(i => {
        if(i.name === "q15x1"){
            splitFields(i.labels)
            console.log(i.labels);
        }
        data.forEach(j => {
            if(!haveLabel(i, j[`${i.name}`])){
                i.labels.push(j[`${i.name}`]);
                i.datas.push(1);
            } else {
                i.datas[findLabelByName(i, j[`${i.name}`])] += 1;
            }
        })
        
    });

    
    //const findPropIdByName = (name) => chartData.findIndex(i => i.name === name);

    /*
    Object.getOwnPropertyNames(data[0]).forEach(i => {
        data.forEach(j => {
            if(!haveLabel(i)){
                chartData[0].labels.push(i);
                chartData[0].chartData.push(1);
            } else {
                chartData[0].chartData[findLabelByName(i.q1)] += 1
            }
        }) 
    })
    */
    localStorage.setItem("chartData", JSON.stringify(chartData));
    window.location.href = "pages/fatec.html";
}

const fixWorkbook = (workbook) => {
    workbook.Sheets[`QUESTIONÁRIO SOCIOECONÔMICO`][`W1`] = {
        h: "17-1 Automóvel",
        r: "<t>17-1 Automóvel</t>",
        t: "s",
        v: "17-1 Automóvel",
        w: "17-1 Automóvel"
    }

    workbook.Sheets[`QUESTIONÁRIO SOCIOECONÔMICO`][`Y1`] = {
        h: "17-2 MaquinaDeLavar",
        r: "<t>17-2 MaquinaDeLavar</t>",
        t: "s",
        v: "17-2 MaquinaDeLavar",
        w: "17-2 MaquinaDeLavar"
    }

    workbook.Sheets[`QUESTIONÁRIO SOCIOECONÔMICO`][`Z1`] = {
        h: "17-3 Geladeira",
        r: "<t>17-3 Geladeira</t>",
        t: "s",
        v: "17-3 Geladeira",
        w: "17-3 Geladeira"
    }

    workbook.Sheets[`QUESTIONÁRIO SOCIOECONÔMICO`][`AA1`] = {
        h: "17-4 Celular",
        r: "<t>17-4 Celular</t>",
        t: "s",
        v: "17-4 Celular",
        w: "17-4 Celular"
    }
    
    workbook.Sheets[`QUESTIONÁRIO SOCIOECONÔMICO`][`AB1`] = {
        h: "17-5 Smartphone",
        r: "<t>17-5 Smartphone</t>",
        t: "s",
        v: "17-5 Smartphone",
        w: "17-5 Smartphone"
    }

    workbook.Sheets[`QUESTIONÁRIO SOCIOECONÔMICO`][`AC1`] = {
        h: "17-6 Desktop",
        r: "<t>17-6 Desktop</t>",
        t: "s",
        v: "17-6 Desktop",
        w: "17-6 Desktop"
    }
    
    workbook.Sheets[`QUESTIONÁRIO SOCIOECONÔMICO`][`AD1`] = {
        h: "17-7 Desktop",
        r: "<t>17-7 Desktop</t>",
        t: "s",
        v: "17-7 Desktop",
        w: "17-7 Desktop"
    }

    workbook.Sheets[`QUESTIONÁRIO SOCIOECONÔMICO`][`AF1`] = {
        h: "18-1 Internet",
        r: "<t>18-1 Internet</t>",
        t: "s",
        v: "18-1 Internet",
        w: "18-1 Internet"
    }
    
    workbook.Sheets[`QUESTIONÁRIO SOCIOECONÔMICO`][`AG1`] = {
        h: "18-2 TV",
        r: "<t>18-2 TV</t>",
        t: "s",
        v: "18-2 TV",
        w: "18-2 TV"
    }

    workbook.Sheets[`QUESTIONÁRIO SOCIOECONÔMICO`][`AH1`] = {
        h: "18-3 empregada",
        r: "<t>18-3 empregada</t>",
        t: "s",
        v: "18-3 empregada",
        w: "18-3 empregada"
    }

    workbook.Sheets[`QUESTIONÁRIO SOCIOECONÔMICO`][`BE1`] = {
        h: "25-1 linux",
        r: "<t>25-2 linux</t>",
        t: "s",
        v: "25-1 linux",
        w: "25-1 linux"
    }

    workbook.Sheets[`QUESTIONÁRIO SOCIOECONÔMICO`][`BF1`] = {
        h: "25-2 EditorDeTexto",
        r: "<t>25-2 EditorDeTexto</t>",
        t: "s",
        v: "25-2 EditorDeTexto",
        w: "25-2 EditorDeTexto"
    }

    workbook.Sheets[`QUESTIONÁRIO SOCIOECONÔMICO`][`BG1`] = {
        h: "25-3 Excel",
        r: "<t>25-3 Excel</t>",
        t: "s",
        v: "25-3 Excel",
        w: "25-3 Excel"
    }

    workbook.Sheets[`QUESTIONÁRIO SOCIOECONÔMICO`][`BH1`] = {
        h: "25-4 Powerpoint",
        r: "<t>25-4 Powerpoint</t>",
        t: "s",
        v: "25-4 Powerpoint",
        w: "25-4 Powerpoint"
    }

    workbook.Sheets[`QUESTIONÁRIO SOCIOECONÔMICO`][`BI1`] = {
        h: "25-5 SGE",
        r: "<t>25-5 SGE</t>",
        t: "s",
        v: "25-5 SGE",
        w: "25-5 SGE"
    }

    workbook.Sheets[`QUESTIONÁRIO SOCIOECONÔMICO`][`BN1`] = {
        h: "27-1 internet",
        r: "<t>27-1 internet</t>",
        t: "s",
        v: "27-1 internet",
        w: "27-1 internet"
    }

    workbook.Sheets[`QUESTIONÁRIO SOCIOECONÔMICO`][`BO1`] = {
        h: "27-2 revistas",
        r: "<t>27-2 revistas</t>",
        t: "s",
        v: "27-2 revistas",
        w: "27-2 revistas"
    }

    workbook.Sheets[`QUESTIONÁRIO SOCIOECONÔMICO`][`BP1`] = {
        h: "27-3 jornais",
        r: "<t>27-3 jornais</t>",
        t: "s",
        v: "27-3 jornais",
        w: "27-3 jornais"
    }
    
    workbook.Sheets[`QUESTIONÁRIO SOCIOECONÔMICO`][`BQ1`] = {
        h: "27-4 radio",
        r: "<t>27-4 radio</t>",
        t: "s",
        v: "27-4 radio",
        w: "27-4 radio"
    }

    workbook.Sheets[`QUESTIONÁRIO SOCIOECONÔMICO`][`BR1`] = {
        h: "27-5 redes",
        r: "<t>27-5 redes</t>",
        t: "s",
        v: "27-5 redes",
        w: "27-5 redes"
    }
    
    workbook.Sheets[`QUESTIONÁRIO SOCIOECONÔMICO`][`BS1`] = {
        h: "27-6 conversas",
        r: "<t>27-6 conversas</t>",
        t: "s",
        v: "27-6 conversas",
        w: "27-6 conversas"
    }
}