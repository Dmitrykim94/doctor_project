import React from 'react'


class SingleCase extends React.Component {
    state = {
        id: ''
    }

    componentDidMount() {
       this.setState({id:window.location.href})
    }

    render(){
        return(
            <React.Fragment>
                {this.state.id}

            </React.Fragment>
            
        )
    }
}



export default SingleCase