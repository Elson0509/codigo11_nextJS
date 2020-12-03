import React from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

const ChartVolumeNegocios = (props) => {
    const data = {
        series: [{
          //negocios
          name: 'Negócios',
          type: 'column',
          data: props.negocios
        }, {
          //volume/negocio
          name: 'Volume médio por negócio',
          type: 'area',
          data: props.volnegs
        }, {
          //volume
          name: 'Volume',
          type: 'line',
          data: props.volumes
        }],
        options: {
        title: {
            text: `Gráfico de volume (${props.codigo}) - codigo11.com.br`,
            align: 'left'
            },
          chart: {
            height: 350,
            type: 'line',
            stacked: false,
          },
          stroke: {
            width: [0, 2, 5],
            curve: 'smooth'
          },
          plotOptions: {
            bar: {
              columnWidth: '50%'
            }
          },
          
          fill: {
            opacity: [0.85, 0.25, 1],
            gradient: {
              inverseColors: false,
              shade: 'light',
              type: "vertical",
              opacityFrom: 0.85,
              opacityTo: 0.55,
              stops: [0, 100, 100, 100]
            }
          },
          labels: props.dates,
          markers: {
            size: 0
          },
          xaxis: {
            type: 'datetime'
          },
          yaxis: [{
            title: {
              text: 'Negócios',
            },
            min: 0
          },
          {
            opposite: true,
            title: {
                text: "Volume"
            }
          }],
          tooltip: {
            shared: true,
            intersect: false,
          }
        },
    }

    return (
        <div id="chart">
            <Chart options={data.options} series={data.series} type="line" height={350} />
        </div>
    );
};

export default ChartVolumeNegocios;