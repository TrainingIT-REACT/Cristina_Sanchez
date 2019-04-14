import React, {Component} from 'react';
import {Card, Image, Button, Divider} from 'semantic-ui-react';
import TrackList from './trackList';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';

class PlayList extends  Component {

    componentDidMount() {
        this.props.onFetchPlaylists();
    }

    render() {
        const {playLists, activePlaylist, tracksOfActivePlaylist, onSelectPlaylist, backToListOfPlaylist} = this.props;
        return (
            <div>
                {
                    activePlaylist && tracksOfActivePlaylist ?
                        (
                            <div>
                                <Button.Group>
                                    <Button floated='left' icon='left chevron' content='Back' onClick={backToListOfPlaylist}/>
                                </Button.Group>
                                <Divider />
                                <TrackList tracks={tracksOfActivePlaylist}/>
                            </div>
                        )
                        :
                        (
                            <Card.Group centered>
                                {
                                    playLists.map((playlist, key) => {
                                        return (
                                            <Card key={key} color='teal' onClick={() => {
                                                onSelectPlaylist(playlist)
                                            }}>
                                                <Image src={playlist.images[0].url}/>
                                                <Card.Content>
                                                    <Card.Header>
                                                        {playlist.name}
                                                    </Card.Header>
                                                    <Card.Meta>
                                                        <span>{playlist.tracks.total} track{playlist.tracks.total > 1 ? 's' : ''}</span>
                                                        <span className='date'>created by {playlist.owner.display_name}</span>
                                                    </Card.Meta>
                                                </Card.Content>
                                            </Card>
                                        )
                                    })
                                }
                            </Card.Group>
                        )
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    const {playLists, activePlaylist, tracksOfActivePlaylist} = state.playList;
    return {
        playLists,
        activePlaylist,
        tracksOfActivePlaylist,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchPlaylists: bindActionCreators(actions.onFetchPlaylists, dispatch),
        onSelectPlaylist: bindActionCreators(actions.onSelectPlaylist, dispatch),
        backToListOfPlaylist: bindActionCreators(actions.onBackToListOfPlaylist, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlayList);