import React, {Component} from 'react';
import { connect } from 'react-redux';
import RestClient from "../../../utilities/rest/RestClient";
import VenueTypes from "../../../Resources/VenueTypes";
import "./searchBar.css";

class SearchBar extends Component {

    state = {
        criteria: {
            name:"",
            type: "",
            location: ""
        }
    }

    setType = (e) => {
        e.preventDefault();
        let value = e.target.id;
        let criteria = this.state.criteria;
        if(value !== criteria.type) {
            criteria.type = e.target.id
        } else {
            criteria.type = ""
        }
        this.setState({
            criteria: criteria
        });
    }

    setName = (e) => {
        e.preventDefault();
        let criteria = this.state.criteria;
        criteria.name = e.target.value;
        this.setState({
            criteria: criteria
        });
    }

    getTypes = () => {
        let venueButtons = VenueTypes.map(type => {
            return (
                (type === this.state.criteria.type) ?
                    <div className="w3-round-large w3-cell l1 selected-type-box" key={type}>
                      <h3 id={type} className="type-text w3-wide" onClick={this.setType}>{type}</h3>
                    </div>
                :
                    <div className="w3-round-large w3-cell l1 type-box" key={type}>
                        <h3 id={type} className="type-text w3-wide" onClick={this.setType}>{type}</h3>
                    </div>
            )
        });
        return venueButtons;
    }

    search = async (e) => {
        e.preventDefault();

        try {
            let restClient = new RestClient();
            let venues = await restClient.searchVenues(this.state.criteria);
            this.props.setVenues(venues);
        } catch (e) {
            console.log("Could not contact venue resource: " + e.toString());
        }
    }

    render() {
        let types = this.getTypes();
        return (
            <div className="w3-center">
                <form onSubmit={this.search}>
                    <div className="types w3-container w3-cell-row w3-center">
                        {types}
                    </div>
                    <div className="w3-container w3-cell-row">
                        <input className="w3-cell l8 w3-input w3-white w3-center w3-border search-box" type="text" onChange={this.setName}/>
                        <button className="w3-cell l4 search-button" onClick={this.search}>Search</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        venues: state.venues
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setVenues: (venues) => { dispatch({ type: 'SET_VENUES', venues:venues})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (SearchBar);