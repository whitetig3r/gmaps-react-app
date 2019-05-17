import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Dashboard from './containers/Dashboard/Dashboard';

ReactDOM.render(<Dashboard />, document.getElementById('root')); // NOT Using React Router because all info can be used on one page

