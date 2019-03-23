import React, { Component } from 'react';

import styled from 'styled-components';

import intersection from 'lodash/intersection';
import omit from 'lodash/omit';

import ProfileList from './ProfileContainer';
import GameList from './GameList';

import * as api from '../api';

const Wrapper = styled.div`
    width: 85vw;
    height: 100vh;
    margin: auto;
    display: grid;
    grid-template-columns: 3fr 5fr;
    grid-template-areas: "p g";

    @media only screen and (max-width: 1000px) {
        display: block;
      }

`;

class Dashboard extends Component {
    state = {
      players: {},
      glossaries: {},
      filters: {},
    };

    async componentDidMount() {
      const glossaries = await api.getGlossaries();

      // Generate default filters as false.
      const filters = Object.assign(
        ...Object.entries(glossaries)
          .map(([glossName, gloss]) => (
            {
              [glossName]: Object.assign(
                ...Object.keys(gloss).map(id => ({ [id]: false })),
              ),
            }
          ), {}),
      );

      this.setState({ glossaries, filters });
    }

    addPlayers = async (...ids) => {
      const newPlayers = await api.getPlayers(...ids);

      this.setState(state => (
        { players: { ...state.players, ...newPlayers } }
      ));
    }

    removePlayers = (...ids) => {
      this.setState(state => (
        { players: omit(state.players, ids) }
      ));
    }

    toggleFilter = (category, id) => {
      this.setState((state) => {
        const { filters } = state;
        const { [category]: catFilters } = filters;
        const { [id]: val } = catFilters;

        return { filters: { ...filters, [category]: { ...catFilters, [id]: !val } } };
      });
    }

    genFilterList = () => {
      const { filters } = this.state;

      return Object.assign(
        ...Object.entries(filters).map(([cat, catFilters]) => (
          {
            [cat]: Object.entries(catFilters)
              .filter(([, catFilter]) => catFilter) // If filter is enabled
              .map(([id]) => id), // Keep only id
          }
        )),
      );
    }

    render() {
      const { players, glossaries } = this.state;
      const { addPlayers, removePlayers } = this;

      const sharedGames = intersection(...Object.values(players).map(p => p.games));

      return (
        <Wrapper>
          <ProfileList {...{ players, addPlayers, removePlayers }} />
          <GameList games={sharedGames} glossaries={glossaries} />
        </Wrapper>
      );
    }
}

export default Dashboard;
