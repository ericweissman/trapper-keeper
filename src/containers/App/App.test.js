import React from 'react'
import ReactDOM from 'react-dom';
import { mapStateToProps, mapDispatchToProps } from './App'
import App from './App'
import { shallow } from 'enzyme'
import { BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension'
import { rootReducer } from '../../reducers/index';
import thunk from 'redux-thunk';


describe('App', () => {
  const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
  let wrapper
  let mockProps = {
    notes: [{id: 1, title: 'Note Title'}],
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
    let mockProps2 = {
      notes: [{ id: 1, title: 'Note Title' }],
      items: [],
      error: 'Something went wrong',
      fetchNotes: jest.fn()
    }
    wrapper = shallow(<App {...mockProps2} />)
    expect(wrapper).toMatchSnapshot()
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