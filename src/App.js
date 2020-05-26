import React from 'react';
import Header from './Header'
import './App.css';
import Footer from './Footer';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import stateData from './stateData';


class App extends React.Component {

  constructor() {
    super()
    this.state = {
      stats: [],
      con: [],
      date: new Date().toLocaleString()
    }
  }
  componentDidMount() {
    fetch("https://covid-india-cases.herokuapp.com/states/")
      .then(res => res.json())
      .then(json => {
        this.setState({
          stats: json
        })
      });

    fetch("https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true")
      .then(res => res.json())
      .then(json => {
        this.setState({
          con: json
        })
      });
  }

  render() {
    var { stats } = this.state;
    return (
      <div className="main" >
        <Header />
        <div className="mid">
          <div className="flex-container">
            <div className="active" id="box">Active: {this.state.con.activeCases}</div>
            <div className="recover" id="box"> Cured: {this.state.con.recovered}</div>
            <div className="death" id="box"> Deaths: {this.state.con.deaths}</div>
            <div className="total" id="box"> Total: {this.state.con.totalCases}</div>
          </div>
          <br />
          <table className="table">
            <thead>
              <tr>
                <th>State</th>
                <th>Total Infected</th>
                <th>Cured</th>
                <th>Deaths</th>
              </tr>
            </thead>
            <tbody>
              {stats.map(stat => (
                <tr>
                  <td>{stat.state}</td>
                  <td>{stat.noOfCases}</td>
                  <td>{stat.cured}</td>
                  <td>{stat.deaths}</td>
                </tr>
              ))}

            </tbody>
          </table>
          <br />
          As on: {this.state.date.substring(0, 9)}
        </div>
        <div className="links">
          <a href="https://apify.com/zuzka/covid-in">Country Statistic API</a><hr />

          <a href="https://covid-india-cases.herokuapp.com/states/">States Statistic API</a><hr />

          <a href="https://www.mohfw.gov.in/">Ministry of Health and Family Welfare Government of India</a><hr />
        </div>
        <Footer />
      </div >
    )
  }
}

export default App;
