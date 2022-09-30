const gerargraficos= (labels) => {
    const ids = []
    labels = labels.sort();
    for(let i = 0; i < chartData.length; i++)
      labels.forEach(label => {
        if(chartData[i].name === label) {
          document.querySelector("#ResultadoGrafico").innerHTML+=
          `<div><h2>${chartData[i].name}</h2><div><canvas id="Chart${chartData[i].name}"></canvas></div></div>`
          ids.push(i)
        }
      })
    
    /*
    for(let i=0; i<chartData.length; i++){
      document.querySelector("#ResultadoGrafico").innerHTML+=
      `<div><h2>${chartData[i].name}</h2><div><canvas id="Chart${i}"></canvas></div></div>`
    }*/
  mostrarGráficos(ids)
}

const mostrarGráficos = (ids) => {
  for(let i=0; i<ids.length; i++){
    let data = {
      labels: chartData[ids[i]].labels,
      datasets: [{
        label: 'My First dataset',
        backgroundColor: colors,
        data: chartData[ids[i]].datas,
      }]
    };
    let config = {
      type: 'pie',
      data: data,
      options: {}
    };

    charts.push(new Chart(document.querySelector(`#Chart${chartData[ids[i]].name}`), config));
  }
}