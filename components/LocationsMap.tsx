"use client"
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

const locations = [
  { lat: 51.5140426600467, lng: -0.1558571559506276, name: 'London' },
  { lat: 48.847244881974795, lng: 2.3251373674872635, name: 'Paris' },
  { lat: 33.51683841975418, lng: 36.293414703547754, name: 'Damascus' },
  { lat: 25.20003183253864, lng: 55.27388012356177, name: 'Dubai' },
  { lat: 41.38646867609117, lng: 2.168931439518225, name: 'Barcelona' },
  { lat: 41.902359070616455, lng: 12.48092737654377, name: 'Rome' },
  { lat: 52.37001383063646, lng: 4.891910009884835, name: 'Amsterdam' },
  { lat: 41.05420651925311, lng: 29.000022781569154, name: 'Istanbul' },
  { lat: 40.416917661056026, lng: -3.6991457642925853, name: 'Madrid' },
  { lat: 24.873259651602265, lng: 46.61690125238374, name: 'Riyadh' },
  { lat: 53.4792581133669, lng: -2.2392372786003016, name: 'Manchester' },
  { lat: 37.93998809868039, lng: 23.640877604125272, name: 'Athens' },
];

export default function WorldMap() {
  // Set the map bounds to focus more on Europe and Middle East
  const worldBounds:any = [
    [-60, -180],  // southwest corner adjusted
    [70,  180],  // northeast corner adjusted
  ];

  return (
    <div style={{ width: '100%', height: '500px', overflow: 'hidden' }}>
      <MapContainer
        center={[40, 20]} // Centered more on Europe and Middle East
        zoom={4}          // Increased zoom level for better visibility
        style={{ width: '100%', height: '100%' }}
        scrollWheelZoom={false}
        worldCopyJump={false}      // don't wrap around
        maxBounds={worldBounds}    // constrain panning
        maxBoundsViscosity={1.0}   // stick to bounds
        // attributionControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
          noWrap={true}             // disable horizontal wrapping
        />

        {locations.map(loc => (
          <Marker key={loc.name} position={[loc.lat, loc.lng]}>
            <Popup>{loc.name}</Popup>
          </Marker>
        ))}

      </MapContainer>
    </div>
  );
}
