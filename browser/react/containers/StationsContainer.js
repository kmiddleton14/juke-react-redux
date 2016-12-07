import { connect } from 'react-redux'
import Stations from '../components/Stations';


const convertToStations = function(songArray){
	let stations = {};

	songArray.forEach(song => {
		//get the genre of the song, ad
		if(!stations[song.genre]){
			stations[song.genre] = []
		}else{
			stations[song.genre].push(song)
		}
	})
	return stations;
}


const mapStateToProps = function (state) {
  return {
  	stations: convertToStations(state.songs)
  };
};

const mapDispatchToProps = function (dispatch) {
  return {};
}


const StationsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Stations);


export default StationsContainer;
