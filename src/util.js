import React from 'react';
import numeral from 'numeral';
import { Circle, Popup } from 'react-leaflet';

// color for the circles for different casesTypes
const casesTypeColors = {
  cases: {
    hex: '#CC1034',
    multiplier: 800, //it represent the size of circle we'll show on map
  },
  recovered: {
    hex: '#7dd71d',
    multiplier: 1200,
  },
  deaths: {
    hex: '#fb4443',
    multiplier: 2000,
  },
};

// function to sort tableData
export const sortData = (data) => {
  const sortedData = [...data];

  //   this sorting fun gives to things --> (a and b)
  // looping through entire lists --> it grabs 1st 2 things
  // 1st is a and 2nd b --> then perform quick comparison on them
  // and sort on the basis of the comparison

  //   sortedData.sort((a, b) => {
  //     if (a.cases > b.cases) {
  //       return -1;
  //     } else {
  //       return 1;
  //     }
  //   }); //sorting on the base of no. of cases
  //   return sortedData;

  // or

  return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
};

// DRAW circles on the map with interactive tooltip
// interactive tooltip --> when you take ur cursor over them they pop up msg showing info. (Country with this this many recoveries and cases)
export const showDataOnMap = (data, casesType = 'cases') =>
  data.map((country) => (
    <Circle
      center={[country.countryInfo.lat, country.countryInfo.long]}
      fillOpacity={0.4}
      color={casesTypeColors[casesType].hex}
      fillColor={casesTypeColors[casesType].hex}
      radius={
        Math.sqrt(country[casesType]) * casesTypeColors[casesType].multiplier
      } //adding the circle radius on the map
    >
      {/* adding popup on click of the circle */}
      <Popup>
        <div className='info-container'>
          <div
            className='info-flag'
            style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
          ></div>
          <div className='info-name'>{country.country}</div>
          <div className='info-confirmed'>
            Cases : {numeral(country.cases).format('0,0')}
          </div>
          <div className='info-recovered'>
            Recovered : {numeral(country.recovered).format('0,0')}
          </div>
          <div className='info-deaths'>
            Deaths : {numeral(country.deaths).format('0,0')}
          </div>
        </div>
      </Popup>
    </Circle>
  ));

//   if stat exists give me back + and stat value by formatting and if stat doesn't exit return that
export const prettyPrintStat = (stat) =>
  stat ? `+${numeral(stat).format('0.0a')}` : '+0';
