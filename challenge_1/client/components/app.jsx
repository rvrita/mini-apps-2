import React from 'react';
import axios from 'axios';
import ResultList from './ResultList.jsx';
import ReactPaginate from 'react-paginate';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchFieldValue: '',
      resultList: [],
      perPage: 10,
      offset: 0,
      currentPage: 0,
      total: 0,
      pageCount: 0
    }
    this.handleSearchFieldChange = this.handleSearchFieldChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.getData = this.getData.bind(this);
  }

  handleSearchFieldChange(event) {
    this.setState({
      searchFieldValue: event.target.value
    }, () => { console.log(this.state.searchFieldValue) });
  }

  getData() {
    const { searchFieldValue, currentPage, perPage } = this.state;
    axios.get(`/events?q=${searchFieldValue}&_page=${currentPage + 1}&_limit=${perPage}`)
      .then((results) => {
        const total = results.headers["x-total-count"];
        const pageCount = total / this.state.perPage;
        this.setState({
          resultList: results.data,
          currentPage: 0,
          total,
          pageCount
        }, () => {console.log(this.state)});
      })
      .catch((err) => {
        console.log(err);
      })
  }

  handlePageChange(data) {
    this.setState({ currentPage: data.selected }, () => {
      this.getData();
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.getData();
  }

  render() {
    return (
      <div>
        <header>
          <h1>Welcome to <br />Historical Events Finder!</h1>
        </header>
        <main>
          <div>
            <p>Search for any event by date, place or keyword:</p>
            <form onSubmit={this.handleSubmit}>
              <label>
                <input
                  type="search"
                  aria-label="Type your words"
                  value={this.state.searchFieldValue}
                  onChange={this.handleSearchFieldChange}
                  placeholder="Search" />
              </label>
              <br />
              <input type="submit" value="Submit" />
            </form>
          </div>
          {this.state.resultList.length > 0 &&
            <div>
              <ReactPaginate
                previousLabel={'Previous'}
                nextLabel={'Next'}
                breakLabel={"..."}
                breakClassName={"break-me"}
                pageCount={this.state.pageCount}
                marginPagesDisplayed={3}
                pageRangeDisplayed={3}
                onPageChange={this.handlePageChange}
                containerClassName={'pagination'}
                subContainerClassName={'pages pagination'}
                activeClassName={'active'}
                previousLinkClassName={"paginationlink"}
                nextLinkClassName={"paginationlink"}
                disabledClassName={"paginationlink--disabled"}
                activeClassName={"paginationlink--active"}
              />
              <ResultList resultList={this.state.resultList} />
            </div>
          }
        </main>
      </div>)
  }
}

export default App;