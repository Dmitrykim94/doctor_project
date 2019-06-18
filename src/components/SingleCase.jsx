import React from 'react'
import firebase from '../firebase'
import { connect } from 'react-redux'
import Map2 from './Map'
import { YMaps, Map, Placemark, withYMaps, ZoomControl } from 'react-yandex-maps'
import { conditionalExpression } from '@babel/types';


class SingleCase extends React.Component {
    state = {
        address: '',
        desc: '',
        howto: '',
        tel: '',
    }

    componentDidMount() {
        let id = window.location.href.match('([^\/]+$)')[0]
        console.log(id)
        firebase.database().ref('cases').child(id).once('value', snap => {
            this.setState({
                address: snap.val().address,
                desc: snap.val().desc,
                howto: snap.val().howto,
                tel: snap.val().tel
            })
        })
    }

    render() {
        console.log('======================');
        
        console.log(this.props);
        const { user, trueUser } = this.props
        
        let page;
        if (user === null) {
            page = <React.Fragment>
                {/* <Map /> */}
            </React.Fragment>
        } else {
            page = <React.Fragment>
                
                {/* <Map2 
                ymaps={this.props.ymaps}/>
                logged In */}
            </React.Fragment>
        }
        return (
            page
        )
    }
}

const mapStateToProps = state => ({
    user: state.user.currentUser,
    trueUser: state.user.trueUser
})

export default connect(mapStateToProps)(SingleCase)