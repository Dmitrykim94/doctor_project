import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import FakeComp from './components/fakeComp'
import Home from '../src/components/Home';
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import combinedReducer from './components/reducers/index'
import { composeWithDevTools } from 'redux-devtools-extension'
import FakeCases from './components/fakeCases'
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom'

const store = createStore(combinedReducer, composeWithDevTools())

class Index extends Component {
    render() {
        return (
<div>       <Switch>
            <Route exact path ='/' component={Home} />
            <Route path='/cases' component= {FakeCases} />
            <Route path='/comp' component = {FakeComp} />
            </Switch>
            </div>
        )
    }
}

const mapStateToProps = state => ({

})

const mapDispatchToProps = dispatch => ({

})

const IndexWithRouter = withRouter(connect(mapStateToProps, mapDispatchToProps)(Index))


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <IndexWithRouter />
        </Router>
    </Provider>,
    document.getElementById('root'))