import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import intersection from 'lodash/intersection';
import omit from 'lodash/omit';
import pickBy from 'lodash/pickBy';
import qs from 'qs';

import ProfileList from './ProfileContainer';
import GameList from './GameList';
import Navigation from './Navbar';

import * as api from '../api';

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    margin: auto;
    display: grid;
    grid-template-columns: 3fr 5fr;
    grid-template-areas: "p g";

    @media only screen and (max-width: 1200px) {
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

    static propTypes = {
      location: PropTypes.shape({
        search: PropTypes.string,
      }).isRequired,
      history: PropTypes.shape({
        push: PropTypes.func.isRequired,
      }).isRequired,
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

      const { location: { search } } = this.props;

      if (search) {
        const { players } = qs.parse(search, { ignoreQueryPrefix: true });

        if (players) {
          await this.addPlayers(players);
          this.genGameList();
        }
      }
    }

    addPlayers = async (...ids) => {
      const newPlayers = await api.getPlayers(...ids);

      this.setState(state => (
        { players: { ...state.players, ...newPlayers } }
      ));
      this.updateUrl();
    }

    removePlayers = (...ids) => {
      this.setState(state => (
        { players: omit(state.players, ids) }
      ));
      this.updateUrl();
      this.genGameList();
    }

    updateUrl = () => {
      const { players } = this.state;
      const { history } = this.props;

      history.push({
        search: qs.stringify({ players: Object.keys(players) }, { arrayFormat: 'brackets' }),
      });
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
        { ...prev, [cat]: Object.keys(pickBy(catFilters, Boolean)).map(Number) }
      ), {});
    }

    // For use in button
    genGameList = () => {
      this.setState((state) => {
        const games = intersection(...Object.values(state.players).map(p => p.games));
        return { games };
      });
    }

    render() {
      const {
        players, glossaries, games, filters,
      } = this.state;
      const {
        addPlayers, removePlayers, genGameList, toggleFilter,
      } = this;

      return (
        <div>
          <Navigation />
          <Wrapper>
            <ProfileList
              {...{
                players,
                addPlayers,
                removePlayers,
                genGameList,
                glossaries,
                filters,
                toggleFilter,
              }}
            />
            <GameList {...{ games, glossaries, filterLists: this.genFilterLists() }} />
          </Wrapper>
        </div>
      );
    }
}

export default Dashboard;
