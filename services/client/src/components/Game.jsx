import React from 'react';

import {
  Media, MediaLeft, Image, Content, MediaContent,
} from 'bloomer';

const game = {
  boxShadow: '0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1)',
  paddingBottom: '60px',
  paddingTop: '20px',
  margin: 'auto',
  marginBottom: '10px',
  paddingLeft: '20px',
  width: '95%',
  backgroundColor: 'white',
};

function Game() {
  return (
    <Media style={game}>
      <MediaLeft>
        <Image isSize="96x96" src="http://conceptartworld.com/wp-content/uploads/2013/11/AC4_001.jpg" />
      </MediaLeft>
      <MediaContent>
        <Content>
          <p>
            <strong>Assassinss Creed</strong>
            <br />
            Multi-Player
            <br />
            <strong>Release Date:</strong>
            {' '}
            November 19, 2013
            <br />
            <strong>Tags:</strong>
            {' '}
            Adventure, Thriller
          </p>
        </Content>
      </MediaContent>
    </Media>
  );
}

export default Game;
