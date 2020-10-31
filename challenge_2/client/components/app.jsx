import React from 'react';
import axios from 'axios';
import Chart from 'chart.js';
import { Line } from 'react-chartjs-2';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import {
  faEuroSign,
  faDollarSign,
  faPoundSign,
  faYenSign,
  faRubleSign,
  faCoins,
  faSearchDollar,
  faMoneyBillWave,
  faChartLine,
  faWallet,
  faCalendarAlt
} from '@fortawesome/free-solid-svg-icons'

library.add(fab, faEuroSign, faDollarSign, faPoundSign, faYenSign, faRubleSign, faCoins, faSearchDollar, faMoneyBillWave, faChartLine, faWallet, faCalendarAlt);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pricesLastYear: [],
      currentPriceUSD: 0,
      currentPriceEUR: 0,
      currentPriceGBP: 0,
      currentPriceCYN: 0,
      currentPriceRUB: 0,
      chart1Data: {},
      chart1Options: {
        title: {
          display: true,
          fontSize: 16,
          fontFamily: "'Jura', sans-serif",
          text: 'BITCOIN price changes in the last 31 days',
          padding: 20
        },
        layout: {
          padding: {
            left: 20,
            right: 20,
            top: 0,
            bottom: 20
          }
        },
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem) {
              return tooltipItem.yLabel;
            }
          }
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'day'
            },
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10
            }
          }],
          yAxes: [{
            ticks: {
              callback: function (value, index, values) {
                return '$' + value;
              }
            }
          }]
        }
      },
      chart2Data: {},
      chart2Options: {
        title: {
          display: true,
          fontSize: 16,
          fontFamily: "'Jura', sans-serif",
          text: 'BITCOIN price changes',
          padding: 20
        },
        layout: {
          padding: {
            left: 20,
            right: 20,
            top: 0,
            bottom: 20
          }
        },
        legend: {
          display: false
        },
        tooltips: {
          callbacks: {
            label: function (tooltipItem) {
              return tooltipItem.yLabel;
            }
          }
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'month'
            },
            ticks: {
              autoSkip: true,
              maxTicksLimit: 10
            }
          }],
          yAxes: [{
            ticks: {
              callback: function (value, index, values) {
                return '$' + value;
              }
            }
          }]
        }
      },
      startDate: '2017-01-01',
      endDate: new Date().toISOString().substr(0, 10),
    }
    this.getHistoricalData = this.getHistoricalData.bind(this);
    this.getCurrentData = this.getCurrentData.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
    this.fetchDateRange = this.fetchDateRange.bind(this);
  }

  componentDidMount() {
    this.getHistoricalData();
    this.getCurrentData();
  }

  handleRefreshClick(e) {
    e.preventDefault();
    this.getCurrentData();
  }

  handleStartDateChange(e) {
    const date = e.target.value;
    this.fetchDateRange(date, this.state.endDate);
    this.setState({
      startDate: date,
    });
  }

  handleEndDateChange(e) {
    const date = e.target.value;
    this.fetchDateRange(this.state.startDate, date);
    this.setState({
      endDate: date,
    });
  }

  getChartDataFromCoindeskResponse(response) {
    var values = Object.values(response.data.bpi);
    var keys = Object.keys(response.data.bpi);
    return {
      borderColor: "#000",
      labels: keys,
      datasets: [
        {
          data: values,
          borderColor: "#282828",
          fill: false
        },
      ],
    };
  }

  fetchDateRange(startDate, endDate) {
    axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`)
      .then((response) => {
        this.setState({
          chart2Data: this.getChartDataFromCoindeskResponse(response),
        });
      });
  }

  getHistoricalData() {
    axios.get('https://api.coindesk.com/v1/bpi/historical/close.json')
      .then((response) => {
        const data = this.getChartDataFromCoindeskResponse(response);
        this.setState({
          chart1Data: data,
        });
      });

    this.fetchDateRange(this.state.startDate, this.state.endDate);
  }

  getCurrentData() {
    axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then((response) => {
        this.setState({
          currentPriceUSD: response.data.bpi['USD'].rate.split('.')[0],
          currentPriceEUR: response.data.bpi['EUR'].rate.split('.')[0],
          currentPriceGBP: response.data.bpi['GBP'].rate.split('.')[0]
        });
      });

    axios.get('https://api.coindesk.com/v1/bpi/currentprice/CNY.json')
      .then((response) => {
        this.setState({
          currentPriceCYN: response.data.bpi['CNY'].rate.split('.')[0]
        });
      });

    axios.get('https://api.coindesk.com/v1/bpi/currentprice/RUB.json')
      .then((response) => {
        this.setState({
          currentPriceRUB: response.data.bpi['RUB'].rate.split('.')[0]
        });
      });
  }

  render() {
    return (
      <div>
        <header>
          <div id="title">
            <FontAwesomeIcon className="bcoin" icon={['fab', 'bitcoin']} />
            <h1>BITCOIN price checker</h1>
            <FontAwesomeIcon icon="coins" className="coins" />
          </div>
        </header>
        <main>
          <section className="live">
            <div className="liveheader">
              <h3><FontAwesomeIcon icon="search-dollar" className="search" /><span>Current price</span></h3>
              <button className="refresh" onClick={this.handleRefreshClick}>Refresh</button>
            </div>
            <ul>
              <li><FontAwesomeIcon icon="ruble-sign" />{this.state.currentPriceRUB}</li>
              <li><FontAwesomeIcon icon="euro-sign" />{this.state.currentPriceEUR}</li>
              <li className="usd"><b><FontAwesomeIcon icon="dollar-sign" />{this.state.currentPriceUSD}</b></li>
              <li><FontAwesomeIcon icon="pound-sign" />{this.state.currentPriceGBP}</li>
              <li><FontAwesomeIcon icon="yen-sign" />{this.state.currentPriceCYN}</li>
            </ul>
          </section>
          <section className="canvas">
            <div className="left-col">
              <h3><FontAwesomeIcon icon="chart-line" className="search" /><span>Recent changes</span></h3>
              <p>Bitcoin can be bought on exchanges or directly from other people via marketplaces.<br />You can purchase bitcoin in a variety of ways, using anything from hard cash to credit and debit cards to wire transfers, or even other cryptocurrencies, depending on who you are buying them from and where you live.<br /><br />Contrary to popular belief, the crypto market is the most difficult to trade for beginners. Before you start, check out the the recent changes and make sure you are up-to-date!</p>

              <div className="chart month">
                <Line data={this.state.chart1Data} options={this.state.chart1Options} />
              </div>

              <span className="cd">Powered by coindesk</span>
            </div>
            <div className="right-col">
              <h3><span>What is Bitcoin?</span><FontAwesomeIcon icon="money-bill-wave" className="search" /></h3>
              <p>Bitcoin is a cryptocurrency created in 2009 by an unknown person using the alias Satoshi Nakamoto. Transactions are made with no middle men – meaning, no banks! Bitcoin can be used to book hotels on Expedia, shop for furniture on Overstock and buy Xbox games. But much of the hype is about getting rich by trading it. The price of bitcoin skyrocketed into the thousands in 2017.<br /><br />Bitcoins can be used to buy merchandise anonymously. In addition, international payments are easy and cheap because bitcoins are not tied to any country or subject to regulation. Small businesses may like them because there are no credit card fees. Some people just buy bitcoins as an investment, hoping that they’ll go up in value.<br /><a href="https://money.cnn.com/infographic/technology/what-is-bitcoin/index.html">More info..</a></p>
            </div>
          </section>
          <section className="canvas2">
            <div className="left-col">
              <h3><FontAwesomeIcon icon="wallet" className="search" /><span>Bitcoin Wallet</span></h3>
              <p>Bitcoins are stored in a "digital wallet", which exists either in the cloud or on a user's computer. The wallet is a kind of virtual bank account that allows users to send or receive bitcoins, pay for goods or save their money. Bitcoin wallets are not insured by the FDIC.<br /><br />Though each bitcoin transaction is recorded in a public log, names of buyers and sellers are never revealed – only their wallet IDs. While that keeps bitcoin users’ transactions private, it also lets them buy or sell anything without easily tracing it back to them. <br/><a href="https://money.cnn.com/infographic/technology/what-is-bitcoin/index.html">More info..</a></p>
            </div>
            <div className="right-col">
              <h3><FontAwesomeIcon icon="calendar-alt" className="search" /><span>Custom date range</span></h3>

              <label>Start date
                <input type="date" value={this.state.startDate} onChange={this.handleStartDateChange}></input>
              </label>
              <label>End date
                <input type="date" value={this.state.endDate} onChange={this.handleEndDateChange}></input>
              </label>

              <div className="chart custom">
                <Line data={this.state.chart2Data} options={this.state.chart2Options} />
              </div>

              <span className="cd">Powered by coindesk</span>
            </div>
          </section>
        </main>
      </div>)
  }
}

export default App;