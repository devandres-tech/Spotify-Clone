import { connect } from 'react-redux';
import React, { Component } from 'react'

import * as actionTypes from '../store/actions';

class Artists extends Component {

  componentDidMount() {
    this.props.fetchUserTopArtists(this.props.token);
  }

  render() {
    const { artists } = this.props;
    let artistList;

    if (artists) {
      artistList = artists.map((artist) => {
        return (
          <div key={artist.id}>
            <img src={artist.images[2].url} alt="" />
            <p>{artist.name}</p>
          </div>
        )
      })
    }

    return (
      <div className="browse-container">
        {artistList}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    token: state.tokenReducer.token,
    artists: state.userReducer.userArtists
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserTopArtists: (token) => dispatch(actionTypes.fetchUserTopArtists(token))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Artists);