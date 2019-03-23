import React, { Component } from 'react';
import Cards from './card'
import { Field, Input} from 'bloomer'
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { handleInputChange } from 'react-helpers';

const ProfileContainer = styled.div`
    padding-top: 40px;
    grid-area: p;
`
const padding = {
    textAlign: 'center',
    marginRight: '10px',
}

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

class ProfileList extends Component{
    state = { player: '' };

    handleKeyDown(event) {
        const { addPlayers } = this.props;
        const { player } = this.state;
        const { keyCode } = event;

        if(keyCode === 13) {
            event.preventDefault();
            addPlayers(player);
            this.setState({ player: '' });
        }
    }

    renderPlayers = () => {
        const { players } = this.props;
        return Object.values(players).map((player) => (
                <Cards name={ player.realname } avatar={ player.avatarmedium } alias={ player.personaname } 
                games={ player.games.length } lastonline={player.lastlogoff}/>
        ))
    }

    render(){
        const { player } = this.state;

        
        return(
            <ProfileContainer>
                { this.renderPlayers() }
                    <InputContainer>
                        <Field isGrouped>
                            <Input
                                style={ padding }
                                type='text'
                                placeholder='Add a friend!'
                                name='player'
                                value={player}
                                onChange={handleInputChange.bind(this)}
                                onKeyDown={this.handleKeyDown.bind(this)}
                            />
                            {/* <Button>Submit</Button> */}
                        </Field>
                    </InputContainer>
            </ProfileContainer>
        )
    }

    static propTypes = {
        players: PropTypes.object.isRequired,
        addPlayers: PropTypes.func.isRequired,
        removePlayers: PropTypes.func.isRequired,
    }
}

export default ProfileList
