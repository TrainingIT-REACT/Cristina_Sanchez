import * as actionTypes from '../constants/actionTypes'
import * as actions from "./index";

function setMyTracks(tracks) {
    return {
        type: actionTypes.TRACKS_SET,
        tracks,
    }
}

// async action
export function fetchMyTracks() {

    function fetchMyTracksData(spotifyApi) {
        return function (dispatch) {
            dispatch(actions.callRequest());
            // set active saved tracks
            spotifyApi.getMySavedTracks()
                .then(function (data) {
                    dispatch(setMyTracks(data.body.items));
                    dispatch(actions.receiveResponse())
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
        dispatch(fetchMyTracksData(window.spotifyApi));
    }
}

export function setTracks(tracks) {
    return {
        type: actionTypes.TRACKS_SET,
        tracks,
    }
}

export function playTrack(track) {
    return {
        type: actionTypes.TRACK_PLAY,
        track,
    }
}

export function nextTrack(track) {
    return {
        type: actionTypes.TRACK_NEXT,
        track,
    }
}

export function prevTrack(track) {
    return {
        type: actionTypes.TRACK_PREV,
        track,
    }
}

