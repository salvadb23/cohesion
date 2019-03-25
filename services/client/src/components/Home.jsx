import React from 'react';

import {
  Hero, HeroBody, Container, Title,
} from 'bloomer';

import '../App.css';

const size = {
  backgroundColor: '#08C8F6',
  backgroundImage: 'linear-gradient(315deg, #08C8F6 0%, #4D5DFB 74%)',
};

const TitleFontSize = {
  color: 'white',
  fontSize: 'calc(7vw + 40px)',
  marginBottom: '0px',
  fontWeight: 'bold',
};

const SubFontSize = {
  fontSize: 'calc(10px + 2vw)',
  min: '30px',
  marginTop: '0px',
  marginBottom: '30px',
  color: 'white',
  fontWeight: '300',
};

const link = {
  color: 'white',
  fontSize: 'calc(10px + 1vw)',
  fontWeight: '300',
  border: '1px solid white',
  padding: '15px',
  borderRadius: '10px',
  marginTop: '20px',
};

export default function Home() {
  return (
    <Hero className="Hero" isColor="fullheight" style={size}>
      <HeroBody>
        <Container hasTextAlign="centered">
          <Title className="Title" style={TitleFontSize}>COHESION</Title>
          <Title style={SubFontSize}>connecting gamers, one game at a time.</Title>
          <a href style={link}>Get Started</a>
        </Container>
      </HeroBody>
    </Hero>
  );
}
