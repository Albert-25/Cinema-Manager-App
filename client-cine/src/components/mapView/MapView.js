import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MapView.css";

const MapView = () => {
	const center = [-30.742675938688745, -64.790517707388];
	return (
		<MapContainer center={center} zoom={15}>
			<TileLayer
				url="https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}.png?key=88C355v18TiLKSDt0vy4"
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			>
			</TileLayer>
		</MapContainer>
	);
};

export default MapView;
