import * as actionTypes from '../constants/actionTypes';

const initialState = {
    playLists: [],
    activePlaylist: null,
    tracksOfActivePlaylist: []
}

export default function (state = initialState, action) {
    switch (action.type) {
        case actionTypes.PLAYLIST_SET:
            return setPlaylists(state, action);
        case actionTypes.FEATURED_PLAYLIST_SELECT:
            return setActiveFeaturedPlaylists(state, action);
        case actionTypes.FEATURED_PLAYLIST_CLEAR_SELECT:
            return setClearActiveFeaturedPlaylists(state, action);
        default:
            return state;
    }
}

function setPlaylists(state, action) {
    const {playLists} = action;
    return { ...state, playLists }
}

function setActiveFeaturedPlaylists(state, action) {
    const {activePlaylist, tracksOfActivePlaylist} = action;
    return { ...state, activePlaylist, tracksOfActivePlaylist }
}

function setClearActiveFeaturedPlaylists(state, action) {
    return { ...state, activePlaylist: null }
}
