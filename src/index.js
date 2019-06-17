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
import { setUser, clearUser, trueUser, allDoctors,createCases } from './components/actions/index'



const store = createStore(combinedReducer, composeWithDevTools())

class Index extends Component {

    state ={
        cases: firebase.database().ref('cases'),
    }

    componentDidMount() {
        let cases = []
        firebase.database().ref('cases').on('child_added', snap => {
            let obj = {}
            let val = snap.val()
            obj.desc = snap.val().desc
            obj.howto = snap.val().howto
            obj.id = snap.val().id
            obj.address = snap.val().address
            obj.tel = snap.val().tel
            cases.push(obj)
            this.props.createCases([obj])
        })

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.props.setUser(user)
                this.getTrueUser(user.uid)
                this.getAllDoctors()
            }else{
                this.props.clearUser()
            }
        })
    }

    getAllDoctors = () => {
        firebase.database().ref('users').on('child_added', snap =>{
            this.props.allDoctors(snap.val())
        })
    }


    getTrueUser = (uid) => {
        firebase.database().ref('users').child(uid).once('value', snap => {
            this.props.trueUser(snap.val())
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
    user: state.user.currentUser,
    trueUser: state.trueUser
})

const mapDispatchToProps = dispatch => ({
    setUser: (user) => dispatch(setUser(user)),
    clearUser: () => dispatch(clearUser()),

    createCases: (cases) => dispatch(createCases(cases))
    trueUser: (user2)=> dispatch(trueUser(user2)),
    allDoctors: (doctors) => dispatch(allDoctors(doctors))
})

const IndexWithRouter = withRouter(connect(mapStateToProps, mapDispatchToProps)(Index))


ReactDOM.render(
    <Provider store={store}>
        <Router>
            <IndexWithRouter />
        </Router>
    </Provider>,
    document.getElementById('root'))