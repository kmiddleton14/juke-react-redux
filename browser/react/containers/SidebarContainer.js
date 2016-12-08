import React, {Component} from 'react';
import store from '../store';
import Sidebar from '../components/Sidebar';
import { connect } from 'react-redux'


const mapStateToProps = function (state, ownProps) {
  console.dir(state.playlists.list)
  return {
    playlists: state.playlists.list
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
  };
}


const SidebarContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar);


export default SidebarContainer;
