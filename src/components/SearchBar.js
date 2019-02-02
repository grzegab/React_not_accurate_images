import React from 'react';

class SearchBar extends React.Component {

    state = {term: '', type: 'image'};

    onFormSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state.term, this.state.type);
    };

    render() {
        return (
            <div className='searchbar'>
                <div className='ui segment'>
                    <form className='ui form' onSubmit={this.onFormSubmit}>
                        <div className='field'>
                            <label>Search for ...</label>
                            <div className="ui action input">
                                <input type="text"
                                       value={this.state.term}
                                       onChange={(event) => this.setState({term: event.target.value})} />
                                <select className="ui compact selection dropdown"
                                        value={this.state.type}
                                        onChange={(event) => this.setState({type: event.target.value}) }>
                                    <option value='image'>Images</option>
                                    <option value="video">YT Videos</option>
                                </select>
                                <div className="ui button" onClick={this.onFormSubmit}>Search</div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default SearchBar;