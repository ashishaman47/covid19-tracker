import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';

// line graph options
const options = {
  legend: {
    display: false,
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: 'index',
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format('+0,0');
      },
    },
  },
  scales: {
    //   format of data on x-axis
    xAxes: [
      {
        type: 'time',
        time: {
          format: 'MM/DD/YY',
          tooltipFormat: 'll',
        },
      },
    ],
    // format of data on y-axis
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          //Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format('0a');
          },
        },
      },
    ],
  },
};

//   it will take some data and tranform it into x-axis and y-axis
//   we have 3 types of info inside data cases, recovered, deaths --> here it will take the specified casesType
const buildChartData = (data, casesType = 'cases') => {
  let chartData = [];
  let lastDataPoint;

  for (let date in data.cases) {
    // the reason we have lastdatapoint is --> because we are trying to get the difference b/w two dates
    // we are trying to get new cases --> (which is the difference b/w last date and new date cases)
    if (lastDataPoint) {
      let newDataPoint = {
        x: date,
        y: data[casesType][date] - lastDataPoint,
      };
      chartData.push(newDataPoint);
    }
    lastDataPoint = data[casesType][date];
  }
  return chartData;
};

function LineGraph({ casesType = 'cases', ...props }) {
  const [data, setData] = useState({});

  // making a call to this endpoint --> which will give all the worldwide info data of last 120 days
  //   https://disease.sh/v3/covid-19/historical/all?lastdays=120

  useEffect(() => {
    const fetchData = async () => {
      await fetch('https://disease.sh/v3/covid-19/historical/all?lastdays=120') //GET the url
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          // if we don't pass anything it will default to cases --> in casesType
          let chartData = buildChartData(data, casesType);
          setData(chartData);
        });
    };

    fetchData();
  }, [casesType]);

  return (
    //   attaching classname to it passed as props
    <div className={props.className}>
      {/* it checks if data basically exists */}
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: 'rgba(204,16,52,0.5)',
                borderColor: '#CC1034',
                data: data,
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
}

export default LineGraph;
