import React, { Component } from 'react';
import Game from './game';
import styled from 'styled-components'
import PropTypes from 'prop-types';
import difference from 'lodash/difference';
import omit from 'lodash/omit';
import merge from 'lodash/fp/merge'; // Using fp version for immutability
import * as api from '../api';

const GameContainer = styled.div`
    padding-top: 39px;
    grid-area: g;
    overflow: auto;
`

class GameList extends Component {
    state = {
        games: {},
    };

    async componentDidUpdate(prevProps) {
        const { games: oldGames } = prevProps;
        const { games: curGames } = this.props;

        if (oldGames !== curGames) {
            const added = difference(curGames, oldGames);
            const removed = difference(oldGames, curGames);

            if (removed.length) {
                console.log('removed');
                console.log(removed);

                this.setState({ games: omit(this.state.games, removed) })
            }

            if (added.length) {
                console.log('added');
                console.log(added);

                const defaults = Object.assign(...added.map(g => ({ [g]: false })));

                this.setState({ games: { ...this.state.games, ...defaults }});

                const games = await api.getGames(...added);

                this.setState({ games: merge(this.state.games, games) });
            }
        }
    }

    render() {
        return (
        <GameContainer>
            <Game />
            <Game />
            <Game />
            <Game />
            <Game />
         </GameContainer>
        )
    }

    static propTypes = {
        games: PropTypes.array.isRequired,
    };
}

export default GameList;
