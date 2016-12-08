import AUDIO from '../audio';

import {
  START_PLAYING,
  STOP_PLAYING,
  SET_CURRENT_SONG,
  SET_LIST,
  SET_PROGRESS,
  NEXT_SONG,
  PREVIOUS_SONG
} from '../constants';

import {skip} from '../utils';

export const play = () => {
  AUDIO.play();
  return {
    type: START_PLAYING
  };
};

export const pause = () => {
  AUDIO.pause();
  return {
    type: STOP_PLAYING
  };
};

export const next = () => {
  return (dispatch, getState) => {
    const currentState = getState().player;
    const songToPlay = skip(1, currentState)[0];
    dispatch(startSong(songToPlay, currentState.currentSongList));
  };
};

export const previous = () => {
  return (dispatch, getState) => {
    const currentState = getState().player;
    const songToPlay = skip(-1, currentState)[0];
    dispatch(startSong(songToPlay, currentState.currentSongList));
  };
};

export const setCurrentSong = song => ({
  type: SET_CURRENT_SONG,
  song
});

export const setCurrentList = songList => ({
  type: SET_LIST,
  songList
});

export const setProgress = progress => ({
    type: SET_PROGRESS,
    progress
});

export const load = (song, list) => {
  return dispatch => {
    AUDIO.src = song.audioUrl;
    AUDIO.load();
    dispatch(setCurrentList(list));
    dispatch(setCurrentSong(song));
  };
};

export const startSong = (song, list) => {
  return dispatch => {
    dispatch(pause());
    dispatch(load(song, list));
    dispatch(play());
  };
};

export const toggleSong = (song, list) => {
  return (dispatch, getState) => {
    const currentState = getState().player;

    var reassignSong = !song  ? getState().player.currentSong : song;
    var reassignList = !list  ? getState().player.currentSongList : list;

    if (currentState.currentSong.id === reassignSong.id) {
      dispatch(currentState.isPlaying ? pause() : play());
    } else {
      dispatch(startSong(reassignSong, reassignList));
    }
  };
};