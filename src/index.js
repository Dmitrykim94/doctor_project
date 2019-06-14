import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import LengthPrinter from './components/Map'
import FakeComp from './components/fakeComp'
import Home from '../src/components/Home';

class Index extends Component {

    render() {
        return (
            <div>
                <FakeComp/>
                <Home />
                <LengthPrinter/>
            </div>
        )
    }
}

ReactDOM.render(<Index />,
    document.getElementById('root'))