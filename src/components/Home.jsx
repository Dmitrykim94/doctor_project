import React from 'react'
import { Icon } from 'semantic-ui-react'
import { Link } from 'react-router-dom'


class Home extends React.Component {
    state = {

    }
    render() {
        return (
            <Link to='/comp'>
                <br />
                <h2 style={{ display: 'flex', justifyContent: 'center' }}>Нажмите для вызова врача</h2>
                <Icon.Group style={{ display: 'flex', justifyContent: 'center', color: '#E63B2E' }} size='big'>
                    <Icon size='massive' name='exclamation circle' />
                </Icon.Group>
            </Link>
        )
    }
}



export default Home