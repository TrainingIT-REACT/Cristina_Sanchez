import React, {Component} from 'react';
import QueryString from 'query-string';

class Callback extends Component {

    constructor(props) {
        super(props);
        this._handleAuthCallback = this.handleAuthCallback(this.props.dispatch);
    }

    componentDidMount() {
        window.setTimeout(this._handleAuthCallback, 1);
    }

    render() {
        return <div></div>
    }

    handleAuthCallback(dispatch) {
        const queryString = QueryString.parse(location.hash);

        if (queryString.error) {
            console.log('Spotify access request has been denied' + queryString.error);
        } else {
            if (opener && opener.spotifyApi) opener.spotifyApi.setAccessToken(queryString.access_token);
            if (opener && opener.onAuth) opener.onAuth();
            // save token to local storage
            localStorage.setItem('token', queryString.access_token);
        }
        window.close()
    }

}

export default Callback;