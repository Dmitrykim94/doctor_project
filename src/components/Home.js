import React, { Component } from 'react';
import Modal from 'react-modal';
import { Menu, Input, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


export default class Home extends Component {

    state = {
        cases: [],
        address: null,
        doctorIsLogged: false,
        showModalHelp: false,
        showModalLog: false,
        showModalReg: false,
        activeItem: 'home',
        text: null,
        phone: null,
        howTo: null
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    openModalHelp = () => {
        this.setState({ showModalHelp: true })
    }
    closeModalHelp = async () => {
        this.setState({ showModalHelp: false })

        await fetch(`http://localhost:3000/send-sms?text=${this.state.text}`)

    }


    openModalReg = () => {
        this.setState({ showModalReg: true })
    }
    closeModalReg = () => {
        this.setState({ showModalReg: false })
    }
    openModalLog = () => {
        this.setState({ showModalLog: true })
    }
    closeModalLog = () => {
        this.setState({ showModalLog: false })
    }



    sendText = async (e) => {
        e.preventDefault()
        await fetch('/send-sms', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: this.state.text,

            })
        })
    }



    render() {
        const { activeItem } = this.state.activeItem;

        const fullMenu = (<Menu secondary>
            <Link to='/'>
                <Menu.Item
                    name='home'
                    active={activeItem === 'home'}
                    onClick={this.handleItemClick}
                />
            </Link>
            <Link to='/register'>
            <Menu.Item
            name='Registration'
            active={activeItem === 'messages'}
            onClick={this.handleItemClick}
            onClick={this.openModalReg}
        />           
            </Link>

            <Link to='/login'>
            <Menu.Item
                name='Login'
                active={activeItem === 'friends'}
                onClick={this.handleItemClick}
                onClick={this.openModalLog}
            />
            </Link>
        </Menu>);
        const logMenu = (<Menu secondary>
            <Menu.Item name='home'
                active={activeItem === 'home'}
                onClick={this.handleItemClick}
            />
            
            <Menu.Menu position='right'>
                <Menu.Item
                    name='logout'
                    active={activeItem === 'logout'}
                    onClick={this.handleItemClick}
                />
            </Menu.Menu>

        </Menu>)
        return (
            <div>
                {!this.state.doctorIsLogged ? fullMenu : logMenu}

                <Link to='/comp'>
                <Icon.Group onClick={this.openModalHelp} size='massive'>
                    <Icon size='big' name='exclamation circle' />
                </Icon.Group>
                </Link>            
            </div>
        )
    }
}
 
