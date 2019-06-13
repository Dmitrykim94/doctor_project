import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Home from '../src/components/Home';


class Index extends Component {
    render() {
        return (
            <div>
                <Home />
            </div>
        )
    }
}

ReactDOM.render(<Index />,
    document.getElementById('root'))