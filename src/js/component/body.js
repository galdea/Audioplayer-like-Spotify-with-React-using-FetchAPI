import React, { useState, useRef } from 'react';
import { Col, Container, Row } from 'react-bootstrap';

const Body = (props) => {

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

  return (
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
  );
}

export default Body;
