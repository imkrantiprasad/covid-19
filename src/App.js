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
      stLoaded: false,
      date: new Date().toLocaleString()
    }
  }
  componentDidMount() {
    fetch("https://covid-india-cases.herokuapp.com/states/")
      .then(res => res.json())
      .then(json => {
        this.setState({
          stats: json,
          stLoaded: true
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
    var { stats, stLoaded } = this.state;
    if (!stLoaded) {
      return <div id="loader"></div>
    }
    else {
      return (
        <div className="main" >
          <Header />
          <div className="mid">
            <div className="flex-container">
              <div className="h" id="box">Cases around India:</div>
              <div className="total" id="box">Total: {this.state.con.totalCases}</div>
              <div className="active" id="box">Active: {this.state.con.activeCases}</div>
              <div className="recover" id="box">Cured: {this.state.con.recovered}</div>
              <div className="death" id="box">Deaths: {this.state.con.deaths}</div>
            </div>
            <br />
            <table style={{ overflowX: 'auto' }}>
              <thead>
                <tr>
                  <th>State/UTs</th>
                  <th id="total">Total</th>
                  <th id="active">Active</th>
                  <th id="cured">Cured</th>
                  <th id="death">Deaths</th>
                </tr>
              </thead>
              <tbody>
                {stats.map(stat => (
                  <tr>
                    <td>{stat.state}</td>
                    <td id="total">{stat.noOfCases + stat.cured + stat.deaths}</td>
                    <td id="active">{stat.noOfCases}</td>
                    <td id="cured">{stat.cured}</td>
                    <td id="death">{stat.deaths}</td>
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
            <a href="https://github.com/imkrantiprasad/covid-19">Source Code</a><hr />

          </div>
          <Footer />
        </div >
      )
    }
  }
}

export default App;
