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


    // componentDidMount() {
    //     console.log(this.state.cases)
    //     this.state.cases.on('child_added', snap => {
    //         let oneCase = snap.val()
    //         let newAdvState = []
    //         for (let i in oneCase){
    //             newAdvState.push({
    //                 id:i,
    //                 lat:oneCase[i].lat
    //             })
    //         }
    //         this.setState({
    //             post:newAdvState
    //         })
    //         console.log(newAdvState)
    //         this.props.createCases(newAdvState)
            
    //     })
    // }

    componentDidMount() {
        let cases = []
        this.state.cases.on('child_added', snap => {
            let obj = {}
            // let val = snap.val()
            obj.desc = snap.val().desc
            obj.howto = snap.val().howto
            obj.id = snap.val().id
            obj.lat = snap.val().lat
            obj.long = snap.val().long
            obj.tel = snap.val().tel
            cases.push(obj)
            this.setState({post: [...this.state.post, obj]})
            this.props.createCases([obj])
        })
        // console.log(cases.length)
     }



    handleOtklik = (id) => {
        // console.log(id)
    }

    render() {
        const { post } = this.state
        return (
            <FakeOtkliks cases={post}/>
        )
    }
}


export default connect(null, {createCases}) (FakeCases)