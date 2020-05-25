import React from 'react';
import Header from './Header'
import './App.css';
import Footer from './Footer';


class App extends React.Component {
  constructor() {
    super()
    this.state = {
      stats: [],
      date: new Date().toLocaleString()
    }
  }
  componentDidMount() {
    fetch("https://api.apify.com/v2/key-value-stores/toDWvRj1JpTXiM8FF/records/LATEST?disableRedirect=true")
      .then(res => res.json())
      .then(json => {
        this.setState({
          stats: json
        })
      });
  }
  render() {
    return (
      <div className="main">
        <Header />
        <div className="mid">
          <div className="flex-container">
            <div className="active" id="box">Active: {this.state.stats.activeCases}</div>
            <div className="recover" id="box"> Recovered: {this.state.stats.recovered}</div>
            <div className="death" id="box"> Deaths: {this.state.stats.deaths}</div>
            <div className="total" id="box"> Total: {this.state.stats.totalCases}</div>
          </div>
          As on: {this.state.date.substring(0, 10)} 08:00 IST
        </div>
        <div className="links">
          <a href="https://apify.com/zuzka/covid-in">API Used</a><hr />

          <a href="https://www.mohfw.gov.in/">Ministry of Health and Family Welfare Government of India</a><hr />
        </div>
        <Footer />
      </div>
    )
  }
}

export default App;
