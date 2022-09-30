const gerargraficos=()=>{
    for(let i=0; i<chartData.length; i++){
    document.querySelector("#ResultadoGrafico").innerHTML+=
    `<div><h2>${chartData[i].name}</h2><div><canvas id="Chart${i}"></canvas></div></div>`
  }
  mostrarGráficos()
}

const mostrarGráficos = () => {
  for(let i=0; i<chartData.length; i++){
    let data = {
      labels: chartData[i].labels,
      datasets: [{
        label: 'My First dataset',
        backgroundColor: colors,
        data: chartData[i].datas,
      }]
    };
    let config = {
      type: 'pie',
      data: data,
      options: {}
    };

    charts.push(new Chart(document.querySelector(`#Chart${i}`), config));
  }
}