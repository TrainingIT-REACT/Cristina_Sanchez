import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../actions';
import React, {Component} from 'react';
import {SCOPES, STATE} from '../constants/auth';
import {Button, Dropdown, Icon, Image, Input, Label, Menu, Segment} from 'semantic-ui-react';

class Menubar extends Component {

    constructor(props) {
        super(props);
        const {token, onAuth} = props;
        if (token) {
            window.spotifyApi.setAccessToken(token);
            onAuth();
        }
    }

    openAuthWindow(onAuth) {
        let authorizeUrl = window.spotifyApi.createAuthorizeURL(SCOPES, STATE, true);
        authorizeUrl = authorizeUrl.replace(/response_type=code/gi, 'response_type=token');

        window.onAuth = onAuth;
        this.popupCenter(authorizeUrl, 'Reactify - Spotify authorization', 400, 600);
    }

    popupCenter(url, title, w, h) {
        const dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
        const dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;

        const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
        const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

        const left = ((width / 2) - (w / 2)) + dualScreenLeft;
        const top = ((height / 2) - (h / 2)) + dualScreenTop;
        const newWindow = window.open(url, title, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

        // Puts focus on the newWindow
        if (window.focus) {
            newWindow.focus();
        }

        return newWindow;
    }


    isLoggedIn(user) {
        return !!user;
    }

    renderUser(user, onLogout) {
        const userDropdownTrigger = (
            <span><Icon name="spotify"/>{user.display_name}</span>
        )
        const profileImage = (
            <Image avatar src={user.images[0].url}/>
        )
        return (
            <Dropdown trigger={userDropdownTrigger} button className='teal'>
                <Dropdown.Menu>
                    <Dropdown.Item key="user"
                                   disabled><span>Logado como <strong>{user.display_name}</strong></span></Dropdown.Item>
                    <Dropdown.Item key="profileImage" image={profileImage} className="avatar"/>
                    <Dropdown.Divider/>
                    <Dropdown.Item key="logout" onClick={onLogout}><Label color='red'><Icon
                        name="sign out"/> Logout</Label></Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        )
    }

    render() {
        const {song, activeMenu, user, onAuth, onLogout, onSwitchMenu} = this.props;
        return (
            <Segment inverted>
                <Menu inverted pointing secondary>
                <Menu.Item header>
                    <Icon name="music" size="big"/> Reactify
                </Menu.Item>

                <Menu.Item name="Mis Playlist" icon="headphone"
                           disabled={!this.isLoggedIn(user)}
                           active={activeMenu === "playLists"}
                           onClick={() => onSwitchMenu('playLists')}/>

                <Menu.Item name="Mis canciones" icon="like"
                           disabled={!this.isLoggedIn(user)}
                           active={activeMenu === "myTracks"}
                           onClick={() => onSwitchMenu('myTracks')}/>

                <Menu.Item name="Listas Recomendadas" icon="music"
                           disabled={!this.isLoggedIn(user)}
                           active={activeMenu === "browse"}
                           onClick={() => onSwitchMenu('browse')}/>
                <Menu.Menu position='right'>
                    <Menu.Item>
                        <Input icon='search' name='search' placeholder='Encuentra tu canción' onChange={(e) => {
                            this.setState({song: e.target.value})
                        }}
                               value={song}/>
                    </Menu.Item>
                    <Menu.Item name="user" active={false} borderless="true">
                        {
                            user ?
                                this.renderUser(user, onLogout)
                                :
                                <Button onClick={() => {
                                    this.openAuthWindow(onAuth)
                                }} type="button">
                                    <Icon name="spotify"/>Login
                                </Button>
                        }
                    </Menu.Item>
                </Menu.Menu>
            </Menu>
            </Segment>
        )
    }
}

const mapStateToProps = (state) => {
    const {activeMenu, user, token} = state.menu;
    return {
        user,
        token,
        activeMenu,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onAuth: bindActionCreators(actions.auth, dispatch),
        onLogout: bindActionCreators(actions.logout, dispatch),
        onSwitchMenu: bindActionCreators(actions.switchMenu, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Menubar);