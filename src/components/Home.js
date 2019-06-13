import React, { Component } from 'react';
import Modal from 'react-modal';
import { YMaps, Map, Placemark, GeoObject, RouteButton } from 'react-yandex-maps';
import { Menu, Input, Icon } from 'semantic-ui-react';
import { Link, Route } from 'react-router-dom';


export default class Home extends Component {

    state = {
        cases: [],
        address: null,
        doctorIsLogged: false,
        showModalHelp: false,
        showModalLog: false,
        showModalReg: false,
        activeItem: 'home',
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    openModalHelp = () => {
        this.setState({ showModalHelp: true })
    }
    closeModalHelp = () => {
        this.setState({ showModalHelp: false })
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

    handleClick = (event) => console.log('Clicked', event);


    render() {
        const { activeItem } = this.state.activeItem;
        const mapState = {
            center: [55.751574, 37.573856],
            zoom: 3,
        };

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
                        <Input fluid />

                        <p />
                        <label>Адрес указан верно?</label><p />
                        <Input fluid value="Москва, ул. Бурденко, 14А" />

                        <p />
                        <label>Укажите номер телефона</label><p />
                        <Input >
                            <input />
                        </Input><p />
                        <label>Как попасть к вам в квартру?</label><p />
                        <Input icon='exclamation circle' placeholder='Код домофона, этаж, подъезд'>
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

                <YMaps>
                    <div>
                        <Map onClick={this.handleClick} defaultState={{ center: [55.75, 37.57], zoom: 9 }} >

                            <RouteButton options={{ float: 'right' }} />



                        </Map>
                    </div>
                </YMaps>
            </div>
        )
    }
}
