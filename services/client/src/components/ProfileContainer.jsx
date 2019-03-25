import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Field, Input, Button } from 'bloomer';
import styled from 'styled-components';

import { handleInputChange } from 'react-helpers';

import ProfileCard from './ProfileCard';
import Filters from './Filters';

const ProfileContainer = styled.div`
    padding-top: 100px;
    grid-area: p;
    overflow: auto;
    background-color: #fbfbfb;
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
      genGameList: PropTypes.func.isRequired,
      glossaries: PropTypes.objectOf(PropTypes.object).isRequired,
      filters: PropTypes.objectOf(PropTypes.object).isRequired,
      toggleFilter: PropTypes.func.isRequired,
      removePlayers: PropTypes.func.isRequired,
    }

    handleChange = handleInputChange.bind(this);

    handleEnterKey = (event) => {
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
      const { players, removePlayers } = this.props;

      return Object.entries(players).map(([id, player]) => (
        <ProfileCard
          key={id}
          name={player.realname}
          avatar={player.avatarmedium}
          alias={player.personaname}
          games={player.games ? player.games.length : 0}
          lastonline={player.lastlogoff}
          onClickDelete={() => removePlayers(id)}
        />
      ));
    }

    render() {
      const { player } = this.state;
      const {
        genGameList, glossaries, filters, toggleFilter,
      } = this.props;

      return (
        <ProfileContainer>
          { this.renderPlayers() }
          <InputContainer>
            <Field isGrouped>
              <Input
                style={padding}
                type="text"
                placeholder="Enter a Steam ID"
                name="player"
                value={player}
                onChange={this.handleChange}
                onKeyDown={this.handleEnterKey}
              />
              <Button onClick={() => genGameList()}>Load</Button>
            </Field>
          </InputContainer>
          <Filters {...{ glossaries, filters, toggleFilter }} />
        </ProfileContainer>
      );
    }
}

export default ProfileList;
