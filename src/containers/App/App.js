import React, { Component } from 'react';
import { Switch, Link, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import Home from '../../components/Home/Home'
import NotFound from '../../components/NotFound/NotFound'
import NoteForm from '../NoteForm/NoteForm'
import './App.scss';
import {setItems, setNotes} from '../../actions'

class App extends Component {
  constructor() {
    super()
    this.state = {
      notes: [],
      items: [],
      loading: true,
    }
  }

  componentDidMount = async () => {

    const { setItems, setNotes } = this.props;
    let response = await fetch('http://localhost:3001/api/v1/notes')
    let result = await response.json();
    setItems(result.items)
    setNotes(result.notes)
  }

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

export const mapStateToProps = (state) => ({
  notes: state.notes,
  items: state.items,
})

export const mapDispatchToProps = (dispatch) => ({
  setItems: (items) => dispatch(setItems(items)),
  setNotes: (notes) => dispatch(setNotes(notes))
})

export default connect(mapStateToProps, mapDispatchToProps)(App);