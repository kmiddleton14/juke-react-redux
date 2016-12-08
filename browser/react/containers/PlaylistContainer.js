import React, {Component} from 'react';
import store from '../store';
import Playlist from '../components/Playlist';
import {toggleSong} from '../action-creators/player';
import { connect } from 'react-redux'

const mapStateToProps = function (state, ownProps) {
  return {
    selectedPlaylist: state.playlists.selected,
    //toggleOne: this.toggle,
    player: state.player,
    currentSong: state.player.currentSong,
    isPlaying: state.player.isPlaying
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
      toggle(song, list) {
        dispatch(toggleSong(song, list));
      }
  };
}


const PlaylistContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Playlist);


export default PlaylistContainer;