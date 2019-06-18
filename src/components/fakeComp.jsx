import React from 'react'
import firebase from '../firebase'
import { connect } from "react-redux";
import { Link, withRouter } from 'react-router-dom'


class FakeComp extends React.Component {
    state = {
        casesRef: firebase.database().ref('cases'),
        case: ''
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

     addCase = () => {
        const { desc, tel, howto, casesRef, address } = this.state

        const key = casesRef.push().key

        this.setState({case:key})

        const newCase = {
            id: key,
            desc: desc,
            address: address,
            tel: tel,
            howto: howto,
        }

        casesRef
            .child(key)
            .update(newCase)
            .then(() => this.props.history.push(newCase.id))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.addCase()
    }



    render() {
        return (
            <div>
                <form action="post" onSubmit={this.handleSubmit}>
                    <input type="text" placeholder='desc' name='desc' onChange={this.handleChange} />
                    <br />
                    <input type="text" placeholder='address' name='address' onChange={this.handleChange} />
                    <br />
                    <input type="text" placeholder='tel' name='tel' onChange={this.handleChange} />
                    <br />
                    <input type="text" placeholder='howto' name='howto' onChange={this.handleChange} />
                    <button>submit</button>
                </form>
            </div>
        )
    }
}



const mapStateToProps = state => ({
    cases: state.cases.cases
});

export default withRouter(connect(
    mapStateToProps,
    null
)(FakeComp));


