import React from 'react'
import {Form, Button} from 'semantic-ui-react'
import firebase from '../../firebase'


class Login extends React.Component {
    state = {
        password:'',
        email:''
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        firebase.auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(signedInUser => {
            console.log(signedInUser)
        })
        .catch(e => {
            console.log(e)
        })
    }

    render(){
        return(
            <Form onSubmit = {this.handleSubmit} >
                <br/>
                <Form.Input style={{width:'500px'}} name='email' icon ='mail' placeholder = 'e-mail' onChange={this.handleChange}/>
                <Form.Input style={{width:'500px'}} name='password' type='password' icon ='lock' placeholder = 'Пароль' onChange={this.handleChange}/>
                <Button color='green' style={{width:'500px'}}> Войти </Button>
            </Form>
        )
    }
}



export default Login