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

const img = {
  objectFit: 'contain',
  maxWidth: '100%',
  maxHeight: '100%',
  width: 'auto',
  height: 'auto',
}



function Game(props) {

  // const cover = () => {
  //   let result;
  //   if(props.cover == null){
  //     console.log ("Loading")
  //   } else {
  //     result = props.cover.image_id
  //   }
  //   return result
  // }

  // console.log(Object.values(props.cover))

  return (
    <Media style={game}>
      <MediaLeft>
        { props.cover && <img style={ img } src={`https://images.igdb.com/igdb/image/upload/t_thumb/${props.cover.image_id}.png`}></img> }
      </MediaLeft>
      <MediaContent>
        <Content>
          <p>
            <strong>{props.name}</strong>
            <br />
            Multi-Player
            <br />
            <strong>Release Date:</strong>
            November 19, 2013
            <br />
            <strong>Tags:</strong>
            Adventure, Thriller
          </p>
        </Content>
      </MediaContent>
    </Media>
  );
}

export default Game;
