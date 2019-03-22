import React, { Component } from 'react';
import Cards from './card'
import { Field, Input, Button } from 'bloomer'
import styled from 'styled-components';

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

    render(){
        return(
            <ProfileContainer>
                <Cards />
                <Cards />
                <Cards />
                <Cards />
                    <InputContainer>
                        <Field isGrouped>
                            <Input style={ padding }type='text' placeholder='Add a friend!'></Input>
                            <Button>Submit</Button>
                        </Field>
                    </InputContainer>
            </ProfileContainer>           
        )
    }
}

export default ProfileList