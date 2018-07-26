import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as ReactGA from 'react-ga';
import { App } from './components/app/App';
import './index.css';

const gaTrackingId: string = process.env.REACT_APP_GA_TRACKING_ID as string;
ReactGA.initialize(gaTrackingId);
ReactGA.pageview(window.location.pathname + window.location.search);

ReactDOM.render(<App />, document.getElementById('root'));
