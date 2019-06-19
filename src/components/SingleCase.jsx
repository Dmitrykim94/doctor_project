import React from 'react'
import firebase from '../firebase'
import {connect} from 'react-redux'


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
                Адрес клиента
                {address}
                <br/>
                Адрес доктора

            </React.Fragment>
        }else{
            page = <React.Fragment>

                Адрес клиента
                {address}
                <br/>
                Адрес доктора
                {this.props.trueUser.address}
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