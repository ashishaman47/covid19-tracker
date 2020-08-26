import React, { useState, useEffect } from 'react';
import './App.css';
import {
  MenuItem,
  FormControl,
  Select,
  Card,
  CardContent,
} from '@material-ui/core';
import InfoBox from './InfoBox';
import Map from './Map';
import Table from './Table';
import { sortData, prettyPrintStat } from './util';
import LineGraph from './LineGraph';
import 'leaflet/dist/leaflet.css';

function App() {
  const [countries, setCountries] = useState([]);
  // which option is selected --> by default we need to show (Worldwide)
  const [country, setCountry] = useState('worldwide');
  // storing country info after fetching details of a particular country --> initial value we provide here is empty object
  const [countryInfo, setCountryInfo] = useState({});
  // storing list of country info in tableData --> initializing with empty array
  const [tableData, setTableData] = useState([]);
  // setting up initial mapCenter & mapZoom
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  // setting up a state which can hold all the data of countries
  const [mapCountries, setMapCountries] = useState([]);
  // keeping track of casesTypes --> by default cases
  const [casesType, setCasestype] = useState('cases');

  // we can use more than one useEffect()

  // for worldwide cases to show data when the app initially loads --> we need to make API Call
  useEffect(() => {
    fetch('https://disease.sh/v3/covid-19/all')
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    // async fun --> send a req, wait for it, do something with info
    const getCountriesData = async () => {
      await fetch('https://disease.sh/v3/covid-19/countries')
        .then((response) => response.json()) //when it comes back with response take entire resonse and just take json from it
        .then((data) => {
          //then after getting required response --> we need to restructure as we don't need entire json structure
          const countries = data.map((country) => ({
            //we are going through every country and return some object back here (name, value)
            name: country.country, //United Kingdom, United State
            value: country.countryInfo.iso2, //UK, USA, FR
          }));

          // storing all the country info in mapCountries
          setMapCountries(data);

          const sortedData = sortData(data);

          // setCountries to the countries we map through
          setCountries(countries);
          // storing the list of countries coming from response
          setTableData(sortedData);
        });
    };

    // calling the async func
    getCountriesData();
  }, []); //code inside here runs once when app component loads

  const onCountryChange = async (e) => {
    // storing the value of the selected country from dropdown
    const countryCode = e.target.value;

    console.log('Country Code >>', countryCode);

    // when we select a country i want to make an another API CALL --> pull some more info
    // make an API CALL Req. which going to go to the service of disease.sh --> and pull all of the info of that country
    // https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE] --> getting stats of particular country
    // https://disease.sh/v3/covid-19/all  --> for getting worldwide stats

    // if countryCode is worldwide keep this url otherwise
    const url =
      countryCode === 'worldwide'
        ? 'https://disease.sh/v3/covid-19/all'
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        // set countryCode
        setCountry(countryCode);
        // set country data of a selected country into countryInfo
        setCountryInfo(data);

        console.log(data);
        // set mapCenter() and zoom when a country is selected --> move to it's center
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  };

  console.log('Country Info >>>', countryInfo);

  return (
    <div className='app'>
      <div className='app__left'>
        {/* Header */}
        {/* Title + Select input Drop Down Field */}
        <div className='app__header'>
          <h1>Covid-19 TRACKER</h1>

          {/* material-ui form control */}
          <FormControl
            classname='app__dropdown'
            style={{ backgroundColor: 'white' }}
          >
            {/* inside this will have actual dropdown */}
            {/* mapping our dropdown with selected country state */}
            <Select
              variant='outlined'
              onChange={onCountryChange}
              value={country}
            >
              <MenuItem value='worldwide'>Worldwide</MenuItem>
              {/* loop through all the countries and show dropdown list of options */}
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        {/* InfoBoxs title='Coronavirus cases'*/}
        <div className='app__stats'>
          <InfoBox
            isRed
            active={casesType === 'cases'}
            onClick={(e) => setCasestype('cases')}
            title='Coronavirus Cases'
            cases={prettyPrintStat(countryInfo.todayCases)}
            total={prettyPrintStat(countryInfo.cases)}
          />
          <InfoBox
            active={casesType === 'recovered'}
            onClick={(e) => setCasestype('recovered')}
            title='Recovered'
            cases={prettyPrintStat(countryInfo.todayRecovered)}
            total={prettyPrintStat(countryInfo.recovered)}
          />
          <InfoBox
            isRed
            active={casesType === 'deaths'}
            onClick={(e) => setCasestype('deaths')}
            title='Deaths'
            cases={prettyPrintStat(countryInfo.todayDeaths)}
            total={prettyPrintStat(countryInfo.deaths)}
          />
        </div>

        {/* Map */}
        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>

      <Card className='app__right'>
        <CardContent>
          <h3>Current {casesType} by Country</h3>
          {/* Table */}
          <Table
            className='app__rightTable'
            countries={tableData}
            casesType={casesType}
          />

          <h3 style={{ margin: '20px 0' }}>Worldwide new {casesType}</h3>
          {/* Graph --> line graph */}
          <LineGraph className='app__graph' casesType={casesType} />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
