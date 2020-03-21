function reformatDate(dateStr) {
    dArr = dateStr.split("-"); // ex input "2010-01-18"
    return dArr[2] + "/" + dArr[1] + "/" + dArr[0].substring(0); //ex out: "18/01/10"
}

function selectOption() {
    var select = document.getElementById("acao");
    var value = select.options[select.selectedIndex].value;
    chamaAPI(value);
}

function chamaAPI(ticker) {
    fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=" + ticker + "&outputsize=full&apikey=XWZBJTMU8BYSBS10")
        .then(function(response) {
            if (!response.ok) throw new Error("Erro ao executar requisição")
            return response.json();
        })
        .then(function(precosAcao) {
            chamaAPISMI(precosAcao, ticker);
        }).catch(function(err) {
            console.log(err.message);
        });
}

function chamaAPISMI(precosAcao, ticker) {
    fetch("https://www.alphavantage.co/query?function=SMA&symbol=" + ticker + "&interval=daily&time_period=4&series_type=close&apikey=XWZBJTMU8BYSBS10")
        .then(function(response) {
            if (!response.ok) throw new Error("Erro ao executar requisição")
            return response.json();
        })
        .then(function(valoresMediaMovel) {
            buildGraphic(precosAcao, valoresMediaMovel, ticker);
        }).catch(function(err) {
            console.log(err.message);
        });

}

function buildGraphic(precosAcao, valoresMediaMovel, ticker) {
    let pai = document.querySelector(".container-graphic");
    let filho = document.querySelector(".chartjs-hidden-iframe");
    let canvas = document.querySelector(".line-chart");

    if (filho != null) {
        pai.removeChild(filho);
        pai.removeChild(canvas);
        let novoCanvas = document.createElement("canvas");
        novoCanvas.setAttribute("class", "line-chart");
        pai.appendChild(novoCanvas);
    }
    let dataBase = Object.keys(precosAcao["Time Series (Daily)"])[5];
    let listaClose = [];
    let listaData = [];
    let listaSMA = [];

    for (let propriedade in precosAcao["Time Series (Daily)"]) {
        if (propriedade.indexOf(dataBase) > -1) break;
        else {
            listaData.push(reformatDate(propriedade));
            listaClose.push(parseFloat(precosAcao["Time Series (Daily)"][propriedade]["4. close"]));
        }
    }
    for (let propriedade in valoresMediaMovel["Technical Analysis: SMA"]) {
        if (propriedade.indexOf(dataBase) > -1) break;
        else {
            listaSMA.push(parseFloat(valoresMediaMovel["Technical Analysis: SMA"][propriedade]["SMA"]));
        }
    }
    if (ticker == "AAPL") {
        ticker = "Apple Inc." + " (" + ticker + ")";
    } else if (ticker == "X") {
        ticker = "US Steel" + " (" + ticker + ")";
    } else {
        ticker = "Tesla Inc." + " (" + ticker + ")";
    }

    var ctx = document.getElementsByClassName("line-chart");
    //Type, Data e options
    var myLineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: listaData.reverse(),
            datasets: [{
                label: 'Price-close (US$)',
                data: listaClose.reverse(),
                borderWidth: 10,
                borderColor: 'rgba(77,166,253,0.85)',
                backgroundColor: 'transparent'
            }, {
                label: '4-day-SMA',
                data: listaSMA.reverse(),
                borderWidth: 10,
                borderColor: 'rgba(6,204,6,0.85)',
                backgroundColor: 'transparent'
            }]

        },
        options: {
            title: {
                display: true,
                fontSize: 20,
                text: ticker + " NYSE"
            }
        }
    });
}
