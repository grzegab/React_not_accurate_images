import React from 'react';
import ReactDom from 'react-dom';
import SeasonDisplay from './SeasonDisplay';

class App extends React.Component {

    constructor(props) {
        super(props);

        this.state = {lat: null, lon: null, err: ''};
    }

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            (position) => this.setState({lat: position.coords.latitude, lon: position.coords.longitude}),
            (err) => this.setState({err: 'An error occurs: ' + err})
        );
    }

    renderInformation() {
        let infoBar = <span></span>;
        let additionalInfo = <span></span>;

        if (this.state.err && !this.state.lat) {
            infoBar = <span>No accurate search enabled</span>;
            additionalInfo = <span>Not enabled</span>
        } else if (!this.state.err && this.state.lat) {
            infoBar = <span>Accurate search enabled</span>;
            additionalInfo = <SeasonDisplay lat={this.state.lat} lon={this.state.lon} />;
        } else {
            infoBar = <span>Awaiting for user location...</span>;
            additionalInfo = <span>Calculating...</span>;
        }

        return (
            <div>
                <div>Status: {infoBar}</div>
                <div>Additional info: {additionalInfo}</div>
            </div>
        );
    }

    render() {
        return (
            <div style={{marginTop: '320px'}}>
                <div className='ui container'>
                    {this.renderInformation()}
                    <div className='searchbar'>

                    </div>
                </div>
            </div>
        );
    }
}

export default App;