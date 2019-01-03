import React from 'react';

const getSeason = (lat, month) => {
    if(month > 2 && month < 9) {
        return lat > 0 ? 'summer' : 'winter';
    } else {
        return lat > 0 ? 'winter' : 'summer';
    }
};

const getCountry = (lat, lon) => {
    if (lat > 0) {
        return lon > 0 ? 'europe' : 'india';
    } else {
        return lon > 0 ? 'america' : 'mexico';
    }
};

const SeasonDisplay = (props) => {
    const season = getSeason(props.lat, new Date().getMonth());
    const country = getCountry(props.lat, props.lon);

    return season + ' ' + country;
};

SeasonDisplay.defaultProps = {
    lat: 54,
    lon: 18
};

export default SeasonDisplay;