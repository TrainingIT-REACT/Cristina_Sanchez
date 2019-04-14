import * as actionTypes from '../constants/actionTypes';
import * as actions from './index';

export function setFeaturedPlaylists(featuredPlaylists) {
    return {
        type: actionTypes.FEATURED_PLAYLIST_SET,
        featuredPlaylists,
    }
}

// async action
export function onFetchFeaturedPlaylists() {
    function fetchFeaturedPlaylists(spotifyApi) {

        return function (dispatch) {
            dispatch(actions.callRequest());
            // set active featured playlists
            spotifyApi.getFeaturedPlaylists({
                country: 'ES',
            })
                .then(function (data) {
                    dispatch(setFeaturedPlaylists(data.body.playlists.items));
                    dispatch(actions.receiveResponse());
                }, function (err) {
                    dispatch(actions.receiveResponse());
                    if (err.statusCode === 401) {
                        dispatch(actions.expiredToken());
                    } else {
                        dispatch(actions.onErrorOccurred(err.message));
                    }
                });
        }
    }

    return function (dispatch) {
        dispatch(fetchFeaturedPlaylists(window.spotifyApi));
    }
}

export function onSelectPlaylist(activePlaylist) {
    function fetchTracksOfPlaylist(spotifyApi) {

        return function (dispatch) {
            dispatch(actions.callRequest());
            spotifyApi.getPlaylistTracks(
                activePlaylist.owner.id,
                activePlaylist.id,
            )
                .then(function (data) {
                    const tracks = data.body.items;
                    // set active playlist
                    dispatch(setActivePlaylist(activePlaylist, tracks));
                    dispatch(actions.receiveResponse());
                }, function (err) {
                    dispatch(actions.receiveResponse());
                    if (err.statusCode === 401) {
                        dispatch(actions.expiredToken());
                    } else {
                        dispatch(actions.onErrorOccurred(err.message));
                    }
                });
        }
    }

    return function (dispatch) {
        dispatch(fetchTracksOfPlaylist(window.spotifyApi));
    }
}

export function setActivePlaylist(activePlaylist, tracksOfActivePlaylist) {
    return {
        type: actionTypes.FEATURED_PLAYLIST_SELECT,
        activePlaylist,
        tracksOfActivePlaylist,
    }
}

export function onBackToListOfPlaylist() {
    return {
        type: actionTypes.FEATURED_PLAYLIST_CLEAR_SELECT,
    }
}


