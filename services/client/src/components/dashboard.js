import React, { Component } from 'react'
import styled from 'styled-components'
import Cards from './card'
import Game from './game'

import * as api from '../api';
import objRemKeys from '../utils/objRemKeys';

const Wrapper = styled.div`
    width: 85vw;
    height: 100vh;
    margin: auto;
    display: grid;
    grid-template-columns: 3fr 5fr;
    grid-template-areas: "p g"
`

const ProfileContainer = styled.div`
    padding-top: 40px;
    grid-area: p;
`
const GameContainer = styled.div`
    padding-top: 39px;
    grid-area: g;
`

class Dashboard extends Component {
    state = {
        players: {},
        glossaries: {},
        filters: {},
    };

    async componentDidMount() {
        const glossaries = await api.getGlossaries();

        const filters = Object.keys(glossaries)
            .reduce((prev, glossName) => {
                const defaults = Object.keys(glossaries[glossName])
                    .reduce((prev, id) => (
                        { ...prev, [id]: false }
                    ), {});

                return { ...prev, [glossName]: defaults };
            }, {})

        this.setState({ glossaries, filters });
    }

    async addPlayers(...ids) {
        const newPlayers = await api.getPlayers(...ids);
        const { players: oldPlayers } = this.state;

        this.setState({ players: { ...oldPlayers, ...newPlayers }});
    }

    removePlayers(...ids) {
        const players = this.state;

        this.setState({ players: objRemKeys(players, ids) });
    }

    toggleFilter(category, id) {
        const { filters } = this.state;
        const { [category]: catFilters } = filters;
        const { [id]: val } = catFilters;

        this.setState({ filters: { ...filters, [category]: { ...catFilters, [id]: !val } } })
    }

    render(){
        return(

        <Wrapper>
            <ProfileContainer>
                <Cards />
                <Cards />
            </ProfileContainer>
            <GameContainer>
                <Game />
                <Game />
                <Game />
                <Game />
                <Game />
                <Game />
                <Game />
                <Game />
                <Game />
                <Game />
                <Game />
                <Game />
                <Game />
                <Game />
                <Game />
                <Game />
                <Game />
            </GameContainer>
        </Wrapper>
        )
    }
}

export default Dashboard
