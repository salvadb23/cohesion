import React, { Component } from 'react';
import Game from './game';
import styled from 'styled-components'
import PropTypes from 'prop-types';

const GameContainer = styled.div`
    padding-top: 39px;
    grid-area: g;
    overflow: auto;
`

class GameList extends Component {
    render() {
        return (
        <GameContainer>
            <Game />
            <Game />
            <Game />
            <Game />
            <Game />
         </GameContainer>
        )
    }

    static propTypes = {
        games: PropTypes.array.isRequired,
    };
}

export default GameList;
