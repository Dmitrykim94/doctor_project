import React from 'react'
import firebase from '../firebase'
import {connect} from 'react-redux'


class FakeOtkliks extends React.Component {
    state = {
        cases: firebase.database().ref('cases'),
        key: [],
        lat: [],
        post: '',
    }



    render() {
        const {cases} = this.props

        return (<ul>
            {cases.length > 0 && cases.map(i => {
                return <li key = {i.id}> lat: {i.lat}</li>
            })}
        </ul>
        )


    }
}

const mapStateToProps = (state) => ({
    cases: state.cases.cases
})
// export default connect(mapStateToProps) (FakeOtkliks)
export default connect (mapStateToProps) (FakeOtkliks)