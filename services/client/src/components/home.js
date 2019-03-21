import React from 'react';
import styled from 'styled-components'

const Wrapper = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: papayawhip;
    display: flex;
    flex-direction: row;
`
const HeroImage = styled.div`
    width: 60%;
    height: 100%;
    background-color: black;
    position: relative;
`
const LogIn = styled.div`
    width: 40%;
    height: 100%;
    background-color: #2F2F30;
    display: flex;
    flex-direction: column;
    align-items: center;
`
const Gradient = styled.div`
    width: 100%;
    height: 100%;
    background-image: linear-gradient(to right top, #111111, #0f0f0f, #0c0c0c, #080808, #050505, #171119, #291721, #3d1c24, #6a2a37, #9a3849, #cc4857, #ff5963);
    opacity: .2;
`

const Title = styled.h1`
    font-family: Open Sans;
    font-size: 55px;
    font-weight: 900;
    color: white;
    padding-top: 70px;
    margin-bottom: 0px;
`
const Sub = styled.h2 `
    margin-top: 10px;
    font-family: Open Sans;
    font-size: 20px;
    font-weight: 700;
    color: white;
`
const Form = styled.form `
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: left;
`

export default function Home(props){

    return(
        <Wrapper>
            <HeroImage className="HeroImage">
                <Gradient className="Gradient"></Gradient>
            </HeroImage>
            <LogIn>
                <Title>Welcome,</Title>
                <Sub>enter your Steam ID to get started</Sub>
                <Form>
                    <label>Steam ID</label>
                    <input type="text"></input>
                </Form>
            </LogIn>
        </Wrapper>
    )

}