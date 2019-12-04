import React from 'react';
var request = require("request");

export class LimitCard extends React.Component {
    state = {
        data: ""
      };
      componentDidMount() {
        this.initialize('http://127.0.0.1:5000/api/random/coordinates?n=30').then(data => {
          this.setState({
            data
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
        return new Promise(function(resolve, reject) {
            // Do async job
            request.get(options, function(err, resp, body) {
                if (err) {
                    reject(err);
                } else {
                    resolve(body);
                }
            })
        })
    
    }
    
      render() {
        const { data } = this.state;
        return <p>{data}</p>;
      }
    }

export default LimitCard;