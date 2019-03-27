import React, { Component } from 'react';

import copyToClipboard from 'copy-to-clipboard';

import { Navbar, NavbarEnd, Button } from 'bloomer';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';

const styles = {
  color: 'white',
  position: 'fixed',
  width: '100vw',
  height: '55px',
  backgroundColor: 'rgb(32, 48, 110)',
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

class Navigation extends Component {
  state = {
    copied: false,
  };

  handleClickCopy = () => {
    copyToClipboard(window.location.href);

    this.setState({ copied: true });

    setTimeout(() => {
      this.setState({ copied: false });
    }, 2000);
  }

  render() {
    const { copied } = this.state;

    return (
      <Navbar style={styles}>
        <Link to="/" className="cohesion" style={marginLeft}>COHESION</Link>
        <NavbarEnd>
          <Button
            style={marginRight}
            type="button"
            onClick={this.handleClickCopy}
            disabled={copied}
          >
            { copied ? 'Copied' : <FontAwesomeIcon icon={faClipboard} /> }
          </Button>
        </NavbarEnd>
      </Navbar>
    );
  }
}

export default Navigation;
