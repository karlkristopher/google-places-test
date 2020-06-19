import React from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const service = new window.google.maps.places.PlacesService(new window.google.maps.Map(document.createElement("div"), {
  center: {lat:40.7575285, lng: -73.9884469}
}));

const Autocomplete = ({
  getInputProps,
  suggestions,
  getSuggestionItemProps,
  loading,
}) => (
  <div>
    <input
      {...getInputProps({
        placeholder: "Search Places ...",
        className: "location-search-input",
      })}
    />
    <div className="autocomplete-dropdown-container">
      {loading && <div>Loading...</div>}
      {suggestions.map((suggestion) => {
        const className = suggestion.active
          ? "suggestion-item--active"
          : "suggestion-item";
        // inline style for demonstration purpose
        const style = suggestion.active
          ? { backgroundColor: "#fafafa", cursor: "pointer" }
          : { backgroundColor: "#ffffff", cursor: "pointer" };
        return (
          <div
            {...getSuggestionItemProps(suggestion, {
              className,
              style,
            })}
          >
            <span>{suggestion.description}</span>
          </div>
        );
      })}
    </div>
  </div>
);

class LocationSearchInput extends React.Component {
  state = { search: "" };

  handleChange = (search) => {
    this.setState({ search });
  };

  handleSelect = async (address) => {
    try {
      const results = await geocodeByAddress(address);
      console.log(results[0].place_id);
      const latLng = await getLatLng(results[0]);

      service.getDetails(
        {
          placeId: results[0].place_id,
        },
         (place, status)=> {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            console.log(place);

            this.props.callback({
              ...this.props.selectedLocation,
              address,
              ...latLng,
            });
            // Intended behavior is to set this.setState({places.place.reviews})
          }
        }
      );

      
    } catch (error) {
      console.error("Error", error);
    }
  };

  render() {
    return (
      <PlacesAutocomplete
        value={this.state.search}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        children={Autocomplete}
      />
    );
  }
}

export default LocationSearchInput;
