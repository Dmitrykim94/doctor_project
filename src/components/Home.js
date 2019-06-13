import React, { Component } from 'react';
import { YMaps, Map } from 'react-yandex-maps';
// ymaps.ready(init);
// function init() {
//     let myMap = new ymaps.Map("map", {
//         center: [55.76, 37.64],
//         zoom: 10,
//         controls: ["fullscreenControl", "zoomControl", "searchControl", "routeButtonControl",
//         ]
//     }, {
//             searchControl: 'yandex#search'
//         });
// }
export default class Home extends Component {

    state = {
        case: null,
        address: null
    }

    render() {
        return (
            <div>
                <YMaps>
                    <div>
                        My awesome application with maps!
                        <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} />
                    </div>
                </YMaps>
            </div>
        )
    }
}
