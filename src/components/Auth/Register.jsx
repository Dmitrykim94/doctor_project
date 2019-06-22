import React from 'react'
import {Form, Button} from 'semantic-ui-react'
import firebase from '../../firebase'


class Register extends React.Component {
    state = {
        name:'',
        email:'',
        address:'',
        type: '',
        phone: '',
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
        console.log(createdUser)
        return this.state.usersRef.child(createdUser.user.uid).set({
            name:createdUser.user.displayName,
            email: createdUser.user.email,
            address: this.state.address,
            type: this.state.type,
            phone: this.state.phone
            }).catch((e) => console.log(e))
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
                <br/>
                <Form.Input style={{width:'500px'}} name='name' icon ='user' placeholder = 'Имя' onChange={this.handleChange}/>
                <Form.Input style={{width:'500px'}} name='email' icon ='mail' placeholder = 'e-mail' onChange={this.handleChange}/>
                <Form.Input style={{width:'500px'}} name='address' icon ='home' placeholder = 'Адрес' onChange={this.handleChange}/>
                <Form.Input style={{width:'500px'}} name='phone' icon ='phone' placeholder = 'Телефон' onChange={this.handleChange}/>
                <Form.Input style={{width:'500px'}} name='type' icon ='add' placeholder = 'Тип' onChange={this.handleChange}/>
                <Form.Input style={{width:'500px'}} name='password' type='password' icon ='lock' placeholder = 'Пароль' onChange={this.handleChange}/>
                <Form.Input style={{width:'500px'}} name='passwordConfirmation' type='password' icon ='lock' placeholder = 'Подтвердите пароль' onChange={this.handleChange}/>
                <Button color='green' style={{width:'500px'}}>Зарегистрироваться</Button>
            </Form>
        )
    }
}



export default Register