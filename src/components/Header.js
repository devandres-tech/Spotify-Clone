import React, { Component } from 'react';
import { connect } from 'react-redux';

const Header = (props) => {
  let username
  let imageUrl;
  if (props.user) {
    username = props.user.display_name;
    imageUrl = props.user.images[0].url
  }
  return (
    <div className="container__topHeader">
      <h1>{props.title}</h1>
      <p>{username}</p>
      <img src={imageUrl} alt="" />
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    title: state.mainViewReducer.title,
    user: state.userReducer.user
  }
}

export default connect(mapStateToProps)(Header);