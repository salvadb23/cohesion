import React, { Component } from 'react';

import styled from 'styled-components';

import intersection from 'lodash/intersection';
import omit from 'lodash/omit';
import pickBy from 'lodash/pickBy';

import ProfileList from './ProfileContainer';
import GameList from './GameList';

import * as api from '../api';
import Filters from './Filters';

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
      games: [],
    };

    async componentDidMount() {
      const glossaries = await api.getGlossaries();

      // Generate default filters as false.
      const filters = Object.entries(glossaries).reduce((prev, [glossName, gloss]) => (
        {
          ...prev,
          [glossName]: Object.keys(gloss).reduce((prevDef, id) => (
            { ...prevDef, [id]: false }
          ), {}),
        }
      ), {});

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

    genFilterLists = () => {
      const { filters } = this.state;

      return Object.entries(filters).reduce((prev, [cat, catFilters]) => (
        { ...prev, [cat]: Object.keys(pickBy(catFilters, Boolean)) }
      ), {});
    }

    // For use in button
    genGameList = () => {
      this.setState((state) => {
        const games = intersection([], ...Object.values(state.players).map(p => p.games));
        return { games };
      });
    }

    render() {
      const {
        players, glossaries, games, filters,
      } = this.state;
      const {
        addPlayers, removePlayers, genGameList, toggleFilter, genFilterLists,
      } = this;

      return (
        <Wrapper>
          <ProfileList
            {...{
              players, addPlayers, removePlayers, genGameList,
            }}
          />
          <Filters {...{ glossaries, filters, toggleFilter }} />
          <GameList {...{ games, glossaries, filterLists: genFilterLists() }} />
        </Wrapper>
      );
    }
}

export default Dashboard;
