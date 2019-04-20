import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import difference from 'lodash/difference';
import omit from 'lodash/omit';
import pick from 'lodash/pick';
import pickBy from 'lodash/pickBy';

import Game from './Game';

import * as api from '../api';

const GameContainer = styled.div`
    padding-top: 101px;
    grid-area: g;
    overflow: auto;
    background-color: #121212;
`;

class GameList extends Component {
    static propTypes = {
      games: PropTypes.arrayOf(PropTypes.number).isRequired,
      filterLists: PropTypes.objectOf(PropTypes.array).isRequired,
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
      let { games } = this.state;
      const { filterLists, glossaries } = this.props;

      games = pickBy(games, (game) => {
        if (game) {
          return Object.entries(filterLists).every(([cat, catFilters]) => {
            if (catFilters.length) {
              const { [cat]: ids } = game;

              if (ids) {
                return difference(catFilters, ids).length === 0;
              }
            }

            return true;
          });
        }

        return false;
      });

      return Object.values(games).map(game => (
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
