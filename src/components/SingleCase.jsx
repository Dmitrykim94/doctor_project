import React from 'react'
import firebase from '../firebase'
import { connect } from 'react-redux'
import MapCase from './MapCase'

class SingleCase extends React.Component {    
    
    state = {
        address: '',
        desc: '',
        howto: '',
        tel: '',
        adr: ''
    }

    async componentDidMount() {
        let id = window.location.href.match('([^\/]+$)')[0]
        firebase.database().ref('cases').child(id).once('value', async snap => {
            
            await this.setState({                
                address: "snap.val().address",
                desc: snap.val().desc,
                howto: snap.val().howto,
                tel: snap.val().tel,
                adr: 'Москва, Улица Пушкина 15'
            })
            
        })
    }

    render() {
        // console.log(this.props.history);
        
        const { user, trueUser, cases } = this.props
        // console.log(cases);

        let page;
        if (user === null) {
            page = <React.Fragment>
                {/* <Map /> */}
            </React.Fragment>
        } else {
            page = <React.Fragment>
            <MapCase doctorData = {trueUser} test = {this.state.adr}/>  
            </React.Fragment>
        }
        return (
            page
        )
    }
}

const mapStateToProps = state => ({
    cases: state.cases.cases,
    user: state.user.currentUser,
    trueUser: state.user.trueUser
})

export default connect(mapStateToProps)(SingleCase)