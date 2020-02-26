import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Calendar from './Calendar';

ReactDOM.render(<Calendar currentDate={new Date()}/>, document.getElementById('root'));


