import React from 'react';
import {render} from 'react-dom';
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.css';

var App = props=> {
  return <div className="container">
    <p className="well well-lg">
      We <i className="glyphicon glyphicon-heart"></i> <img src={require('./qiniu-white-97x51.png')}/>
    </p>
    <hr/>
    <span>{moment().format("YYYY")}</span>
  </div>
}

var element = document.createElement('div');
document.body.appendChild(element);
render(<App/>, element);