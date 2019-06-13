import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FakeComp from './components/fakeComp'

import FakeComp from './components/fakeComp'

import Home from '../src/components/Home';



class Index extends Component {
    render() {
        return (
            <div>
                <FakeComp/>
                <Home />
            </div>
        )
    }
}

ReactDOM.render(<Index />,
    document.getElementById('root'))