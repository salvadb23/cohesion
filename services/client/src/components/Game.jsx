import React from 'react';
import styled from 'styled-components';

import {
  Media, MediaLeft, Content, MediaContent,
} from 'bloomer';

const game = {
  boxShadow: '0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1)',
  paddingBottom: '30px',
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
};

const Span = styled.span`
  display: inline;
  text-transform: capitalize;
`;


function Game(props) {
  const { themes, glossary, cover, name, game_modes, genres  } = props;
  const theme = themes && themes.map(themeid => glossary.themes[themeid] && glossary.themes[themeid].name);
  const genre = genres && genres.map(genreid => glossary.genres[genreid] && glossary.genres[genreid].name);
  console.log(genre)
  return (
    <Media style={game}>
      <MediaLeft>
        { cover && <img style={img} alt='https://via.placeholder.com/96' src={`https://images.igdb.com/igdb/image/upload/t_thumb/${cover.image_id}.png`} /> }
      </MediaLeft>
      <MediaContent>
        <Content>
          <p>
            <strong>{name}</strong>
            <br />
            {game_modes && glossary.game_modes[game_modes[0]].name}
            <br />
            <strong>Themes: </strong>
            {genre && genre.map((genre,index) => genre && <span>{genre},</span>)}
            <br />
            <strong>Tags:</strong> 
            {theme && theme.map((theme, index) => theme && <Span key={index}>{theme}, </Span>)}
          </p>
        </Content>
      </MediaContent>
    </Media>
  );
}

export default Game;
