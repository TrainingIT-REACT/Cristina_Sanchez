
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import * as actions from '../actions'
import React, { Component }  from 'react';
import {List, Button, Image, Label} from 'semantic-ui-react';
import './styles/TrackList.css';

class TrackList extends Component {

    render() {
        const {tracks = [], onPlay, onSetTrack} = this.props;
        return (
            <div>
                <List animated verticalAlign='top' celled ordered>
                    {
                        tracks.map((track, key) => {
                            return (
                                <List.Item key={key}>
                                    <Image avatar src={track.track.album.images[0].url}/>

                                    <List.Content>
                                        <List.Header className="track-name">{track.track.name}</List.Header>
                                        {track.track.artists[0].name}
                                    </List.Content>

                                    <List.Content floated='right'>
                                        {
                                            !track.track.preview_url ?
                                                <Label basic size="mini" color='red' pointing='right'>Canción no disponible</Label> : null
                                        }
                                        <Button circular icon='play' content='Play' onClick={
                                            () => {
                                                onPlay(track)
                                                onSetTrack(tracks)
                                            }
                                        } disabled={!track.track.preview_url}/>
                                    </List.Content>
                                </List.Item>
                            )
                        })
                    }
                </List>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return {
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPlay: bindActionCreators(actions.playTrack, dispatch),
    onSetTrack: bindActionCreators(actions.setTracks, dispatch),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TrackList);