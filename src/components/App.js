import React from 'react';

import SearchBar from "./SearchBar";
import VideoList from './VideoList';
import ImageList from './ImageList';
import unsplash from '../api/unsplash';
import VideoDetail from './VideoDetail';

import '../assets/ImageList.css';
import youtube from "../api/youtube";

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {lat: null, lon: null, err: '', images: [], videos: [], selectedVideo: null};
        this.accuTerm = '';
        this.randomNumber = 0;
        this.randomNumber2 = 0;
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
        const warm = ['summer', 'spring', 'warm', 'yellow', 'orange'];
        const cold = ['winter', 'cold', 'blue', 'white', 'autumn'];

        if (month > 2 && month < 9) {
            return lat > 0 ? warm[this.randomNumber] : cold[this.randomNumber];
        } else {
            return lat > 0 ? cold[this.randomNumber] : warm[this.randomNumber];
        }
    };

    getCountry = (lat, lon) => {
        const europe = ['germany', 'poland', 'holland', 'italy', 'france'];
        const india = ['india', 'china', 'australia', 'japan', 'thailand'];
        const northAmerica = ['USA', 'canada', 'mexico', 'hawaii', 'cuba'];
        const sountAmerica = ['brazil', 'argentina', 'chile', 'equador', 'guatelupa'];

        if (lat > 0) {
            return lon > 0 ? europe[this.randomNumber2] : india[this.randomNumber2];
        } else {
            return lon > 0 ? northAmerica[this.randomNumber2] : sountAmerica[this.randomNumber2];
        }
    };


    getSeasonDisplay = () => {
        let season = this.getSeason(this.state.lat, new Date().getMonth());
        let country = this.getCountry(this.state.lat, this.state.lon);
        let additionalString = '';

        if (season && country) {
            additionalString = season + ' ' + country
        }

        this.accuTerm = additionalString;
    };

    onSearchSubmit = (term, type) => {
        this.setState({selectedVideo: null});
        this.randomNumber = Math.floor(Math.random() * 5);
        this.randomNumber2 = Math.floor(Math.random() * 5);
        let accuTerm = this.accuTerm ? term + ' ' + this.accuTerm : term;
        type === 'image' ? this.searchForPhotos(accuTerm) : this.searchForVideo(accuTerm);
    };

    onVideoSelect = (video) => {
        this.setState({selectedVideo: video});
    };

    searchForPhotos = async (term) => {
        const resp = await unsplash.get('/search/photos', {
            params: {query: term}
        });
        this.setState({render: 'ImageList', images: resp.data.results});
    };

    searchForVideo = async (term) => {
        const resp = await youtube.get('/search', {
            params: {q: term}
        });
        this.setState({render: 'VideoList', videos: resp.data.items, selectedVideo: resp.data.items[0]});
    };

    render() {
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

        if (this.state.render === 'ImageList') {
            renderList = <ImageList images={this.state.images}/>;
        } else if (this.state.selectedVideo !== null && this.state.render === 'VideoList') {
            renderList =
                (
                    <div>
                        <div className='ui grid'>
                            <div className='ui row'>
                                <div className='eleven wide column'>
                                    <VideoDetail video={this.state.selectedVideo}/>
                                </div>
                                <div className='five wide column'>
                                    <VideoList
                                        videos={this.state.videos}
                                        selectedVideo={this.state.selectedVideo}
                                        onVideoSelect={this.onVideoSelect}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                );
        } else {
            renderList = <VideoList videos={this.state.videos} onVideoSelect={this.onVideoSelect}/>;
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