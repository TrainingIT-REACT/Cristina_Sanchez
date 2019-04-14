import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Button, Card, Divider, Image} from 'semantic-ui-react';
import TrackList from './trackList';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../actions';

class Browse extends Component {

    componentDidMount() {
        ReactDOM.findDOMNode(this).scrollTop = 0;
        this.props.onFetchFeaturedPlaylists();
    }

    render() {
        const {featuredPlaylists, activePlaylist, tracksOfActivePlaylist, onSelectPlaylist, backToListOfPlaylist} = this.props
        return (
            <div>
                {
                    activePlaylist && tracksOfActivePlaylist ?
                        (
                            <div>
                                <Button.Group>
                                    <Button floated='left' icon='left chevron' content='Back'
                                            onClick={backToListOfPlaylist}/>
                                </Button.Group>
                                <Divider/>
                                <TrackList tracks={tracksOfActivePlaylist}/>
                            </div>
                        )
                        :
                        (
                            <Card.Group centered>
                                {
                                    featuredPlaylists.map((playlist, key) => {
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
                                                        <span
                                                            className='date'>created by {playlist.owner.display_name}</span>
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
    const {featuredPlaylists, activePlaylist, tracksOfActivePlaylist} = state.browse;
    return {
        featuredPlaylists,
        activePlaylist,
        tracksOfActivePlaylist,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchFeaturedPlaylists: bindActionCreators(actions.onFetchFeaturedPlaylists, dispatch),
        onSelectPlaylist: bindActionCreators(actions.onSelectPlaylist, dispatch),
        backToListOfPlaylist: bindActionCreators(actions.onBackToListOfPlaylist, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Browse);