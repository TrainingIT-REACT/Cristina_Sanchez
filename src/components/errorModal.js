import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {Button, Header, Icon, Modal} from 'semantic-ui-react';

class ErrorModal extends Component {

    render() {
        const {errors, onCloseErrorModal} = this.props;
        return (
            <Modal open={true} basic size='small'>
                <Header icon='meh' content="Algo va mal"/>
                <Modal.Content>
                    {
                        errors.map((error, key) => {
                            return (
                                <p key={key}>{error.message}</p>
                            )
                        })
                    }
                </Modal.Content>
                <Modal.Actions>
                    <Button color='green' inverted onClick={onCloseErrorModal}>
                        <Icon name='checkmark'/> Ok
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        onCloseErrorModal: bindActionCreators(actions.onCloseModalError, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorModal);