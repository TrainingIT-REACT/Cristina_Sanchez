import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Container, Dimmer, Loader} from 'semantic-ui-react';

const Menubar = React.lazy(() => import ('./menubar'));
const Intro = React.lazy(() => import ('./intro'));
const Browse = React.lazy(() => import ('./browse'));
const MyTracks = React.lazy(() => import ('./myTracks'));
const Player = React.lazy(() => import ('./player'));
const ErrorModal = React.lazy(() => import ('./errorModal'));
const PlayList = React.lazy(() => import ('./playList'));

class App extends Component {

    componentDidUpdate(prevProps, prevState) {
        window.scrollTo(0, 0);
    }

    render() {
        const {activeMenu, isFetching, errors} = this.props
        return (
            <React.Suspense fallback="Cargando ...">
                <div>
                    <Menubar/>

                    <Container className="main-container" style={{marginBottom: '170px', marginTop: '70px'}}>

                        {
                            (() => {
                                switch (activeMenu) {
                                    case 'browse':
                                        return <Browse/>;
                                    case 'myTracks':
                                        return <MyTracks/>;
                                    case 'playLists':
                                        return <PlayList/>;
                                    default:
                                        return <Intro/>
                                }
                            })()
                        }

                        {isFetching ?
                            <Dimmer active inverted><Loader inverted size='large'>Loading</Loader></Dimmer> : null}
                        {(errors.length > 0) ? <ErrorModal errors={errors}/> : null}
                    </Container>

                    <Player/>
                </div>
            </React.Suspense>

        )
    }
}

const mapStateToProps = (state) => {
    const {activeMenu} = state.menu;
    const {isFetching} = state.api;
    const errors = state.errors;
    return {
        activeMenu,
        isFetching,
        errors,
    }
}

export default connect(mapStateToProps)(App);