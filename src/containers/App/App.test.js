import React from 'react'
import ReactDOM from 'react-dom';
import { mapStateToProps, mapDispatchToProps } from './App'
import { App } from './App'
import { NoteArea } from '../NoteArea/NoteArea'
import { NoteForm } from '../NoteForm/NoteForm'
import { NotFound } from '../../components/NotFound/NotFound'
import { shallow, mount } from 'enzyme'
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer } from '../../reducers/index';
import thunk from 'redux-thunk';

describe('App', () => {
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
  let wrapper
  let mockProps = {
    notes: [{ id: 1, title: 'Note Title' }],
    items: [],
    error: '',
    fetchNotes: jest.fn()
  }

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
      , div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('should match the correct snapshot', () => {
    wrapper = shallow(<App {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match the correct snapshot if there is an error', () => {
    wrapper.setProps({error: 'Something went wrong'})
    wrapper = shallow(<App {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  describe('Routes', () => {

    it('should render the NoteArea container when at the root route', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/']}>
            <App />
          </MemoryRouter>
        </Provider>
      )
      expect(wrapper.find(NoteArea)).toHaveLength(1)
    })

    it('should render the NoteForm container when at /new-note', () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/new-note']}>
            <App />
          </MemoryRouter>
        </Provider>
      )
      expect(wrapper.find(NoteForm)).toHaveLength(1)
    })

    it('should render the NoteForm container when a valid note is searched', () => {

      const mockNotes = [{ id: 1, title: "Title One" }, { id: 2, title: "Title Two" }]
      const mockItems = [{ description: 'Note one of Title one', noteID: 1, id: 1 }, { description: 'Note two of Title one', noteID: 1, id: 2 }, { description: 'Note three of Title one', noteID: 1, id: 3 },
      { description: 'Note one of Title two', noteID: 2, id: 1 }, { description: 'Note two of Title two', noteID: 2, id: 2 }]
      const fetchNotes = jest.fn()
      wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/notes/1']}>
            <App notes={mockNotes} items={mockItems} error={''} fetchNotes={fetchNotes} />
          </MemoryRouter>
        </Provider>
      )
      expect(wrapper.find(NoteForm)).toHaveLength(1)
    })

    it("should render the NotFound component when a note doesn't exist", () => {

      const mockNotes = [{ id: 1, title: "Title One" }, { id: 2, title: "Title Two" }]
      const mockItems = [{ description: 'Note one of Title one', noteID: 1, id: 1 }, { description: 'Note two of Title one', noteID: 1, id: 2 }, { description: 'Note three of Title one', noteID: 1, id: 3 },
      { description: 'Note one of Title two', noteID: 2, id: 1 }, { description: 'Note two of Title two', noteID: 2, id: 2 }]
      const fetchNotes = jest.fn()
      wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/notes/3']}>
            <App notes={mockNotes} items={mockItems} error={''} fetchNotes={fetchNotes} />
          </MemoryRouter>
        </Provider>
      )
      expect(wrapper.find(NotFound)).toHaveLength(1)
    })

  })

  describe('mapStateToProps', () => {
    it('should return an object with notes, items, isLoading and error', () => {
      const mockState = {
        notes: [{}, {}],
        fakeState: [],
        fakeStateTwo: 2,
        items: [{}, {}, {}, {}],
        isLoading: true,
        error: ''
      }
      const expected = {
        notes: [{}, {}],
        items: [{}, {}, {}, {}],
        isLoading: true,
        error: ''
      }

      const mappedProps = mapStateToProps(mockState)
      expect(mappedProps).toEqual(expected)
    })
  })

  describe('mapDispatchToProps', () => {
    it('calls dispatch with fetchNotes when componentDidMount is called', () => {
      const mockDispatch = jest.fn()
      const mockURL = 'http://localhost:789423'
      const mappedProps = mapDispatchToProps(mockDispatch)

      mappedProps.fetchNotes(mockURL)
      expect(mockDispatch).toHaveBeenCalled()
    })
  })
})