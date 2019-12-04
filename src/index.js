import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {initialize} from './functions/index'
import LimitCard from './components/LimitCard'


var userDetails;
var initializePromise = initialize();
initializePromise.then(function(result) {
    userDetails = result;
    console.log("Initialized user details");
    // Use user details from here
    console.log(userDetails)
}, function(err) {
    console.log(err);
})

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
