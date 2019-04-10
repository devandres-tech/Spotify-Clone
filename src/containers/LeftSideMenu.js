import React from 'react'

export default function LeftSideMenu() {

  const renderPlaylist = () => {
    return (
      <>
        <li>New Releases</li>
        <li>Albums</li>
        <li>artists</li>
      </>
    )
  }

  const renderUserLibrary = () => {
    return (
      <>
        <li>Recently Played</li>
        <li>Songs</li>
        <li>Albums</li>
        <li>Artists</li>
      </>
    )
  }

  return (
    <ul className="container__left-menu">
      <li>Browse</li>
      <li>Radio</li>
      <li>YOUR LIBRARY</li>
      {renderUserLibrary()}
      <li>PLAYLISTS</li>
      {renderPlaylist()}
    </ul>
  )
}

