import { FormControl, MenuItem, Select, Card, CardContent } from '@material-ui/core';
import { useState, useEffect } from 'react';
import './App.css';
import Infobox from './Infobox';
import LineGraph from './LineGraph';
import Map from './Map';
import Table from './Table';
import { preetystat, sortData } from './util';
import "leaflet/dist/leaflet.css"
function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide")
  const [countryInfo, setCountryInfo] = useState({})
  const [tableData, setTableData] = useState([])
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(2);
  const [mapCountries, setMapCountries] = useState([])
  const [casesType, setcasesType] = useState("cases")

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all").then((response) => response.json()).then((data) => setCountryInfo(data))
  }, [])
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => (
            {
              name: country.country,
              value: country.countryInfo.iso2,
              id: country.countryInfo.id,
            }
          ));
          const sortedData = sortData(data)
          setTableData(sortedData)
          setMapCountries(data)
          setCountries(countries)

        })
    }
    getCountriesData();
  }
    , [])
  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    const url = countryCode === "worldwide" ? `https://disease.sh/v3/covid-19/all` : `https://disease.sh/v3/covid-19/countries/${countryCode}`
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode)
        setCountryInfo(data);
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
  }
  // console.log(countryInfo);

  return (
    <div className="app">
      <div className="app_left">

        <div className="app_header">

          <h1>Covid 19 tracker</h1>

          <FormControl className="app_dropdown">
            <Select onChange={onCountryChange} variant="outlined" value={country}>
              <MenuItem value="worldwide">WorldWIde</MenuItem>
              {countries.map((country) => (
                <MenuItem key={country.id} value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="app_status">
          <Infobox isRed active={casesType === "cases"} onClick={(e) => setcasesType("cases")} title="Coronavirus Cases" total={preetystat(countryInfo.cases)} cases={preetystat(countryInfo.todayCases)} />
          <Infobox active={casesType === "recovered"} onClick={(e) => setcasesType("recovered")} title="Recovered" total={preetystat(countryInfo.recovered)} cases={preetystat(countryInfo.todayRecovered)} />
          <Infobox isRed active={casesType === "deaths"} onClick={(e) => setcasesType("deaths")} title="Death" total={preetystat(countryInfo.deaths)} cases={preetystat(countryInfo.todayDeaths)} />
        </div>
        <Map
          casesType={casesType}
          countries={mapCountries}
          center={mapCenter}
          zoom={mapZoom}
        />
      </div>
      <Card className="app_right">
        <CardContent>
          <h3>Live Cases by country</h3>
          <Table countries={tableData} />
          <h3>WorldWide new {casesType}</h3>
          <LineGraph casesType={casesType} />
        </CardContent>

      </Card>
    </div>
  );
}

export default App;
