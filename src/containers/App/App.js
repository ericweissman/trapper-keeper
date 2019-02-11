import React, { Component } from 'react';
import { Switch, Link, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import Home from '../../components/Home/Home'
import NotFound from '../../components/NotFound/NotFound'
import NoteForm from '../NoteForm/NoteForm'
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>TrapperKeeper</h1>
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/new-note' component={NoteForm}/>
          {/* <Route path='notes/:id' render={({ match }) => {
              const { id } = match.params
              
          }}/> */}
          <Route component= {NotFound } />
        </Switch>
      </div>
    );
  }
}

export default App;