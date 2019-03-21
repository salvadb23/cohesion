import React from 'react'
import { Card, CardHeader, CardHeaderTitle, CardHeaderIcon, CardImage, CardContent, Media, MediaLeft, Image, Title, Subtitle, MediaContent, Content, Icon } from 'bloomer'
import styled from 'styled-components'

const padding = {
    paddingLeft: '55px',
}

const size = {
    paddingLeft:'20%',
    paddingRight: '20%',
    width: 'fit-content',
    height: 'fit-content',
    margin: 'auto',
    marginBottom: '15px',
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
                            <Title isSize={4}>Waluigi</Title>
                            <Subtitle isSize={6}>@Waluigi</Subtitle>
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
