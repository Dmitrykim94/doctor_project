import React from 'react'
import firebase from '../firebase'
import {cases, doctors} from '../fakeData'

class FakeComp extends React.Component {
    state = {
        casesRef: firebase.database().ref('cases'),


    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    addCase = () => {
        const { desc, lat, long, tel, howto, casesRef } = this.state

        const key = casesRef.push().key

        const newCase = {
            id:key,
            desc:desc,
            lat:lat,
            long:long,
            tel:tel,
            howto:howto,
        }

        casesRef
        .child(key)
        .update(newCase)
        .then(console.log('case added'))

    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.addCase()
    }

    render(){
        return(
            <div>{JSON.stringify(cases[0])}
            <form action="post" onSubmit= {this.handleSubmit}>
                <input type="text" placeholder = 'desc' name ='desc' onChange = {this.handleChange}/>
                <br/>
                <input type="text" placeholder = 'lat' name = 'lat' onChange = {this.handleChange}/>
                <br/>
                <input type="text" placeholder = 'long' name = 'long' onChange = {this.handleChange}/>
                <br/>
                <input type="text" placeholder = 'tel' name = 'tel' onChange = {this.handleChange}/>
                <br/>
                <input type="text" placeholder = 'howto' name = 'howto' onChange = {this.handleChange}/>
                <button>submit</button>
            </form>
            </div>
        )
    }
}



export default FakeComp