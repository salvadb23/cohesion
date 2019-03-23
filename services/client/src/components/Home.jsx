import React from 'react';

import {
  Hero, HeroBody, Container, Title, Input,
} from 'bloomer';

import '../App.css';

const size = {
  backgroundColor: 'papayawhip',
};

const TitleFontSize = {
  color: 'white',
  fontSize: 'calc(7vw + 30px)',
  marginBottom: '0px',
};

const SubFontSize = {
  fontSize: 'calc(10px + 2vw)',
  min: '30px',
  marginTop: '0px',
  marginBottom: '30px',
};

const width = {
  width: '50%',
  borderRadius: '40px',
  textAlign: 'center',
  padding: '20px',
  fontSize: '15px',
};

export default function Home() {
  return (
    <Hero className="Hero" isColor="fullheight" style={size}>
      <HeroBody>
        <Container hasTextAlign="centered">
          <Title className="Title" style={TitleFontSize}>COHESION</Title>
          <Title style={SubFontSize}>Find games you and your friends both have</Title>
          <Input style={width} isSize="medium" type="text" placeholder="Enter A Steam ID" />
        </Container>
      </HeroBody>
    </Hero>
  );
}
