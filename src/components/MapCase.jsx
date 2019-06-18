import React from 'react'
import { YMaps, Map, ZoomControl } from 'react-yandex-maps'
import firebase from '../firebase'
import { Button } from 'semantic-ui-react'

const mapData = {
    center: [55.751574, 37.573856],
    zoom: 9,
};


export default class MapCase extends React.Component {

    handleApiAvaliable = ymaps => {

        let multiRoute = new ymaps.multiRouter.MultiRoute({
            referencePoints: [this.props.doctorData.address, 'Москва, метро Библиотека']
        }, {
                // Автоматически устанавливать границы карты так,
                // чтобы маршрут был виден целиком.
                boundsAutoApply: true
            });
        this.map.geoObjects.add(multiRoute);
    };

    render() {
        // console.log(this.state.casesRef);

        // console.log(this.props.doctorData.address);
        return (
            this.props.test && this.props.doctorData && <YMaps>
                <div style={{ position: 'absolute', left: '25%', right: '25%' }}>
                    <Map
                        defaultState={mapData}
                        modules={['multiRouter.MultiRoute']}
                        onLoad={ymaps => this.handleApiAvaliable(ymaps)}
                        instanceRef={ref => (this.map = ref)}
                        width={1000}
                        height={600}
                    >
                        <ZoomControl />
                    </Map>
                    <Button>Accept</Button><Button>Decline</Button>
                </div>
            </YMaps>
        )
    }
}