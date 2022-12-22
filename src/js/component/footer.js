import React from "react";
import { Container, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

library.add(fas);
const Previous = (previousSong) => {
  return <FontAwesomeIcon onClick={previousSong} className="previous" icon="fa-solid fa-square-caret-left"/>
}

const Play = (playSong, pauseSong, audioRef) => {
  return <FontAwesomeIcon onClick={() => {
    if (audioRef.current.paused) {
      playSong();
    } else {
      pauseSong();
    }
  }} className="play mx-5" icon="fa-solid fa-play"/>
}

const Next = (nextSong) => {
  return <FontAwesomeIcon onClick={nextSong} className="next" icon="fa-solid fa-square-caret-right"/>
}


const Footer = ({ playSong, pauseSong, audioRef }) => {
  return (
    <>
      <Container fluid>
        <Row fixed="bottom" className="footer">
          <div className="buttons">
            {Previous()}
            {Play(playSong, pauseSong, audioRef)}
            {Next()}
          </div>
        </Row>
      </Container>
    </>
  );
};

export default Footer;
