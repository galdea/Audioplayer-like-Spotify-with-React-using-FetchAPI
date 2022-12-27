import React, { useState, useRef } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

const Body = () => {

  const options = {method: 'GET'};

  fetch('https://assets.breatheco.de/apis/sound/all', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));


  const [songs, setSongs] = useState([
    { "id":1, "category":"game", "name":"Mario Castle", "url":"https://assets.breatheco.de/apis/sound/files/mario/songs/castle.mp3" },
    { "id":2, "category":"game", "name":"Mario Star", "url":"https://assets.breatheco.de/apis/sound/files/mario/songs/hurry-starman.mp3"},
    { "id":3, "category":"game", "name":"Mario Overworld", "url":"https://assets.breatheco.de/apis/sound/files/mario/songs/overworld.mp3"}
  ]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  let audioRef = useRef(null);

  const playSong = url => {
    audioRef.current.src = url;
    audioRef.current.play();
  };

  const pauseSong = () => {
    audioRef.current.pause();
  };

  const [icon, setIcon] = useState("fa-solid fa-play");


library.add(fas);

const Previous = (currentSongIndex, setCurrentSongIndex, songs, playSong) => {
  return (
    <FontAwesomeIcon
      onClick={() => {
        let newIndex = currentSongIndex - 1;
        if (newIndex < 0) {
          newIndex = songs.length - 1;
        }
        setCurrentSongIndex(newIndex);
        playSong(songs[newIndex].url);
      }}
      className="previous"
      icon="fa-solid fa-square-caret-left"
    />
  );
};

const Play = (playSong, pauseSong, audioRef, url) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (isPlaying) {
      pauseSong();
      audioRef.current.pause();
    } else {
      playSong();
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  }

  return (
    <FontAwesomeIcon
      onClick={togglePlay}
      className="play px-5"
      icon={isPlaying ? "fa-solid fa-pause" : "fa-solid fa-play"}
    />
  );
};



  

  const Next = (currentSongIndex, setCurrentSongIndex, songs, playSong) => {
    return (
      <FontAwesomeIcon
        onClick={() => {
          let newIndex = currentSongIndex + 1;
          if (newIndex >= songs.length) {
            newIndex = 0;
          }
          setCurrentSongIndex(newIndex);
          playSong(songs[newIndex].url);
        }}
        className="next"
        icon="fa-solid fa-square-caret-right"
      />
    );
  };
  


  return (
    <>
    <Container fluid className="body">
      {songs.map(song => (
        <Row className="song" key={song.id}>
          <Col xs={1} md={1} lg={1}>
            <div className="songNumber">{song.id}</div>
          </Col>
          <Col xs={11} md={11} lg={11}>
            <div className="songPlay" onClick={() => playSong(song.url)}>{song.name}</div>
            <audio src={song.url} ref={audioRef} />
          </Col>
        </Row>
      ))}
    </Container>
        <Container fluid>
          <Row fixed="bottom" className="footer">
            <div className="buttons">
            {Previous(currentSongIndex, setCurrentSongIndex, songs, playSong)}
            {Play(playSong, pauseSong, audioRef, songs[currentSongIndex].url)}
              {Next(currentSongIndex, setCurrentSongIndex, songs, playSong)}
            </div>
          </Row>
        </Container>
      </>
  );
}

export default Body;
