var moment = require('moment');
document.getElementById('time').innerHTML = moment().format("HH:mm:ss");
var logo = new Image;
logo.src= require('file!./qiniu-white-97x51.png');
document.body.appendChild(logo);