import React from 'react'
import firebase from '../firebase'


class FakeOtkliks extends React.Component {
    state = {
        cases: firebase.database().ref('cases'),
        key: [],
        lat: [],
        post: '',
    }



    render() {
        const {cases} = this.props
        console.log(cases)

        return (<ul>
            {cases.length > 0 && cases.map(i => {
                return <li key = {i.id}> lat: {i.lat}</li>
            })}
        </ul>
        )


    }
}



// export default connect(mapStateToProps) (FakeOtkliks)
export default FakeOtkliks