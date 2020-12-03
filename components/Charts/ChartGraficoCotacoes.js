import {memo} from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ChartGraficoCotacoes = (props) => {

    const data = {
        options: {
            title: {
                text: `Gráfico de cotação (${props.codigo}) - codigo11.com.br`,
                align: 'left'
              },
            yaxis: {
                tooltip: {
                    enabled: true
                }
            },
            xaxis: {
              type: 'datetime'
            },
            tooltip: {
                shared: true,
                custom: [function({ seriesIndex, dataPointIndex, w }) {
                  var pc = w.globals.seriesCandleC[seriesIndex][dataPointIndex-1]
                  var o = w.globals.seriesCandleO[seriesIndex][dataPointIndex]
                  var h = w.globals.seriesCandleH[seriesIndex][dataPointIndex]
                  var l = w.globals.seriesCandleL[seriesIndex][dataPointIndex]
                  var c = w.globals.seriesCandleC[seriesIndex][dataPointIndex]
                  var variacao = (parseInt(((c - pc)/pc)*10000))/100
                  return (
                    `<div class="cottip ${c>pc ? 'cothigh' : 'cotlow'}">
                    <h6 class="text-center">codigo11.com.br<h6><hr/>
                    ${props.codigo}<br/>
                     Máximo:     <b>R$${h}</b><br/>
                     Mínimo:     <b>R$${l}</b><br/>
                     Abertura:   <b>R$${o}</b><br/>
                     Fechamento: <b>R$${c}</b><br/>
                     ${isNaN(variacao) ? '</div>' : `Variação: <b>${variacao}%</b> </div>`}`
                  )
                }]
              }
        },
        series: [{
            name: 'candle',
            type: 'candlestick',
            data: props.cotacoes
          }
        ]
      };

    return (
        
            <Chart
                options={data.options}
                series={data.series}
                type="candlestick"
                width="100%"
            />
        
    );
};

export default memo(ChartGraficoCotacoes);