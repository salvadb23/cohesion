import React, { Component } from 'react'
import styled from 'styled-components'
import Game from './game'
import ProfileList from './ProfileContainer'

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

console.log('Hello?')
console.dir(ProfileList);

// const ProfileContainer = styled.div`
//     padding-top: 40px;
//     grid-area: p;
// `
const GameContainer = styled.div`
    padding-top: 39px;
    grid-area: g;
    overflow: auto;
`

class Dashboard extends Component {
    render(){
        return(
        <Wrapper>
            <ProfileList />
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