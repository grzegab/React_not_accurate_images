import React from 'react';

import SearchBar from "./SearchBar";
import VideoList from './VideoList';
import ImageList from './ImageList';
import unsplash from '../api/unsplash';

import '../assets/ImageList.css';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {lat: null, lon: null, err: ''};
        this.accuTerm = '';
    }

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            (position) => this.setState({lat: position.coords.latitude, lon: position.coords.longitude}),
            (err) => this.setState({err: 'An error occurs: ' + err})
        );
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.getSeasonDisplay();
    }

    getSeason = (lat, month) => {
        if (month > 2 && month < 9) {
            return lat > 0 ? 'summer' : 'winter';
        } else {
            return lat > 0 ? 'winter' : 'summer';
        }
    };

    getCountry = (lat, lon) => {
        if (lat > 0) {
            return lon > 0 ? 'europe' : 'india';
        } else {
            return lon > 0 ? 'america' : 'mexico';
        }
    };


    getSeasonDisplay = () => {
        const season = this.getSeason(this.state.lat, new Date().getMonth());
        const country = this.getCountry(this.state.lat, this.state.lon);
        let additionalString = '';

        if (season && country) {
            additionalString = season + ' ' + country
        }

        this.accuTerm = additionalString;
    };

    onSearchSubmit = (term, type) => {
        const accuTerm = this.accuTerm ? term + ' ' + this.accuTerm : term;
        type === 'image' ? this.searchForPhotos(accuTerm) : this.searchForVideo(accuTerm);
    };

    searchForPhotos = async (term) => {
        console.log(term);
        const resp = await unsplash.get('/search/photos', {
            params: {query: term}
        });
        this.setState({render: 'ImageList', images: resp.data.results});
    };

    searchForVideo = async (term) => {

    };

    render() {
        console.log(this.state);

        let renderList = <div></div>;
        let infoBar = <span></span>;
        let additionalInfo = <span></span>;

        if (this.state.err && !this.state.lat) {
            infoBar = <span>No accurate search enabled</span>;
            additionalInfo = <span>Not enabled</span>
        } else if (!this.state.err && this.state.lat) {
            infoBar = <span>Accurate search enabled</span>;
            additionalInfo = <span>OK done</span>;
        } else {
            infoBar = <span>Awaiting for user location...</span>;
            additionalInfo = <span>Calculating...</span>;
        }

        if(this.state.render === 'ImageList') {
            renderList = <ImageList images={this.state.images}/>;
        } else if (this.state.render === 'VideoList') {
            renderList = <VideoList/>;
        }

        return (
            <div style={{marginTop: '50px'}}>
                <div className='ui container'>
                    <div className='ui segment'>
                        <div>
                            <div>Status: {infoBar}</div>
                            <div>Additional info: {additionalInfo}</div>
                        </div>
                    </div>
                    <SearchBar onSubmit={this.onSearchSubmit}/>
                    {renderList}
                </div>
            </div>
        );
    }
}

App.defaultProps = {
    lat: 54,
    lon: 18
};

export default App;