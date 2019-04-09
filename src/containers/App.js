import React, { Component } from 'react';
import LeftSideMenu from './LeftSideMenu';
import Footer from './Footer';
import MainView from './MainView';
import TopHeader from './Header';


class App extends Component {
  render() {
    return (
      <div className="container">
        <LeftSideMenu />
        <TopHeader />
        <MainView />
        <Footer />
      </div>
    );
  }
}

export default App;
