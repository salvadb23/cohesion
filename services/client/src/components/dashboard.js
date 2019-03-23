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
        const filters = Object.assign(
            ...Object.entries(glossaries)
                .map(([glossName, gloss]) => (
                    {
                        [glossName]: Object.assign(
                            ...Object.keys(gloss).map(id => ({ [id]: false }))
                        )
                    }
                ), {})
        );

        this.setState({ glossaries, filters });
    }

    addPlayers = async (...ids) => {
        const newPlayers = await api.getPlayers(...ids);

        this.setState((state) => (
            { players: { ...state.players, ...newPlayers }}
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
        })
    }

    genFilterList = () => {
        let { filters } = this.state;

        return Object.assign(
            ...Object.entries(filters).map(([cat, catFilters]) => (
                {
                    [cat]: Object.entries(catFilters)
                        .filter(([, catFilter]) => catFilter) // If filter is enabled
                        .map(([id, ]) => id) // Keep only id
                }
            ))
        )
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
