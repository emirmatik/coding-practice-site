import React from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';

import Problem from './components/pages/Problem';
import Problems from './components/pages/Problems';
import Navbar from './components/parts/Navbar';

import './App.css';
import Error from './components/pages/Error';
import Home from './components/pages/Home';
import Wrapper from './components/parts/Wrapper';

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
