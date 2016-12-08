import React, {Component} from 'react';
import AUDIO from '../audio';
import store from '../store';
import {previous, next, setProgress, toggleSong} from '../action-creators/player';
import Player from '../components/Player';
import { connect } from 'react-redux'


const mapStateToProps = function (state, ownProps) {
  return {
    currentSong: state.player.currentSong,
    isPlaying: state.player.isPlaying,
    progress: state.player.progress
    //toggle: state.player.toggleSong
  };
};

const mapDispatchToProps = function (dispatch, ownProps) {
  addEvents();
  return {
    next: nextFunc,

    prev: function() {
      dispatch(previous());
    },

    toggle: function() {
      dispatch(
        toggleSong()
      );
    }
  };
}

const nextFunc = function(){
  dispatch(next());
}

const addEvents = function(){
  AUDIO.addEventListener('ended', nextFunc);
  AUDIO.addEventListener('timeupdate', () => {
    store.dispatch(setProgress(AUDIO.currentTime / AUDIO.duration));
  });
}

const PlayerContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Player);


export default PlayerContainer;


// export default class extends Component {

//   constructor() {
//     super();
//     this.state = store.getState().player;
//     this.toggle = this.toggle.bind(this);
//   }

//   componentDidMount() {

//     AUDIO.addEventListener('ended', this.next);
//     AUDIO.addEventListener('timeupdate', () => {
//       store.dispatch(setProgress(AUDIO.currentTime / AUDIO.duration));
//     });

//     this.unsubscribe = store.subscribe(() => {
//       this.setState(store.getState().player);
//     });
//   }

//   componentWillUnmount() {
//     this.unsubscribe();
//   }

//   next() {
//     store.dispatch(next());
//   }

//   prev() {
//     store.dispatch(previous());
//   }

//   toggle() {
//     store.dispatch(
//       toggleSong(this.state.currentSong, this.state.currentSongList)
//     );
//   }

//   render() {
//     return <Player
//       {...this.state}
//       next={this.next}
//       prev={this.prev}
//       toggle={this.toggle}
//     />;
//   }

// }