import React, { Component } from 'react';
import Game from './game';
import styled from 'styled-components'

const GameContainer = styled.div`
    padding-top: 39px;
    grid-area: g;
    overflow: auto;
`

export default function GameList(props){

    return(
        <GameContainer>
                <Game />
                <Game />
                <Game />
                <Game />
                <Game />
        </GameContainer>
    )

}