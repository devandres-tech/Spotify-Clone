import React, { Component } from 'react';
import { connect } from 'react-redux';

const Header = (props) => {
  return (
    <div className="container__topHeader" >
      <h1>{props.title}</h1>
    </div >
  )
}

const mapStateToProps = (state) => {
  return {
    title: state.mainViewReducer.title
  }
}

export default connect(mapStateToProps)(Header);
