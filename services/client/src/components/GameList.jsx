import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import difference from 'lodash/difference';
import omit from 'lodash/omit';
import pick from 'lodash/pick';

import Game from './Game';

import * as api from '../api';

const GameContainer = styled.div`
    padding-top: 39px;
    grid-area: g;
    overflow: auto;
`;

class GameList extends Component {
    static propTypes = {
      games: PropTypes.arrayOf(PropTypes.number).isRequired,
      glossaries: PropTypes.objectOf(PropTypes.object).isRequired,
    };

    state = {
      games: {},
    };

    // TODO: Find alternative to setting state here
    async componentDidUpdate(prevProps) { /* eslint-disable react/no-did-update-set-state */
      const { games: oldGames } = prevProps;
      const { games: curGames } = this.props;

      if (oldGames !== curGames) {
        const added = difference(curGames, oldGames);
        const removed = difference(oldGames, curGames);

        if (removed.length) {
          this.setState(state => (
            { games: omit(state.games, removed) }
          ));
        }

        if (added.length) {
          const defaults = Object.assign(...added.map(g => ({ [g]: false })));

          this.setState(state => (
            { games: { ...state.games, ...defaults } }
          ));

          const games = await api.getGames(...added);

          this.setState(state => (
            { games: { ...state.games, ...pick(games, Object.keys(state.games)) } }
          ));
        }
      }
    }

    renderGames = () => {
      const { games } = this.state;
      const { glossaries } = this.props;
      return Object.values(games).filter(game => game).map(game => (
        <Game key={game.appid} glossary={glossaries} {...game} />
      ));
    }

    render() {
      return (
        <GameContainer>
          { this.renderGames() }
        </GameContainer>
      );
    }
}

export default GameList;
