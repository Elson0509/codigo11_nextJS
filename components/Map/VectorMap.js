import {Fragment, memo} from 'react';

import {
    ComposableMap,
    ZoomableGroup,
    Geographies,
    Geography,
    Markers,
    Marker,
} from "react-simple-maps"

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const VectorMap = (props) => {
    const markersImoveis = () => {
        return props.imoveis.map((imv, ind) => {
            return {
            markerOffset : -10,
            coordinates : [imv.longitude, imv.latitude],
            }
        })
    }

    return (
        <ComposableMap
            projection="geoAzimuthalEqualArea"
            projectionConfig={{
                rotate: [58, 14, 0],
                scale: 900
            }}
            style={{
                width: "100%",
                height: "auto",
            }}
            >
            <Geographies geography={geoUrl}>
                {({ geographies }) =>
                geographies
                    .filter(d => d.properties.REGION_UN === "Americas")
                    .map(geo => (
                    <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="#EAEAEC"
                        stroke="#D6D6DA"
                    />
                    ))
                }
            </Geographies>
            {markersImoveis().map(({ name, coordinates, markerOffset }, ind) => (
                <Marker 
                    key={ind} 
                    coordinates={coordinates}>
                    <circle className="marker" r={10} fill={props.markerColor || "#3f6ad8"} stroke="#fff" strokeWidth={2} />
                    <text
                        textAnchor="middle"
                        y={markerOffset}
                        style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
                    >
                        {name}
                    </text>
                </Marker>
            ))}
        </ComposableMap>
    )
}

export default memo(VectorMap)