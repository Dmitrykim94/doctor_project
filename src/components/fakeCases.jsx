import React from 'react'
import firebase from '../firebase'
import {createCases} from '../components/actions/index'
import {connect} from 'react-redux'
import FakeOtkliks from './fakeOtkliks'

class FakeCases extends React.Component {
    state = {
        cases: firebase.database().ref('cases'),
        key: [],
        lat: [],
        post: [],
    }

    render() {
        return (
            <FakeOtkliks />
        )
    }
}


export default connect(null, {createCases}) (FakeCases)