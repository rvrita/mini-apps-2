import React from 'react';

class App extends React.Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     searchFieldValue: '',
  //     resultList: [],
  //     perPage: 10,
  //     offset: 0,
  //     currentPage: 0,
  //     total: 0,
  //     pageCount: 0
  //   }
  //   this.getData = this.getData.bind(this);
  // }



  // getData() {
  //   const { searchFieldValue, currentPage, perPage } = this.state;
  //   axios.get(`/events?q=${searchFieldValue}&_page=${currentPage + 1}&_limit=${perPage}`)
  //     .then((results) => {
  //       const total = results.headers["x-total-count"];
  //       const pageCount = total / this.state.perPage;
  //       this.setState({
  //         resultList: results.data,
  //         currentPage: 0,
  //         total,
  //         pageCount
  //       }, () => {console.log(this.state)});
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     })
  // }


  render() {
    return (
      <div>
        hii
      </div>)
  }
}

export default App;