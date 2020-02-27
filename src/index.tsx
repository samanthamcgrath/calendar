import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Calendar from './Calendar';

let defaultDate = new Date(); //today

ReactDOM.render(<Calendar currentDate={defaultDate}/>, document.getElementById('root'));


