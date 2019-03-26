import React from 'react';
import { Link } from 'react-router-dom';

import {
  Hero, HeroBody, Container, Title,
} from 'bloomer';

import '../App.css';

const size = {
  backgroundColor: 'rgb(32, 48, 110)',
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
          <Title style={SubFontSize}>game with your friends</Title>
          <Link style={link} to="/dashboard">Get Started</Link>
        </Container>
      </HeroBody>
    </Hero>
  );
}
