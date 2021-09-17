import React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';

import Problems from './components/pages/Problems';
import Wrapper from './components/parts/Wrapper';
import Problem from './components/pages/Problem';
import Navbar from './components/parts/Navbar';
import Error from './components/pages/Error';
import Home from './components/pages/Home';

import './App.css';
import 'iblize/dist/iblize';

function App() {
  return (
    <div>
        <Navbar />
        <Wrapper>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/problems" component={Problems} />
                <Route exact path="/problems/:problem_title" component={Problem} />
                <Route exact path="/404" component={Error} />
                <Redirect to="/404" />
            </Switch>
        </Wrapper>
    </div>
  );
}

export default App;
