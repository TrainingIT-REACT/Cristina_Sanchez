import App from './components/app';
import configureStore from './stores/configureStore';
import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import Root from './components/root';
import SpotifyWebApi from 'spotify-web-api-node';
import * as AUTH from './constants/auth';


window.spotifyApi = new SpotifyWebApi({
  clientId: AUTH.CLIENT_ID ,
  redirectUri: AUTH.REDIRECT_URI
})

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Root>
      <App/>
    </Root>
  </Provider>,
  document.getElementById('app')
)
