import React from 'react';
import PropTypes from 'prop-types';

import {
  Media, MediaLeft, Content, MediaContent,
} from 'bloomer';

const game = {
  boxShadow: '0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1)',
  borderRadius: '4px',
  paddingBottom: '30px',
  paddingTop: '20px',
  margin: 'auto',
  marginBottom: '10px',
  paddingLeft: '20px',
  width: '85%',
  backgroundColor: 'white',
};

const img = {
  objectFit: 'contain',
  maxWidth: '100%',
  maxHeight: '100%',
  width: 'auto',
  height: 'auto',
};


function Game(props) { /* eslint-disable camelcase */
  const {
    themes, glossary, cover, name, game_modes, genres,
  } = props;
  const theme = themes && themes.map(
    themeid => glossary.themes[themeid] && glossary.themes[themeid].name,
  );
  const genre = genres && genres.map(
    genreid => glossary.genres[genreid] && glossary.genres[genreid].name,
  );

  return (
    <Media style={game}>
      <MediaLeft>
        { cover && (
        <img
          style={img}
          alt="game cover"
          src={`https://images.igdb.com/igdb/image/upload/t_thumb/${cover.image_id}.png`}
        />
        ) }
      </MediaLeft>
      <MediaContent>
        <Content>
          <p>
            <strong>{name}</strong>
            <br />
            {/* {game_modes.length && glossary.gamse_modes[game_modes[0]].name} */}
            { game_modes.map(mode => glossary.game_modes[mode].name).join(', ') }
            <br />
            <strong>Genres: </strong>
            {genre.map(_genres => _genres).filter(_genre => _genre).join(', ')}
            <br />
            <strong>Themes: </strong>
            {theme && theme.map(_themes => _themes).filter(_theme => _theme).join(', ')}
          </p>
        </Content>
      </MediaContent>
    </Media>
  );
}

Game.defaultProps = {
  themes: [],
  glossary: {},
  cover: {},
  name: {},
  game_modes: [],
  genres: [],
};

Game.propTypes = {
  themes: PropTypes.arrayOf(PropTypes.number),
  glossary: PropTypes.objectOf(PropTypes.object),
  // eslint-disable-next-line react/forbid-prop-types
  cover: PropTypes.object,
  name: PropTypes.string,
  game_modes: PropTypes.arrayOf(PropTypes.number),
  genres: PropTypes.arrayOf(PropTypes.number),
};

export default Game;
