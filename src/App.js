import React from 'react';
import logo from './logo.svg';
import './App.css';
import Page from './components/Page'
var request = require("request");

export class App extends React.Component {
  state = {
    whats: []
  };

  componentDidMount() {

    this.initialize('http://127.0.0.1:5000/api/pages?n=30').then(data => {
      this.setState({
        whats: data.items
      });
    });
  }

  initialize(url) {
    // Setting URL and headers for request
    var options = {
      url: url,
      headers: {
        'User-Agent': 'request'
      }
    };
    // Return new promise 
    return new Promise(function (resolve, reject) {
      // Do async job
      request.get(options, function (err, resp, body) {
        if (err) {
          reject(err);
        } else {
          resolve(JSON.parse(body));
        }
      })
    })

  }
  render() {
    return (
      <div class="wrapper">
        <div class="page">
          <h1>Photo project</h1>
        </div>
        {this.state.whats.map(function (element, index) {
         return <Page what={element.what} when={element.when} where={JSON.stringify(element.where)} />

        })}
      </div>
    )
  }
}

export default App;
