import React, { Component } from 'react'
import { YMaps, Map, Placemark } from 'react-yandex-maps'
ymaps.ready(function () {
        // Расчет расстояния
        // for (let i = 0; i < doctorsSelected.length; i++) {
            ymaps.geocode(`${address} москва`)
                .then(function (res) {
                    let aPoint = res.geoObjects.get(0)
                        .geometry.getCoordinates();
                    ymaps.geocode(`${doctorsSelected[i].address} москва`)
                        .then(function (res) {
                            let bPoint = res.geoObjects.get(0)
                                .geometry.getCoordinates();
                            // Расстояние.
                            alert(ymaps.formatter.distance(ymaps.coordSystem.geo
                                .getDistance(aPoint, bPoint)).replace('&#160;км', ''));
                            // alert(doctorsSelected[i].address);
                        });
                });
        // }
        // console.log(distances);
        // console.log(addresses);
        // Гончарная улица, 26к1
    

    let myMap = new ymaps.Map("map", {
        center: [55.76, 37.64],
        zoom: 10,
        controls: ["fullscreenControl", "zoomControl", "searchControl", "routeButtonControl",
        ]
    }, {
            searchControl: 'yandex#search'
        });


})

export default class MapYandex extends Component {
    state = {
        addresses: ['Тверская,6', 'Космонавтов 8к2', 'Октябрьский проспект, 411а'],
        coordinates: []
    }

    componentDidMount = async () => {
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
            <div>
                {/* <YMaps>
                    <div>
                        <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} >
                            {this.state.coordinates.map((item) => {
                                return (
                                    <Placemark
                                        modules={['geoObject.addon.balloon']}
                                        geometry={[item[0], item[1]]}
                                        properties={{
                                            balloonContent:
                                                'placemark 1',
                                        }}
                                        clusters={{
                                            preset: 'islands#blueMedicalCircleIcon'
                                        }}
                                    />
                                )
                            })}
                        </Map >
                    </div>
                </YMaps> */}
            </div>
        )
    }
}
