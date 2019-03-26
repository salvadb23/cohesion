import React from 'react';
import { Navbar, NavbarEnd, Button } from 'bloomer';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import '../App.css';

const styles = {
  color: 'white',
  position: 'fixed',
  width: '100vw',
  height: '55px',
  backgroundColor: 'hsl(217, 71%, 53%)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};

const marginLeft = {
  marginLeft: '20px',
};

const marginRight = {
  marginRight: '20px',
};

const url = window.location.href;

export default function Navigation() {
  return (
    <Navbar style={styles}>
      <div className="cohesion" style={marginLeft}>COHESION</div>
      <NavbarEnd>
        <CopyToClipboard text={url}>
          <Button style={marginRight} type="button">Share URL</Button>
        </CopyToClipboard>
      </NavbarEnd>
    </Navbar>
  );
}
