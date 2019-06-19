import React from 'react'
import firebase from '../firebase'
// import { cases, doctors } from '../fakeData'
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react'



class FakeComp extends React.Component {
    state = {
        casesRef: firebase.database().ref('cases'),
        case: '',
        sms: '',
        caseId: ''
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    sendText = async (data) => {
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

        this.setState({ case: key })

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
                address: newCase.address,
                desc: newCase.desc,
                address: newCase.address,
                tel: newCase.tel,
                howto: newCase.howto
            }))
            .then(() => this.props.history.push(newCase.id))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.addCase()
    }



    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Input required name='desc' icon='user' placeholder='Опишите вашу проблему' onChange={this.handleChange} />
                    <Form.Input required name='address' icon='mail' placeholder='Укажите адрес' onChange={this.handleChange} />
                    <Form.Input required name='tel' icon='home' placeholder='Номер телефона' onChange={this.handleChange} />
                    <Form.Input required name='howto' icon='phone' placeholder='Как попасть к вам в квартиру' onChange={this.handleChange} />
                    <Button>Submit</Button>
                </Form>
            </div>
        )
    }
}



const mapStateToProps = state => ({
    cases: state.cases.cases,
    doctors: state.cases.doctors
});

export default withRouter(connect(
    mapStateToProps,
    null
)(FakeComp));


