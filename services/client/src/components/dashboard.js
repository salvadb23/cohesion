import React, { Component } from 'react'
import styled from 'styled-components'
import Cards from './card'
import Game from './game'

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