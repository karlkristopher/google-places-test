import React, {useState} from 'react';
import './App.css';
import LocationSearchInput from './LocationSearchInput'

function App() {
  const [selectedLocation, setSelectedLocation] = useState({
    initialized: false
  });
  console.log(selectedLocation)
  return (
    <div className="App">
     <LocationSearchInput callback={setSelectedLocation} selectedLocation={selectedLocation}/>
     {selectedLocation && <p>There is a selected Location</p> }
    </div>
  );
}

export default App;
