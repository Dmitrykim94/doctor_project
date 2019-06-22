import React from 'react'
import firebase from '../firebase'
import { connect } from 'react-redux'
import MapCase from './MapCase'
import { Button } from 'semantic-ui-react'
import { setUser } from './actions/index'


class SingleCase extends React.Component {
    state = {
        address: '',
        desc: '',
        howto: '',
        tel: '',
        doctorsAddress: '',
    }

    componentDidMount() {
        console.log('mount')
        let id = window.location.href.match('([^\/]+$)')[0]
        firebase.database().ref('cases').child(id).once('value', snap => {
            console.log(this)
            this.setState({
                address: snap.val().address,
                tel: snap.val().tel
            })
        }).then(console.log('user is here'))
        this.addLocationListener(id)
    }

    handleAccept = () => {
        let id = window.location.href.match('([^\/]+$)')[0]
        firebase.database().ref('cases').child(id).child('doctors').push(this.props.trueUser.address)
    }

    addLocationListener = (id) => {
        firebase.database().ref('cases').child(id).child('doctors').on('child_added', snap => {
            this.setState({doctorsAddress:snap.val()})
        })
    }
    componentDidUpdate() {
    }

    render() {
        console.log('render')
        const { user, trueUser } = this.props
        const { address, doctorsAddress } = this.state
        console.log(address)
        let page;
        if (trueUser === null) {
            page = <React.Fragment>
                <p>{doctorsAddress.length>0 ? doctorsAddress :<h1> В поисках доктора</h1>}</p>
                <MapCase doctorData={doctorsAddress.length > 0 ? doctorsAddress : address} clientAddress={address} />
            </React.Fragment>
        } else if (user !== null) {
            page = <React.Fragment>
                <MapCase doctorData={this.props.trueUser.address} clientAddress={address} />
                <br></br>
                <Button style={{ position: 'absolute', left: '40%'}} color='green' size='massive' onClick={this.handleAccept}>Принять</Button>
            </React.Fragment>
        }
        return (
            page
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.currentUser,
    trueUser: state.user.trueUser,
})

export default connect(mapStateToProps, { setUser })(SingleCase)