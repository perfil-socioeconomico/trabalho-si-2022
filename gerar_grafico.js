
const gerargraficos=()=>{
    for(let i=0; i<chartData.length; i++){
    document.querySelector("#ResultadoGrafico").innerHTML+=
    `<div>
    <canvas id="Chart${i}"></canvas>
   </div>`
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
//let x = new Chart(document.getElementById(`Chart${i}`), config);
}
}