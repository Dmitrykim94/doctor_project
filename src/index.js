import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FakeComp from './components/fakeComp'
import Home from '../src/components/Home';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import combinedReducer from './components/reducers/index'
import { composeWithDevTools } from 'redux-devtools-extension'
import FakeCases from './components/fakeCases'

const store = createStore(combinedReducer, composeWithDevTools())

class Index extends Component {
    render() {
        return (
            <Provider store = {store}>

                <FakeComp/>
                <Home />
                <FakeCases />

            </Provider>
        )
    }
}

ReactDOM.render(<Index />,
    document.getElementById('root'))