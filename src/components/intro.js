import React from 'react';
import {Header, Icon, Step} from 'semantic-ui-react';
import Callback from "./callback";

export default Intro => {
    return (
        <div>
            <Header as='h1' disabled>
                Bienvenido a Reactify!
            </Header>
            <Step.Group size='big' unstackable>
                <Step disabled>
                    <Icon name='spotify'/>
                    <Step.Content>
                        <Step.Title>Haz login con tu cuenta de Spotify</Step.Title>
                    </Step.Content>
                </Step>
            </Step.Group>
            <Callback/>
        </div>
    )
}