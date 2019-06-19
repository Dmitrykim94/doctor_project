import React, { Component } from 'react'
import { YMaps, Map, Placemark, withYMaps } from 'react-yandex-maps'

class Start extends React.Component {
    state = {
        routeLength: null,
        addresses: ['Тверская,6', 'Космонавтов 8к2', 'Октябрьский проспект, 411а'],
        coordinates: [],
        clientAddress: ['Бурденко, 14А'],
        routes: [
            { address: 'Тверская,6', distance: null, distanceFound: false },
            { address: 'Октябрьский проспект, 411а', distance: null, distanceFound: false },
            { address: 'Космонавтов 8к2', distance: null, distanceFound: false },
        ],
        closest: null
    }

    async componentDidMount() {
        console.log(this.props);
        
        this._isMounted = true;
        this.props.ymaps.route(this.props.route).then(route => {
            if (this._isMounted === true) {
                this.setState({
                    routeLength: route.getHumanLength().replace('&#160;', ' '),
                });
            }
        });
        this.props.ymaps.route([
            'Королев',
            { type: 'viaPoint', point: 'Мытищи' },
            'Химки',
            { type: 'wayPoint', point: [55.811511, 37.312518] }
        ], {
            mapStateAutoApply: true
        }).then(function (route) {
            this.props.ymaps.map.geoObjects.add(route);
        });
        let a = []
        let promises = [];
        await this.state.routes.forEach((el, key) => {
            promises.push(
                this.props.ymaps.route([el.address, this.state.clientAddress[0]]).then(route => {
                    const state = this.state;
                    state.routes[key].distance = route.getJamsTime();
                    state.routes[key].distanceFound = true;
                    a.push(route.getJamsTime())
                    this.setState(state);
                })
            )
        })
        await Promise.all(promises)
        a.sort((a,b) => a-b)
        console.log(a);
        console.log(this.state.routes);
        let closestAddress = ''
        this.state.routes.forEach((item) => {
            if (item.distance === a[0])
                closestAddress = item.address
        })
        
        this.setState({closest:closestAddress})

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

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {


       
        return (
            <YMaps
                query={{
                    apikey: '5fbca2da-4afa-416a-97f8-463929f62c71',
                }}
            >
                <p>the closest address is {this.state.closest}</p>
                <Map  width="100%" height='320px' defaultState={{ center: [55.75, 37.57], zoom: 9 }} >
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
            </YMaps>)
    }
}

//export default withYMaps(Start, true, ['route']);
const WrapperStart = withYMaps(Start, true, ['route']);
export default () => <YMaps
    query={{
        apikey: '5fbca2da-4afa-416a-97f8-463929f62c71',
    }}
>
    <WrapperStart />
</YMaps>