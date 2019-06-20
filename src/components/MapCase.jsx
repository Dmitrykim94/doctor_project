import React from 'react'
import { YMaps, Map, ZoomControl } from 'react-yandex-maps'
import firebase from '../firebase'


const mapData = {
    center: [55.751574, 37.573856],
    zoom: 9,
};


export default class MapCase extends React.Component {
    yandexMaps = null;
    removed = null;
    state = {
        doctorData: '',
        clientAddress: ''
    }

    componentDidMount() {
        console.log('update')
        let id = window.location.href.match('([^\/]+$)')[0]
        this.addListener(id)

    }

    addListener = id => {
        console.log(this.state.doctorData)
        firebase.database().ref('cases').child(id).child('doctors').on('child_added', async (snap) => {

            await this.setState({
                doctorData: snap.val()
            });

            if (this.yandexMaps) {
                let multiRoute = new this.yandexMaps.multiRouter.MultiRoute({
                    referencePoints: [this.state.doctorData || this.props.doctorData, this.state.clientAddress || this.props.clientAddress]
                }, {
                        // Автоматически устанавливать границы карты так,
                        // чтобы маршрут был виден целиком.
                        boundsAutoApply: true
                    });
                this.map.geoObjects.remove(this.removed);
                this.map.geoObjects.add(multiRoute);
            }

        })
    }

    handleApiAvaliable = ymaps => {
        this.yandexMaps = ymaps;
        this.setState({
            doctorData: this.props.doctorData,
            clientAddress: this.props.clientAddress
        })

        let multiRoute = new ymaps.multiRouter.MultiRoute({
            referencePoints: [this.state.doctorData || this.props.doctorData, this.state.clientAddress || this.props.clientAddress]
        }, {
                // Автоматически устанавливать границы карты так,
                // чтобы маршрут был виден целиком.
                boundsAutoApply: true
            });
        this.removed = multiRoute;
        this.map.geoObjects.add(multiRoute);
    };

    render() {
        // console.log(this.state.casesRef);

        return (
            this.props.doctorData && <YMaps>
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
                </div>
            </YMaps>
        )
    }
}