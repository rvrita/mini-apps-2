import React from 'react';

class ResultList extends React.Component {
  render() {
    const { props } = this;
    return (
      <table className="results">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Language</th>
            <th>Category Type</th>
            <th>Category Name</th>
            <th>Granularity</th>
          </tr>
        </thead>
        <tbody>
          {props.resultList.map((resultListItem, index) => (
            <tr className="resultlistitemrow">
              {/* {Object.entries(resultListItem).map(([key, value]) => {
                return (
                  <td>{value}</td>
                )
              })} */}
              <td>{resultListItem.date}</td>
              <td>{resultListItem.description}</td>
              <td>{resultListItem.lang}</td>
              <td>{resultListItem.category1}</td>
              <td>{resultListItem.category2}</td>
              <td>{resultListItem.granularity}</td>
            </tr>
          ))}
        </tbody>
      </table >
    );
  }
}

export default ResultList;