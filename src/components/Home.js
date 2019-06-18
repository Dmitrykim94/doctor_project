import React, { Component } from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';


export default class Home extends Component {

    state = {
        doctorIsLogged: false,
        activeItem: 'home',
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

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
        />           
            </Link>

            <Link to='/login'>
            <Menu.Item
                name='Login'
                active={activeItem === 'home'}
                onClick={this.handleItemClick}
            />
            </Link>
        </Menu>);
        const logMenu = (<Menu secondary>
            <Link to='/'>
                <Menu.Item
                    name='home'
                    active={activeItem === 'home'}
                    onClick={this.handleItemClick}
                />
            </Link>

            <Link to='/map'>
                <Menu.Item
                    name='Map'
                    active={activeItem === 'home'}
                    onClick={this.handleItemClick}
                />
            </Link>
            <Link to='/cases'>
                <Menu.Item
                    name='Cases'
                    active={activeItem === 'home'}
                    onClick={this.handleItemClick}
                />
            </Link>
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
                {this.state.doctorIsLogged ? fullMenu : logMenu}

                <Link to='/comp'>
                <Icon.Group onClick={this.openModalHelp} size='massive'>
                    <Icon size='big' name='exclamation circle' />
                </Icon.Group>
                </Link>            
            </div>
        )
    }
}
 
