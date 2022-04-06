import React from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";

import "./MapView.css";

const MapView = () => {
	const center = [-30.743551942205695, -64.79012074048444];
	return (
		<MapContainer center={center} zoom={15}>
			<TileLayer
				url="https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=88C355v18TiLKSDt0vy4"
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			></TileLayer>
			<Marker
				position={center}
				icon={
					new Icon({
						iconUrl: markerIconPng,
						iconSize: [25, 41],
						iconAnchor: [12, 41],
					})
				}
			>
				{" "}
			</Marker>
		</MapContainer>
	);
};

export default MapView;
