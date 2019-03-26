import React, { Component } from 'react';
import { Navbar, NavbarEnd, Button } from 'bloomer';
// import { CopyToClipboard } from 'react-copy-to-clipboard';
import copyToClipboard from 'copy-to-clipboard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
import '../App.css';

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

// const url = window.location.href;

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
        <div className="cohesion" style={marginLeft}>COHESION</div>
        <NavbarEnd>
          {/* <CopyToClipboard text={(() => window.location.href)()}>
            <Button style={marginRight} type="button">Share URL</Button>
          </CopyToClipboard> */}
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
