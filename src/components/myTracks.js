import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../actions';
import React, { Component }  from 'react';
import TrackList from './trackList';
import { Header, Icon } from 'semantic-ui-react';

class MyTracks extends Component {

    componentDidMount() {
        this.props.onFetchMyTracks();
    }

    render() {
        const {tracks } = this.props;
        return (
            <div>
                {tracks && tracks.length > 0 ?
                    (
                        <TrackList tracks={tracks}/>
                    )
                    :
                    (
                        <Header as='h3' disabled>
                            <Icon name='frown' />
                            <Header.Content>
                                No has guardado ningunca canción en Spotify
                                <Header.Subheader>
                                    Puedes encontrar más canciones en el menu de Listas Recomendadas
                                </Header.Subheader>
                            </Header.Content>
                        </Header>
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  const {tracks} = state.track
  return {
      tracks
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchMyTracks: bindActionCreators(actions.fetchMyTracks, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyTracks);