import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FakeComp from './components/fakeComp'


class Index extends Component {
    render() {
        return (
            <div>
                <FakeComp/>
            </div>
        )
    }
}

ReactDOM.render(<Index />,
    document.getElementById('root'))