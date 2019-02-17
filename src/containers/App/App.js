import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import NotFound from '../../components/NotFound/NotFound'
import NoteForm from '../NoteForm/NoteForm'
import NoteArea from '../NoteArea/NoteArea'
import EditForm from '../EditForm/EditForm'
import { Link } from 'react-router-dom'
import './App.scss';
import { fetchNotes } from '../../thunks/fetchNotes'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
  }

  componentDidMount = async () => {
    const url = 'http://localhost:3001/api/v1/notes'
    this.props.fetchNotes(url)
  }

  render() {
    return (
      <div className="App">
        <h1>TrapperKeeper</h1>
        {
          this.props.location.pathname === '/' &&
          <Link to='/new-note'>ADD NEW NOTE</Link>
        }
        <Switch>
          <Route exact path='/' component={NoteArea} />
          <Route path='/new-note' render={() => {
            const note = { title: '', id: Date.now() }
            return <NoteForm note={note} items={[]} isEdit={false}/>
          }} />
          <Route path='/notes/:id' render={({ match }) => {
            const { id } = match.params
            const note = this.props.notes.find(note => note.id === parseInt(id))
            const items = this.props.items.filter(item => item.noteID === parseInt(id))
            if (note) {
              return <NoteForm note={note} items={items} isEdit={true}/>
            }
          }} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

export const mapStateToProps = (state) => ({
  notes: state.notes,
  items: state.items,
  isLoading: state.isLoading,
  error: state.error
})

export const mapDispatchToProps = (dispatch) => ({
  fetchNotes: (url) => dispatch(fetchNotes(url))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));