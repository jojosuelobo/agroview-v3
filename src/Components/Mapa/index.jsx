/* eslint-disable no-unused-vars */
import './Mapa.sass'

// Hooks
import { useEffect } from 'react'

// Map draw
import mapboxgl from 'mapbox-gl';
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import * as turf from 'turf'
import "mapbox-gl/dist/mapbox-gl.css"


export default function Mapa() {
    const TOKEN = 'pk.eyJ1Ijoiamdsb2JvIiwiYSI6ImNsb3gwMHA0MDEzNnMyaW8xcDY5cjQyZDUifQ.eA1zxvIi2SxQW6obP29Apg'

    function rad(_) {
        return _ * Math.PI / 180;
    }

    function ringArea(coords) {
        var p1, p2, p3, lowerIndex, middleIndex, upperIndex,
            area, i = 0,
            coordsLength = coords.length;

        if (coordsLength > 2) {
            for (i = 0; i < coordsLength; i++) {
                if (i === coordsLength - 2) {// i = N-2
                    lowerIndex = coordsLength - 2;
                    middleIndex = coordsLength - 1;
                    upperIndex = 0;
                } else if (i === coordsLength - 1) {// i = N-1
                    lowerIndex = coordsLength - 1;
                    middleIndex = 0;
                    upperIndex = 1;
                } else { // i = 0 to N-3
                    lowerIndex = i;
                    middleIndex = i + 1;
                    upperIndex = i + 2;
                }
                p1 = coords[lowerIndex];
                p2 = coords[middleIndex];
                p3 = coords[upperIndex];
                area += (rad(p3[0]) - rad(p1[0])) * Math.sin(rad(p2[1]));
            }

            area = area * 6378137 * 6378137 / 2;
        }

        return area;
    }

    useEffect(() => {
        mapboxgl.accessToken = 'pk.eyJ1Ijoiamdsb2JvIiwiYSI6ImNsb3gwMHA0MDEzNnMyaW8xcDY5cjQyZDUifQ.eA1zxvIi2SxQW6obP29Apg';

        const existingMap = new mapboxgl.Map({ container: 'map' });
        if (existingMap) {
            existingMap.remove();
        }

        

        const map = new mapboxgl.Map({
            container: 'map', // container ID
            style: 'mapbox://styles/mapbox/satellite-v9', // style URL
            center: [-74.5, 40], // starting position [lng, lat]
            zoom: 12, // starting zoom
        });

        const draw = new MapboxDraw({
            displayControlsDefault: false,
            // Select which mapbox-gl-draw control buttons to add to the map.
            controls: {
                polygon: true,
                trash: true
            },
            // Set mapbox-gl-draw to draw by default.
            // The user does not have to click the polygon control button first.
            defaultMode: 'draw_polygon'
        });
        map.addControl(draw);

        map.on('draw.create', updateArea);
        map.on('draw.delete', updateArea);
        map.on('draw.update', updateArea);

        function updateArea(e) {
            const data = draw.getAll();
            const answer = document.getElementById('calculated-area');
            if (data.features.length > 0) {
                const coords = JSON.stringify(data.features[0].geometry.coordinates[0])
                console.log(coords)
                //console.log(`DATA AQUI: ${JSON.stringify(data.features[0].geometry.coordinates[0])}`);
            } else {
                answer.innerHTML = '';
                if (e.type !== 'draw.delete')
                    alert('Click the map to draw a polygon.');
            }
        }

        return () => {
            map.removeControl(draw);
        }

   
    }, []);

    return (
        <div id='map' className='Mapa' />
    )
}
