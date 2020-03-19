import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Bar } from 'react-chartjs-2';
import { makeStyles, useTheme } from '@material-ui/styles';

const useStyles = makeStyles(() => ({
  root: {
    position: 'relative'
  }
}));

function Chart({ data: dataProp, labels, clickHandle, className, ...rest }) {
  const classes = useStyles();
  const theme = useTheme();

  const data = {
    datasets: [
      {
        label: 'Profit/Loss',
        backgroundColor: '#37c566',
        data: dataProp.pl,
        barThickness: 12,
        maxBarThickness: 10,
        barPercentage: 0.5,
        categoryPercentage: 0.5
      },
      {
        label: 'Rollover',
        backgroundColor: '#3b9cec',
        data: dataProp.rollover,
        barThickness: 12,
        maxBarThickness: 10,
        barPercentage: 0.5,
        categoryPercentage: 0.5
      },
      {
        label: 'ROI',
        backgroundColor: '#5b33d4',
        data: dataProp.roi,
        barThickness: 12,
        maxBarThickness: 10,
        barPercentage: 0.5,
        categoryPercentage: 0.5
      }
    ],
    labels
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: false,
    cornerRadius: 3,
    legend: {
      display: false
    },
    layout: {
      padding: 0
    },
    onHover: (event, data) => clickHandle(event, data),
    scales: {
      xAxes: [
        {
          gridLines: {
            display: false,
            drawBorder: false
          },
          ticks: {
            padding: 20,
            fontColor: theme.palette.text.secondary
          }
        }
      ],
      yAxes: [
        {
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          },
          ticks: {
            padding: 20,
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            maxTicksLimit: 5,
            callback: value => {
              return value;
            }
          }
        }
      ]
    },
    tooltips: {
      enabled: false,
      mode: 'index',
      intersect: false,
      caretSize: 10,
      yPadding: 20,
      xPadding: 20,
      borderWidth: 1,
      borderColor: theme.palette.divider,
      backgroundColor: theme.palette.common.white,
      titleFontColor: theme.palette.text.primary,
      bodyFontColor: theme.palette.text.secondary,
      footerFontColor: theme.palette.text.secondary,
      callbacks: {
        label: function(tooltipItem, data) {
          const label = data['datasets'][tooltipItem['datasetIndex']].label;
          const value = tooltipItem.value;
          const symbol = tooltipItem['datasetIndex'] === 2 ? '%' : '';
          return `${label}: ${value}${symbol}`;
        }
      }
    }
  };

  return (
    <div
      {...rest}
      className={clsx(classes.root, className)}
    >
      <Bar
        data={data}
        options={options}
      />
    </div>
  );
}

Chart.propTypes = {
  className: PropTypes.string,
  data: PropTypes.object.isRequired,
  labels: PropTypes.array.isRequired
};

export default Chart;
