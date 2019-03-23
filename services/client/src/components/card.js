import React from 'react'
import { Card, CardContent, Media, MediaLeft, Image, Title, MediaContent, Content, Subtitle } from 'bloomer'
import Moment from 'react-moment';

const size = {
    paddingLeft:'calc(10px + 2vw)',
    paddingRight: 'calc(10px + 2vw)',
    width: '80%',
    height: 'max-content',
    margin: 'auto',
    marginBottom: '15px',
    
}

const padding = {
    paddingLeft: '15px', 
}



export default function Cards(props) {
        return(
            <Card style={ size }>
                <CardContent>
                    <Media style={ padding }>
                        <MediaLeft>
                            <Image isSize='48x48' src={ props.avatar} />
                        </MediaLeft>
                        <MediaContent>
                            <Title isSize={4}>{ props.name }</Title>
                            <Subtitle isSize={6}>@{ props.alias }</Subtitle>
                        </MediaContent>
                    </Media>
                    <Content>
                        <strong>Total Games: </strong>{props.games}
                        <br/>
                        <strong>Last Online: </strong><Moment fromNow><Moment unix>{props.lastonline}</Moment></Moment>
                    </Content>
                </CardContent>
            </Card>
    )
}
