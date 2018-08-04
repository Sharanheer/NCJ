import React, { Component } from 'react';
import './App.css';
import Layout from './Containers/Layout/Layout';
import { Route, Switch } from 'react-router-dom';
import Home from './Containers/Home/Home';
import About from './Components/About/About';
import Users from './Components/Users/Users';
import Contact from './Components/Contact/Contact';

class App extends Component {
  render() {
    const routes = (
      <Switch>
        <Route path="/about" exact component={About} />
        <Route path="/users" exact component={Users} />
        <Route path="/contact" exact component={Contact} />
        <Route path="/" exact component={Home} />
      </Switch>
    );

    return (
      <div className="App">
        <Layout>
           {routes}
        </Layout>
      </div>
    );
  }
}

export default App;
