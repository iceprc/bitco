async function fetchCandleData() {
    const url = "https://api.upbit.com/v1/candles/days?market=KRW-BTC&count=30";
    const response = await fetch(url);
    const data = await response.json();
    return data.map(candle => ({
        x: new Date(candle.candle_date_time_kst),
        y: [
            candle.opening_price,
            candle.high_price,
            candle.low_price,
            candle.trade_price
        ]
    }));
}

async function renderChart() {
    const candleData = await fetchCandleData();
    var chart = new CanvasJS.Chart("chartContainer", {
        theme: "light2",
        exportEnabled: true,
        title: {
            text: "비트코인 30일 캔들차트"
        },
        axisX: {
            title: "날짜",
            valueFormatString: "YYYY-MM-DD"
        },
        axisY: {
            title: "가격 (원)",
            prefix: "₩"
        },
        data: [{
            type: "candlestick",
            name: "비트코인",
            yValueFormatString: "₩###,###.##",
            dataPoints: candleData
        }]
    });
    chart.render();
}

renderChart();