import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import LengthPrinter from './components/Map'
import FakeComp from './components/fakeComp'
import Home from '../src/components/Home';
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'
import combinedReducer from './components/reducers/index'
import { composeWithDevTools } from 'redux-devtools-extension'
import FakeCases from './components/fakeCases'
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom'
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import firebase from './firebase'
import { setUser, clearUser } from './components/actions/index'


const store = createStore(combinedReducer, composeWithDevTools())

class Index extends Component {

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.setUser(user)
            }else{
                this.props.clearUser()
            }
        })
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route path='/cases' component={FakeCases} />
                    <Route path='/comp' component={FakeComp} />
                    <Route path='/register' component={Register} />
                    <Route path='/login' component={Login} />
                    <Route path='/map' component={LengthPrinter} />
                </Switch>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.currentUser
})

const mapDispatchToProps = dispatch => ({
    setUser: (user) => dispatch(setUser(user)),
    clearUser: () => dispatch(clearUser())
})

const IndexWithRouter = withRouter(connect(mapStateToProps, mapDispatchToProps)(Index))


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <IndexWithRouter />
        </Router>
    </Provider>,
    document.getElementById('root'))