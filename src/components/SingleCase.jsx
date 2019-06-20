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
                desc: snap.val().desc,
                howto: snap.val().howto,
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
                <p>{doctorsAddress.length>0 ? doctorsAddress : 'В поисках доктора'}</p>
                {address}
                <MapCase doctorData={doctorsAddress.length > 0 ? doctorsAddress : address} clientAddress={address} />
            </React.Fragment>
        } else if (user !== null) {
            page = <React.Fragment>
                <p>doctor</p>
                CLIENT {address}
                <br />
                DOCTOR {trueUser.address}
                <MapCase doctorData={this.props.trueUser.address} clientAddress={address} />
                <Button onClick={this.handleAccept}>Accept</Button><Button>Decline</Button>
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