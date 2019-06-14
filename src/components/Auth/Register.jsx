import React from 'react'
import {Form, Button} from 'semantic-ui-react'
import firebase from '../../firebase'


class Register extends React.Component {
    state = {
        name:'',
        email:'',
        password:'',
        passwordConfirmation:'',
        usersRef: firebase.database().ref('users'),
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value })
    }

    isPasswordValid =() => {
        return this.state.password === this.state.passwordConfirmation
    }

    saveUser = (createdUser) => {
        return this.state.usersRef.child(createdUser.user.uid).set({
            name:createdUser.user.displayName,
            }).catch(e => console.log('user not saved'))
    }

    handleSubmit = (e) => {
        e.preventDefault()
        if(this.isPasswordValid){
            firebase
            .auth()
            .createUserWithEmailAndPassword(this.state.email, this.state.password)
            .then(createdUser => {
                createdUser.user.updateProfile({
                    displayName: this.state.name
                })
                .then(()=> {
                    this.saveUser(createdUser).then(()=> console.log('user saved'))
                }).catch(e=>console.log(e))
            })
        }else{
            console.log('invalid password')
        }
    }



    render(){
        return(
            <Form onSubmit = {this.handleSubmit}>
                <Form.Input name='name' icon ='user' placeholder = 'Имя' onChange={this.handleChange}/>
                <Form.Input name='email' icon ='mail' placeholder = 'e-mail' onChange={this.handleChange}/>
                <Form.Input name='password' icon ='lock' placeholder = 'Пароль' onChange={this.handleChange}/>
                <Form.Input name='passwordConfirmation' icon ='lock' placeholder = 'Подтвердите пароль' onChange={this.handleChange}/>
                <Button>Submit</Button>
            </Form>
        )
    }
}



export default Register