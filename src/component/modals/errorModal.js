import React from "react";
import PropTypes from "prop-types";
import { dataService } from "../../services/DataService";

export default class ErrorModal extends React.Component {
    
    onClose = e => {
        this.props.onClose && this.props.onClose(e);
    };

    render() {
        console.log(this.props, 'Prop')
        dataService.setModalData(true)
        if (!this.props.show) {
            return null;
        }
        return (
            <div className="modal2" id="modal">
                <div className="modal-top">
                    <div className="toggle-button" onClick={this.onClose}>
                        x
                    </div>
                </div>
                <div className="content">{this.props.children}</div>
                <div className="actions">
                </div>
            </div>
        );
    }
}

ErrorModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
};