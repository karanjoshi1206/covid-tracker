import { Circle, Popup } from "react-leaflet";
import React from "react";
import numeral from "numeral";
const caseTypeColors = {
    cases: {
        hex: "#CC1034",
        rgb: "rgb(204,16,52)",
    },
    recovered: {
        hex: "#7dd71d",
        rgb: "rgb(125,215,29)",

    },
    deaths: {
        hex: "#fb4443",
        rgb: "rgb(251,69,67)",

    },
};
export const preetystat = (stat) => stat ? `+${numeral(stat).format("0.0a")}` : "+0"
export const sortData = (data) => {
    const sortedData = [...data]
    sortedData.sort((a, b) => {
        if (a.cases > b.cases) {
            return -1;
        }
        else {
            return 1;
        }
    })
    return sortedData;
}

export const showMapData = (data, casesType) => (data.map(country => (<Circle
    center={[country.countryInfo.lat, country.countryInfo.long]}
    color={caseTypeColors[casesType].hex}
    fillColor={caseTypeColors[casesType].hex}
    fillOpacity={0.4}
    radius={
        Math.sqrt(country.cases) * 200
    }
>
    <Popup>
        <div className="info_container">
            <div
                className="info_flag"
                style={{ backgroundImage: `url(${country.countryInfo.flag})` }}
            ></div>
            <div className="info_name">{country.country}</div>
            <div className="case">Cases:{numeral(country.cases).format("0,0")}</div>
            <div className="recover">Recovered:{numeral(country.recovered).format("0,0")}</div>
            <div className="death">Deaths:{numeral(country.deaths).format("0,0")}</div>
        </div>
    </Popup>


</Circle>


)))