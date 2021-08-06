import React from 'react'
import "./Map.css"
import { MapContainer, TileLayer } from "react-leaflet"
import { showMapData } from './util'
const Map = ({ countries, casesType, center, zoom }) => {
    return (
        <MapContainer center={center} zoom={zoom} className="map">
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />
            {showMapData(countries, casesType)}
        </MapContainer>

    )
}

export default Map
