import React from 'react';
import './Map.css';
import { Map as LeafLetMap, TileLayer } from 'react-leaflet';
import { showDataOnMap } from './util';

function Map({ countries, casesType, center, zoom }) {
  return (
    <div className='map'>
      {/* center refers to center of map and zoom refers to how far you want to zoom in */}
      <LeafLetMap center={center} zoom={zoom}>
        <TileLayer
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* loop through countries and draw circles around them */}
        {/* those circles will be bigger if there are more recovery/death or vice versa */}
        {showDataOnMap(countries, casesType)}
      </LeafLetMap>
    </div>
  );
}

export default Map;
