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
            <Link to='/home'>
                <Menu.Item
                    name='home'
                    active={activeItem === 'home'}
                    onClick={this.handleItemClick}
                />
            </Link>
            <Menu.Item
                name='Registration'
                active={activeItem === 'messages'}
                onClick={this.handleItemClick}
                onClick={this.openModalReg}
            />
            <Menu.Item
                name='Login'
                active={activeItem === 'friends'}
                onClick={this.handleItemClick}
                onClick={this.openModalLog}
            />
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

                {/* <button >МНЕ ПЛОХО!</button> */}
                <Icon.Group onClick={this.openModalHelp} size='massive'>
                    <Icon size='big' name='exclamation circle' />
                </Icon.Group>
                <Modal isOpen={this.state.showModalHelp} >
                    <form>

                        <label>Опишите вашу проблему</label><p />
                        <Input fluid onChange={e => this.setState({ text: e.target.value })} />

                        <p />
                        <label>Адрес указан верно?</label><p />
                        <Input onChange={e => this.setState({ address: e.target.value })} fluid value="Москва, ул. Бурденко, 14А" />

                        <p />
                        <label>Укажите номер телефона</label><p />
                        <Input onChange={e => this.setState({ phone: e.target.value })}>
                            <input />
                        </Input><p />
                        <label>Как попасть к вам в квартру?</label><p />
                        <Input onChange={e => this.setState({ howTo: e.target.value })} icon='exclamation circle' placeholder='Код домофона, этаж, подъезд'>
                            <input />
                        </Input>

                        <p />
                        <button onClick={this.closeModalHelp}>Submit</button><p />
                    </form>
                </Modal>
                <Modal isOpen={this.state.showModalReg}>
                    <form>
                        <label>Введите имя и фамилю</label><p />
                        <Input >
                            <input />
                        </Input><p></p>
                        <label>Введите номер телефона</label><p />
                        <Input >
                            <input />
                        </Input><p></p><p></p>
                        <label>Введите почту</label><p />
                        <Input >
                            <Icon />
                            <input />
                        </Input><p></p>
                        <label>Введите пароль</label><p />
                        <Input type='password' >
                            <input />
                        </Input><p></p>
                        <button onClick={this.closeModalReg}>Submit</button>
                    </form>
                </Modal>
                <Modal isOpen={this.state.showModalLog}>
                    <form>
                        <label>Введите почту</label><p />
                        <Input >
                            <input />
                        </Input><p></p>
                        <label>Введите пароль</label><p />
                        <Input type='password'>
                            <input />
                        </Input>
                        <button onClick={this.closeModalLog}>Submit</button>
                    </form>
                </Modal>
            </div>
        )
    }
}
 
