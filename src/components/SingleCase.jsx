import React from 'react'
import firebase from '../firebase'
import {connect} from 'react-redux'
import MapCase from './MapCase'
import { Button } from 'semantic-ui-react'


class SingleCase extends React.Component {
    state = {
        address:'',
        desc: '',
        howto:'',
        tel:'',
    }

    componentDidMount() {
       let id = window.location.href.match('([^\/]+$)')[0]
       firebase.database().ref('cases').child(id).once('value', snap => {
           this.setState({
               address: snap.val().address,
               desc: snap.val().desc,
               howto: snap.val().howto,
               tel: snap.val().tel
           })
       })
    }

    render(){
        const { user, trueUser } = this.props
        const { address, desc, howto, tel } = this.state
        let page;
        if(user === null) {
            page = <React.Fragment>
                <p>only doctor</p>
                <MapCase doctorData={this.props.trueUser.address} clientAddress={address}/>
            </React.Fragment>
        }else{
            page = <React.Fragment>
                <p>doctor</p>
                <MapCase doctorData={this.props.trueUser.address} clientAddress={address}/>
                <Button>Accept</Button><Button>Decline</Button>
            </React.Fragment>
        }
        return(
            page
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.currentUser,
    trueUser: state.user.trueUser,
})

export default connect(mapStateToProps) (SingleCase)