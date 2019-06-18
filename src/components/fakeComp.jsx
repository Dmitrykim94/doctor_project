import React from 'react'
import firebase from '../firebase'
// import { cases, doctors } from '../fakeData'
import { connect } from "react-redux";

class FakeComp extends React.Component {
    state = {
        casesRef: firebase.database().ref('cases'),
        sms: '',
        caseId: ''
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }


    sendText = async (data) => {
        console.log(data)
        await fetch('/send-sms', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
             body: JSON.stringify({
                text: data
            })
        })
    }



    addCase = () => {
        const { desc, tel, howto, casesRef, address } = this.state

        const key = casesRef.push().key

        const newCase = {
            id: key,
            desc: desc,
            address: address,
            tel: tel,
            howto: howto,
        }

        this.setState({ caseId: newCase.id })

        casesRef
            .child(key)
            .update(newCase)
            .then(this.sendText({
                desc: newCase.desc,
                address: newCase.address,
                tel: newCase.tel,
                howto: newCase.howto
            }))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.addCase()
    }



    render() {

        return (
            <div>
                <form action="post" onSubmit={this.handleSubmit}>
                    <input required type="text" placeholder='desc' name='desc' onChange={this.handleChange} />
                    <br />
                    <input required type="text" placeholder='address' name='address' onChange={this.handleChange} />
                    <br />
                    <input required type="text" placeholder='tel' name='tel' onChange={this.handleChange} />
                    <br />
                    <input required type="text" placeholder='howto' name='howto' onChange={this.handleChange} />
                    <button>submit</button>
                </form>
            </div>
        )
    }
}



const mapStateToProps = state => ({
    cases: state.cases.cases,
    doctors: state.cases.doctors
});

export default connect(
    mapStateToProps,
    null
)(FakeComp);


