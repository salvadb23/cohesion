import React, { Component } from 'react'
import styled from 'styled-components'
import intersection from 'lodash/intersection';
import omit from 'lodash/omit';
// import Game from './game'
import ProfileList from './ProfileContainer'
import GameContainer from './GameContainer';

import * as api from '../api';
// import objRemKeys from '../utils/objRemKeys';

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

`

// console.log('Hello?')
// console.dir(ProfileList);

// const ProfileContainer = styled.div`
//     padding-top: 40px;
//     grid-area: p;
// `
// const GameContainer = styled.div`
//     padding-top: 39px;
//     grid-area: g;
//     overflow: auto;
// `

class Dashboard extends Component {
    state = {
        players: {},
        glossaries: {},
        filters: {},
    };

    async componentDidMount() {
        const glossaries = await api.getGlossaries();

        // Generate default filters as false.
        const filters = Object.entries(glossaries)
            .reduce((prev, [glossName, gloss]) => {
                const defaults = Object.keys(gloss)
                    .reduce((prev, id) => (
                        { ...prev, [id]: false }
                    ), {});

                return { ...prev, [glossName]: defaults };
            }, {});

        this.setState({ glossaries, filters });
    }

    addPlayers = async (...ids) => {
        const newPlayers = await api.getPlayers(...ids);
        const { players: oldPlayers } = this.state;

        this.setState({ players: { ...oldPlayers, ...newPlayers }});
    }

    removePlayers = (...ids) => {
        const players = this.state;

        this.setState({ players: omit(players, ids) });
    }

    toggleFilter = (category, id) => {
        const { filters } = this.state;
        const { [category]: catFilters } = filters;
        const { [id]: val } = catFilters;

        this.setState({ filters: { ...filters, [category]: { ...catFilters, [id]: !val } } });
    }

    genFilterList = () => {
        let { filters } = this.state;

        filters = Object.entries(filters)
            .reduce((prev, [category, catFilters]) => {
                // Get the ids of the category whose value is truthy
                const truthies = Object.keys(catFilters)
                    .filter(id => catFilters[id]);

                return { ...prev, [category]: truthies }
            }, {})

        return filters;
    }

    render(){
        const { players } = this.state;
        const { addPlayers, removePlayers } = this;

        const sharedGames = intersection(...Object.values(players).map(p => p.games));

        return(
        <Wrapper>
            <ProfileList {...{ players, addPlayers, removePlayers }}  />
            <GameContainer games={sharedGames} />
        </Wrapper>
        )
    }
}

export default Dashboard
