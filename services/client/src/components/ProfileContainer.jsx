import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, Input } from 'bloomer';
import styled from 'styled-components';

import { handleInputChange } from 'react-helpers';

import ProfileCard from './ProfileCard';

const ProfileContainer = styled.div`
    padding-top: 40px;
    grid-area: p;
`;
const padding = {
  textAlign: 'center',
  marginRight: '10px',
};

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

class ProfileList extends Component {
    state = { player: '' };

    static propTypes = {
      // TODO: Add specificity to player objects
      players: PropTypes.objectOf(PropTypes.object).isRequired,
      addPlayers: PropTypes.func.isRequired,
      // removePlayers: PropTypes.func.isRequired,
    }

    handleChange = handleInputChange.bind(this);

    handleKeyDown = (event) => {
      const { addPlayers } = this.props;
      const { player } = this.state;
      const { keyCode } = event;

      if (keyCode === 13) {
        event.preventDefault();

        addPlayers(player);
        this.setState({ player: '' });
      }
    }


    renderPlayers = () => {
      const { players } = this.props;
      return Object.values(players).map(player => (
        <ProfileCard
          name={player.realname}
          avatar={player.avatarmedium}
          alias={player.personaname}
          games={player.games.length}
          lastonline={player.lastlogoff}
        />
      ));
    }

    render() {
      const { player } = this.state;

      return (
        <ProfileContainer>
          { this.renderPlayers() }
          <InputContainer>
            <Field isGrouped>
              <Input
                style={padding}
                type="text"
                placeholder="Add a friend!"
                name="player"
                value={player}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
              />
              {/* <Button>Submit</Button> */}
            </Field>
          </InputContainer>
        </ProfileContainer>
      );
    }
}

export default ProfileList;
