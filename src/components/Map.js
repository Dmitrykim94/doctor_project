import React, { Component } from 'react'
import { YMaps, Map, Placemark, withYMaps } from 'react-yandex-maps'

class LengthPrinter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            routeLength: null,
        };
    }

    componentDidMount() {
        this._isMounted = true;
        this.props.ymaps.route(this.props.route).then(route => {
            if (this._isMounted === true) {
                this.setState({
                    routeLength: route.getHumanLength().replace('&#160;', ' '),
                });
            }
        });
        
    }
    
    componentWillUnmount() {
        this._isMounted = false;
        console.log(this.state.routeLength);
    }
    
    render() {
        // let closest = [];
        // {closest.push(this.state.routeLength)}
        // console.log(closest);
        return this.state.routeLength == null ? (
            <p>Loading route...</p>
        ) : (
                <p>This route is {this.state.routeLength} long</p>
            );
    }
}

const ConnectedLengthPrinter = withYMaps(LengthPrinter, true, ['route']);

export default class Start extends React.Component {
    state = {
        routeLength: null,
        addresses: ['Тверская,6', 'Космонавтов 8к2', 'Октябрьский проспект, 411а'],
        coordinates: [],
        clientAddress: ['Бурденко, 14А']
    }

    async componentDidMount() {
        let doctorsAddresses = this.state.addresses
        let allDoctorCoordinates = []
        for (let i = 0; i < doctorsAddresses.length; i++) {
            let res = await fetch(encodeURI(`https://geocode-maps.yandex.ru/1.x/?apikey=5fbca2da-4afa-416a-97f8-463929f62c71&format=json&geocode=${doctorsAddresses[i]}`));
            let result = await res.json();
            let coordinates = result.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ')
            let onePlacemark = [coordinates[1], coordinates[0]]
            allDoctorCoordinates.push(onePlacemark)
        }
        this.setState({ coordinates: allDoctorCoordinates })
    }


    render() {
        return (
            <YMaps
                query={{
                    apikey: '5fbca2da-4afa-416a-97f8-463929f62c71',
                }}
            >
                <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} >
                    {this.state.coordinates.map((item) => {
                        return (
                            <Placemark
                                modules={['geoObject.addon.balloon']}
                                geometry={[item[0], item[1]]}
                                properties={{
                                    balloonContent:
                                        'placemark 1'
                                }}
                            />
                        )
                    })}
                </Map>

                {this.state.addresses.map((el) => {
                    return (
                        <ConnectedLengthPrinter route={[el,this.state.clientAddress[0]]} />
                    )
                })}
            </YMaps>)
    }
}
