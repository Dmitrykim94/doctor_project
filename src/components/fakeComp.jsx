import React from 'react'
import firebase from '../firebase'
// import { cases, doctors } from '../fakeData'
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react'
const xmlToJson = require('xml-to-json-stream');
const parser = xmlToJson({ attributeMode: false });
// const key = `9c5a9e34-2897-4d0e-8fc7-7908574f4150`
// const keyKim = `5fbca2da-4afa-416a-97f8-463929f62c71`

class FakeComp extends React.Component {
    state = {
        casesRef: firebase.database().ref('cases'),
        case: '',
        sms: '',
        caseId: '',
        foundAddress: ''
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

    componentDidMount() {
        navigator.geolocation.getCurrentPosition(async (position) => {
            console.log(position.coords.latitude, 'latitude');
            console.log(position.coords.longitude, 'longitude');
            let res = await fetch(
                encodeURI(`https://geocode-maps.yandex.ru/1.x/?apikey=9c5a9e34-2897-4d0e-8fc7-7908574f4150&geocode=${position.coords.longitude},${position.coords.latitude}`)
            )
            let geoLocation = await res.text();
            let pushed = [];
            parser.xmlToJson(geoLocation, async (err, json) => {
                if (err) {
                    console.log(err);
                }
                await pushed.push(json.ymaps.GeoObjectCollection.featureMember[0].GeoObject.name)
            });
            await this.setState({ foundAddress: pushed[0] })
        });
    }

    addCase = () => {
        const { tel, casesRef, address } = this.state

        const key = casesRef.push().key

        this.setState({ case: key })

        const newCase = {
            id: key,
            address: address,
            tel: tel,
        }

        this.setState({ caseId: newCase.id })

        casesRef
            .child(key)
            .update(newCase)
            .then(this.sendText({
                address: newCase.address,
                tel: newCase.tel,
                id: newCase.id
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
                    <br/>
                    {/* <Form.Input required name='desc' icon='user' placeholder='Опишите вашу проблему' onChange={this.handleChange} /> */}
                    <Form.Input style={{width:'500px'}}  required name='address' icon='mail' placeholder='Укажите адрес' defaultValue={this.state.foundAddress} onChange={this.handleChange} />
                    <Form.Input style={{width:'500px'}} required name='tel' icon='phone' placeholder='Номер телефона' onChange={this.handleChange} />
                    {/* <Form.Input required name='howto' icon='home' placeholder='Как попасть к вам в квартиру' onChange={this.handleChange} /> */}
                    <Button color='green' style={{width:'500px'}}>Найти доктора</Button>
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


