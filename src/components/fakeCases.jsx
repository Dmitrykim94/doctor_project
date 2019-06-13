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
        post: '',
    }


    componentDidMount() {
        console.log(this.state.cases)
        this.state.cases.on('value', snap => {
            let oneCase = snap.val()
            let newAdvState = []
            for (let i in oneCase){
                newAdvState.push({
                    id:i,
                    lat:oneCase[i].lat
                })
            }
            this.setState({
                post:newAdvState
            })
            console.log(newAdvState)
            this.props.createCases(newAdvState)
            
        })
    }



    handleOtklik = (id) => {
        console.log(id)
    }

    render() {
        const {post} = this.state
        console.log(post)

        return (
            <FakeOtkliks/>
        )


    }
}

export default connect(null, {createCases}) (FakeCases)