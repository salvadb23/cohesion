import React, { Component } from 'react'
import { Media, MediaLeft, Image, Content, Level, LevelLeft, LevelItem, Icon, MediaContent, MediaRight, Delete } from 'bloomer'

const game = {
    boxShadow: '0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1)',
    paddingBottom: '30px',
    paddingTop: '20px',
    paddingLeft: '20px',
}

class Game extends Component {
    render(){
        return(
            <Media style={ game }>
                <MediaLeft>
                    <Image isSize='96x96' src='http://conceptartworld.com/wp-content/uploads/2013/11/AC4_001.jpg' />
                </MediaLeft>
                <MediaContent>
                    <Content>
                        <p>
                            <strong>Assassins Creed</strong> 
                            <br />
                            Multi-Player
                            <br />
                            Release Date: November 19, 2013
                            <br />
                            Tags: Adventure, Thriller
                        </p>
                    </Content>
                    <Level isMobile>
                        <LevelLeft>
                            <LevelItem href='#'>
                                <Icon isSize='small'><span className="fa fa-reply" aria-hidden="true" /></Icon>
                            </LevelItem>
                            <LevelItem href='#'>
                                <Icon isSize='small'><span className="fa fa-retweet" aria-hidden="true" /></Icon>
                            </LevelItem>
                            <LevelItem href='#'>
                                <Icon isSize='small'><span className="fa fa-heart" aria-hidden="true" /></Icon>
                            </LevelItem>
                        </LevelLeft>
                    </Level>
                </MediaContent>
            </Media>
        )
    }
}

export default Game