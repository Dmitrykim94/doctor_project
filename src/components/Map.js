import React, { Component } from 'react'
import ReactDOM from "react-dom";
import { YMaps, Map, Placemark, withYMaps } from 'react-yandex-maps'

// export default class MapYandex extends Component {
//     state = {
//         addresses: ['Тверская,6', 'Космонавтов 8к2', 'Октябрьский проспект, 411а'],
//         coordinates: []
//     }

//     componentDidMount = async () => {
//         let doctorsAddresses = this.state.addresses
//         let allDoctorCoordinates = []
//         for (let i = 0; i < doctorsAddresses.length; i++) {
//             let res = await fetch(encodeURI(`https://geocode-maps.yandex.ru/1.x/?apikey=5fbca2da-4afa-416a-97f8-463929f62c71&format=json&geocode=${doctorsAddresses[i]}`));
//             let result = await res.json();
//             let coordinates = result.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ')
//             let onePlacemark = [coordinates[1], coordinates[0]]
//             allDoctorCoordinates.push(onePlacemark)
//         }
//         this.setState({ coordinates: allDoctorCoordinates })

//     }

//     render() {
//         return (
//             <div>
//                 <YMaps>
//                     <div>
//                         <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} >
//                             {this.state.coordinates.map((item) => {
//                                 return (
//                                     <Placemark
//                                         modules={['geoObject.addon.balloon']}
//                                         geometry={[item[0], item[1]]}
//                                         properties={{
//                                             balloonContent:
//                                                 'placemark 1',
//                                         }}
//                                         clusters={{
//                                             preset: 'islands#blueMedicalCircleIcon'
//                                         }}
//                                     />
//                                 )
//                             })}
//                         </Map >
//                     </div>
//                 </YMaps>
//             </div>
//         )
//     }
// }


class LengthPrinter extends React.Component {
    constructor(props) {
        super(props);
        this.state = { routeLength: null };
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
    }

    render() {
        return this.state.routeLength == null ? (
            <p>Loading route...</p>
        ) : (
                <p>This route is {this.state.routeLength} long</p>
            );
    }
}

const ConnectedLengthPrinter = withYMaps(LengthPrinter, true, ['route']);

export default () =>
    <YMaps
    query={{
        apikey: '5fbca2da-4afa-416a-97f8-463929f62c71',
      }}
    >
           <Map defaultState={{ center: [55.75, 37.57], zoom: 9 }} ></Map>
        <ConnectedLengthPrinter route={['Южное Бутово', 'Северное Бутово']} />
    </YMaps>


  //export default withYMaps(LengthPrinter, true, ['route']);

//   render(
//     <YMaps query={{ lang: 'en_RU' }}>
//       <ConnectedLengthPrinter route={['Moscow, Russia', 'Berlin, Germany']} />
//     </YMaps>
//   );