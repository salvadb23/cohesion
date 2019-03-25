import React from 'react';
import PropTypes from 'prop-types';

import {
  Card, CardContent, Media, MediaLeft, Image, Title, MediaContent, Content, Subtitle,
} from 'bloomer';
import Moment from 'react-moment';

import '../App.css';

const size = {
  paddingLeft: 'calc(10px + 2vw)',
  paddingRight: 'calc(10px + 2vw)',
  width: '70% !important',
  minWidth: '400px',
  height: 'max-content',
  margin: 'auto',
  marginBottom: '15px',

};

const padding = {
  paddingLeft: '15px',
};

function ProfileCard(props) {
  const {
    avatar, name, alias, games, lastonline,
  } = props;

  return (
    <Card className="Card" style={size}>
      <CardContent>
        <Media style={padding}>
          <MediaLeft>
            <Image isSize="48x48" src={avatar} />
          </MediaLeft>
          <MediaContent>
            <Title isSize={4}>{ name }</Title>
            <Subtitle isSize={6}>
              { `@${alias}` }
            </Subtitle>
          </MediaContent>
        </Media>
        <Content>
          <strong>Total Games: </strong>
          {games}
          <br />
          <strong>Last Online: </strong>
          <Moment unix fromNow>{lastonline}</Moment>
        </Content>
      </CardContent>
    </Card>
  );
}

ProfileCard.propTypes = {
  avatar: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  alias: PropTypes.string.isRequired,
  lastonline: PropTypes.number.isRequired,
  games: PropTypes.number.isRequired,
};

export default ProfileCard;
