import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";

import "./MapView.css";

const MapView = () => {
	const center = [-30.742675938688745, -64.790517707388];
	const marker =
		"https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png";
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
