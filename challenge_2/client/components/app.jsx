import React from 'react';
import axios from 'axios';
import Chart from 'chart.js';
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
  faWallet
} from '@fortawesome/free-solid-svg-icons'

library.add(fab, faEuroSign, faDollarSign, faPoundSign, faYenSign, faRubleSign, faCoins, faSearchDollar, faMoneyBillWave, faChartLine, faWallet);

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pricesLastMonth: [],
      pricesLastYear: [],
      currentPriceUSD: 0,
      currentPriceEUR: 0,
      currentPriceGBP: 0,
      currentPriceCYN: 0,
      currentPriceRUB: 0
    }
    this.getHistoricalData = this.getHistoricalData.bind(this);
    this.getCurrentData = this.getCurrentData.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  componentDidMount() {
    this.getHistoricalData();
    this.getCurrentData();
  }

  handleRefreshClick(e) {
    e.preventDefault();
    this.getCurrentData();
  }

  getHistoricalData() {
    var today = new Date();
    console.log(today);

    axios.get('https://api.coindesk.com/v1/bpi/historical/close.json')
      .then((pricesLastMonth) => {
        this.setState({
          pricesLastMonth: pricesLastMonth.data,
        }, () => { this.makeChart() });
        // }, () => console.log(this.state));
      })
      .catch((err) => {
        console.log(err);
      })

    axios.get('https://api.coindesk.com/v1/bpi/historical/close.json?start=2019-10-21&end=2020-10-28')
      .then((pricesLastYear) => {
        this.setState({
          pricesLastYear: pricesLastYear.data,
        }, () => { this.makeChart2() });
        // }, () => console.log(this.state));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  getCurrentData() {
    axios.get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then((currentPrice) => {
        console.log(currentPrice)
        this.setState({
          currentPriceUSD: currentPrice.data.bpi['USD'].rate.split('.')[0],
          currentPriceEUR: currentPrice.data.bpi['EUR'].rate.split('.')[0],
          currentPriceGBP: currentPrice.data.bpi['GBP'].rate.split('.')[0]
        }, () => console.log(this.state));
      })
      .catch((err) => {
        console.log(err);
      })

    axios.get('https://api.coindesk.com/v1/bpi/currentprice/CNY.json')
      .then((currentPrice) => {
        console.log(currentPrice)
        this.setState({
          currentPriceCYN: currentPrice.data.bpi['CNY'].rate.split('.')[0]
        }, () => console.log(this.state));
      })
      .catch((err) => {
        console.log(err);
      })

    axios.get('https://api.coindesk.com/v1/bpi/currentprice/RUB.json')
      .then((currentPrice) => {
        console.log(currentPrice)
        this.setState({
          currentPriceRUB: currentPrice.data.bpi['RUB'].rate.split('.')[0]
        }, () => console.log(this.state));
      })
      .catch((err) => {
        console.log(err);
      })
  }

  // setTimeout(getCurrentData, 60000)

  makeChart() {
    var ctx = document.getElementById('myChart');
    var values = Object.values(this.state.pricesLastMonth.bpi);
    var days = Object.keys(this.state.pricesLastMonth.bpi);
    var chart = new Chart(ctx, {
      type: 'line',
      data: {
        borderColor: "#000",
        labels: days,
        datasets: [
          {
            data: values,
            borderColor: "#282828",
            fill: false
          },
        ]
      },
      options: {
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
        // responsive: false,
        // maintainAspectRatio: true,
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
      }
    });
  }

  makeChart2() {
    var ctx = document.getElementById('myChart2');
    var values = Object.values(this.state.pricesLastYear.bpi);
    var months = Object.keys(this.state.pricesLastYear.bpi);
    var chart = new Chart(ctx, {
      type: 'line',
      data: {
        borderColor: "#000",
        labels: months,
        datasets: [
          {
            data: values,
            borderColor: "#282828",
            fill: false
          },
        ]
      },
      options: {
        title: {
          display: true,
          fontSize: 16,
          fontFamily: "'Jura', sans-serif",
          text: 'BITCOIN price changes in the last year',
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
        // responsive: false,
        // maintainAspectRatio: true,
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
      }
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
              <canvas id="myChart"></canvas>
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
              <p>Bitcoins are stored in a "digital wallet", which exists either in the cloud or on a user's computer. The wallet is a kind of virtual bank account that allows users to send or receive bitcoins, pay for goos or save their money. Unline bank accounts, bitcoin wallets are not insure by the FDIC.<br /><br />Though each bitcoin transaction is recorded in a public log, names of buyers and sellers are never revealed – only their wallet IDs. While that keeps bitcoin users’ transactions private, it also lets them buy or sell anything without easily tracing it back to them. <a href="https://money.cnn.com/infographic/technology/what-is-bitcoin/index.html">More info..</a></p>
            </div>
            <div className="right-col">
              <h3><FontAwesomeIcon icon="chart-line" className="search" /><span>Changes last year</span></h3>
              <p>Choose the dates</p>
              <canvas id="myChart2"></canvas>
              <span className="cd">Powered by coindesk</span>
            </div>
          </section>
        </main>
      </div>)
  }
}

export default App;