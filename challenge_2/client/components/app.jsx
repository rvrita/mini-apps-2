import React from 'react';
import axios from 'axios';

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
    // const { searchFieldValue, currentPage, perPage } = this.state;
    axios.get(`https://api.coindesk.com/v1/bpi/historical/close.json?start=2020-08-28&end=2020-10-28`)
      .then((results) => {
        this.setState({
          data: results.data
        }, () => {console.log(this.state)});
      })
      .catch((err) => {
        console.log(err);
      })
  }

  render() {
    return (
      <div>
        hii
      </div>)
  }
}

export default App;