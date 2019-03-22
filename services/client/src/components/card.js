import React from 'react'
import { Card, CardContent, Media, MediaLeft, Image, Title, MediaContent, Content } from 'bloomer'

const size = {
    paddingLeft:'calc(10px + 2vw)',
    paddingRight: 'calc(10px + 2vw)',
    width: 'max-content',
    height: 'max-content',
    margin: 'auto',
    marginBottom: '15px',
    
}

const padding = {
    paddingTop: '6px'
}

export default function Cards(props) {
        return(
            <Card style={ size }>
                <CardContent>
                    <Media>
                        <MediaLeft>
                            <Image isSize='48x48' src='http://37.media.tumblr.com/c8651ba47fbb15f295988bdce5983bf5/tumblr_n6pwxyx3jF1ssjt3yo4_r1_250.png' />
                        </MediaLeft>
                        <MediaContent>
                            <Title style={ padding } isSize={4}>asjdhfaksdhfa</Title>
                        </MediaContent>
                    </Media>
                    <Content>
                        <strong>Wahhhhhhhhhhhhh</strong>
                        <br/>
                        <small>20 March 2019</small>
                    </Content>
                </CardContent>
            </Card>
    )
}
