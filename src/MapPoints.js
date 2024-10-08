import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import { OSM } from 'ol/source.js';
import { Point } from 'ol/geom.js';
import { fromLonLat } from 'ol/proj.js';
import { Feature } from 'ol';
import { Vector as VectorSource } from 'ol/source.js';
import { Style, Fill, Stroke, Circle as CircleStyle } from 'ol/style.js';
import { defaults as defaultControls } from 'ol/control.js';
import Overlay from 'ol/Overlay.js';

const data = {
    coordinates: [
        {
            "latitude": 25.543009,
            "longitude": 58.674264,
            "status": true,
            "details": "Great service, very satisfied!"
        },
        {
            "latitude": 24.603167,
            "longitude": 58.898495,
            "status": false,
            "details": "Service was delayed, not happy."
        },
        {
            "latitude": 24.168430,
            "longitude": 59.310752,
            "status": true,
            "details": "Excellent experience, will use again."
        },
        {
            "latitude": 24.450599,
            "longitude": 58.713636,
            "status": true,
            "details": "Friendly staff, quick response."
        },
        {
            "latitude": 24.371046,
            "longitude": 59.301575,
            "status": false,
            "details": "Had issues with the service, needs improvement."
        },
        {
            "latitude": 24.141558,
            "longitude": 58.620945,
            "status": true,
            "details": "Very professional and timely."
        },
        {
            "latitude": 25.833778,
            "longitude": 58.716681,
            "status": false,
            "details": "Not satisfied, would not recommend."
        },
        {
            "latitude": 26.731192,
            "longitude": 59.325441,
            "status": true,
            "details": "Fantastic job, very pleased!"
        },
        {
            "latitude": 25.780517,
            "longitude": 59.089217,
            "status": false,
            "details": "Communication was poor, not impressed."
        },
        {
            "latitude": 25.746746,
            "longitude": 59.173674,
            "status": true,
            "details": "Service was efficient and effective."
        },
        {
            "latitude": 25.034276,
            "longitude": 59.013401,
            "status": true,
            "details": "Very helpful, great customer service."
        },
        {
            "latitude": 26.470379,
            "longitude": 58.552247,
            "status": false,
            "details": "Had to wait too long, not happy."
        },
        {
            "latitude": 25.930247,
            "longitude": 58.570008,
            "status": true,
            "details": "Prompt and courteous service."
        },
        {
            "latitude": 25.365225,
            "longitude": 58.987725,
            "status": false,
            "details": "Service was below expectations."
        },
        {
            "latitude": 24.935202,
            "longitude": 59.115927,
            "status": true,
            "details": "Very satisfied with the quick turnaround."
        },
        {
            "latitude": 26.430256,
            "longitude": 58.735546,
            "status": true,
            "details": "Good experience, would recommend."
        },
        {
            "latitude": 25.904312,
            "longitude": 59.114292,
            "status": false,
            "details": "Issues with service quality, not satisfied."
        },
        {
            "latitude": 25.792348,
            "longitude": 59.096543,
            "status": true,
            "details": "Service was excellent, very professional."
        },
        {
            "latitude": 24.518023,
            "longitude": 58.513342,
            "status": false,
            "details": "Not what I expected, needs improvement."
        },
        {
            "latitude": 25.278237,
            "longitude": 58.477057,
            "status": true,
            "details": "Great job, very efficient."
        },
        {
            "latitude": 25.975590,
            "longitude": 58.890219,
            "status": true,
            "details": "Very responsive, good service."
        },
        {
            "latitude": 24.903840,
            "longitude": 59.293623,
            "status": false,
            "details": "Service was disappointing, not recommended."
        },
        {
            "latitude": 26.571781,
            "longitude": 59.133753,
            "status": true,
            "details": "Quick and efficient, very pleased."
        },
        {
            "latitude": 26.825068,
            "longitude": 58.743903,
            "status": false,
            "details": "Service took too long, not happy."
        },
        {
            "latitude": 26.577091,
            "longitude": 59.253730,
            "status": true,
            "details": "Very professional and reliable."
        },
        {
            "latitude": 25.369384,
            "longitude": 59.093461,
            "status": true,
            "details": "Friendly and efficient service."
        },
        {
            "latitude": 26.314301,
            "longitude": 58.994217,
            "status": false,
            "details": "Service was not up to the mark."
        },
        {
            "latitude": 25.797374,
            "longitude": 58.537458,
            "status": true,
            "details": "Satisfied with the service provided."
        },
        {
            "latitude": 25.600910,
            "longitude": 58.680638,
            "status": false,
            "details": "Communication was lacking, not happy."
        },
        {
            "latitude": 26.375976,
            "longitude": 59.199492,
            "status": true,
            "details": "Excellent customer service, very happy."
        },
        {
            "latitude": 25.932790,
            "longitude": 58.544320,
            "status": true,
            "details": "Service exceeded expectations."
        },
        {
            "latitude": 26.471267,
            "longitude": 58.863546,
            "status": false,
            "details": "Disappointed with the service, would not recommend."
        },
        {
            "latitude": 25.783936,
            "longitude": 59.010458,
            "status": true,
            "details": "Very efficient and prompt service."
        },
        {
            "latitude": 26.563927,
            "longitude": 58.944737,
            "status": false,
            "details": "Service quality was poor, not satisfied."
        },
        {
            "latitude": 24.420313,
            "longitude": 58.957520,
            "status": true,
            "details": "Service was good, met expectations."
        },
        {
            "latitude": 26.250209,
            "longitude": 59.092931,
            "status": false,
            "details": "Not happy with the service provided."
        },
        {
            "latitude": 24.880904,
            "longitude": 58.618664,
            "status": true,
            "details": "Very satisfied with the overall experience."
        },
        {
            "latitude": 24.071776,
            "longitude": 59.029391,
            "status": true,
            "details": "Great customer service, very pleased."
        },
        {
            "latitude": 26.660852,
            "longitude": 58.616018,
            "status": false,
            "details": "Had issues with the timing of service."
        },
        {
            "latitude": 24.658983,
            "longitude": 58.775929,
            "status": true,
            "details": "Service was prompt and efficient."
        },
        {
            "latitude": 26.039513,
            "longitude": 58.671455,
            "status": false,
            "details": "Service quality could be improved."
        },
        {
            "latitude": 24.573154,
            "longitude": 58.976613,
            "status": true,
            "details": "Very happy with the service provided."
        },
        {
            "latitude": 24.362336,
            "longitude": 58.956102,
            "status": false,
            "details": "Not satisfied with the overall experience."
        },
        {
            "latitude": 24.106042,
            "longitude": 59.331453,
            "status": true,
            "details": "Service was excellent, will use again."
        },
        {
            "latitude": 26.792589,
            "longitude": 58.434062,
            "status": false,
            "details": "Service did not meet expectations."
        },
        {
            "latitude": 24.086809,
            "longitude": 58.428617,
            "status": true,
            "details": "Good service, friendly staff."
        },
        {
            "latitude": 25.599046,
            "longitude": 58.679712,
            "status": true,
            "details": "Great service, very professional."
        },
        {
            "latitude": 24.254756,
            "longitude": 59.239888,
            "status": false,
            "details": "Service was below expectations."
        },
    ],
};

const MapComponent = () => {
    const mapRef = useRef();
    const popupRef = useRef();
    const [map, setMap] = useState(null);
    const [popup, setPopup] = useState(null);
    const [popupContent, setPopupContent] = useState(null);

    useEffect(() => {
        const savedCoordinates = localStorage.getItem('coordinates');
        const initialCoordinates = savedCoordinates ? JSON.parse(savedCoordinates) : data.coordinates;

        const vectorSource = new VectorSource({
            features: initialCoordinates.map((item, index) => {
                const feature = new Feature({
                    geometry: new Point(fromLonLat([item.longitude, item.latitude])),
                    name: item.details,
                    status: item.status,
                    id: index,
                });
                feature.setStyle(createPointStyle(item.status));
                return feature;
            }),
        });

        const vectorLayer = new VectorLayer({ source: vectorSource });

        const initialMap = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({ source: new OSM() }),
                vectorLayer,
            ],
            view: new View({
                center: fromLonLat([58.674264, 25.543009]),
                zoom: 5,
            }),
            controls: defaultControls(),
        });

        const overlayPopup = new Overlay({
            element: popupRef.current,
            autoPan: true,
            autoPanAnimation: { duration: 250 },
        });

        initialMap.addOverlay(overlayPopup);
        setMap(initialMap);
        setPopup(overlayPopup);

        initialMap.on('click', (event) => {
            initialMap.forEachFeatureAtPixel(event.pixel, (feature) => {
                const coordinates = feature.getGeometry().getCoordinates();
                const status = feature.get('status');
                const details = feature.get('name');
                const id = feature.get('id');

                overlayPopup.setPosition(coordinates);
                setPopupContent({ id, coordinates, status, details });
            });
        });

        if (process.env.NODE_ENV === 'development') {
            window.map = initialMap;
            window.vectorSource = vectorSource;
        }

        return () => {
            if (initialMap) initialMap.setTarget(null);
        };
    }, []);

    const createPointStyle = (status) => {
        return new Style({
            image: new CircleStyle({
                radius: 6,
                fill: new Fill({ color: status ? 'green' : 'red' }),
                stroke: new Stroke({ color: status ? '#00FF00' : '#FF0000', width: 2 }),
            }),
        });
    };

    const updatePointStatus = () => {
        if (popupContent) {
            const newStatus = !popupContent.status;

            data.coordinates[popupContent.id].status = newStatus;
            data.coordinates[popupContent.id].details = popupContent.details;

            localStorage.setItem('coordinates', JSON.stringify(data.coordinates));

            const feature = map.getFeaturesAtPixel(map.getPixelFromCoordinate(popupContent.coordinates))[0];
            feature.set('status', newStatus);
            feature.set('name', popupContent.details);
            feature.setStyle(createPointStyle(newStatus));

            setPopupContent(null);
            popup.setPosition(undefined);
        }
    };

    return (
        <>
            <div ref={mapRef} className="map-container"></div>
            <div ref={popupRef} className={`ol-popup ${popupContent ? 'active' : ''}`}>
                {popupContent && (
                    <div>
                        <p><b>Status:</b> {popupContent.status ? 'Active' : 'Inactive'}</p>
                        <p><b>Comment:</b></p>
                        <textarea
                            className="border rounded-xl p-2"
                            value={popupContent.details}
                            onChange={(e) => setPopupContent({ ...popupContent, details: e.target.value })}
                        />
                        <button className="border rounded-xl p-2 w-full" onClick={updatePointStatus}>Toggle Status & Save</button>
                    </div>
                )}
            </div>
        </>
    );
};

export default MapComponent;