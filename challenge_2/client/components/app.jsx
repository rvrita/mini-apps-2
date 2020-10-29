import React from 'react';
import axios from 'axios';
import Chart from 'chart.js';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    }
    this.getData = this.getData.bind(this);
  }

  componentDidMount() {
    this.getData();
  }

  getData() {
    axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=2020-09-28&end=2020-10-28`)
      .then((results) => {
        this.setState({
          data: results.data
        }, () => { this.makeChart() });
        // }, () => console.log(this.state));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  makeChart() {
    var ctx = document.getElementById('myChart');
    var values = Object.values(this.state.data.bpi);
    var days = Object.keys(this.state.data.bpi);
    console.log('values', values);
    console.log('days', days);
    var chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: days,
        datasets: [
          {
            data: values,
            borderColor: "#3e95cd",
            fill: false,
            label: "Price data for BITCOIN between Sept 28 and Oct 28"
          }
        ]
      },
      options: {
        responsive: false,
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'day'
            }
          }]
        }
      }
    });
  }

  render() {
    return (
      <div>
        <canvas id="myChart" width="600" height="400"></canvas>
      </div>)
  }
}

export default App;