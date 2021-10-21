import React from "react";
import PropTypes from "prop-types";
import { dataService } from "../../services/DataService";

export default class TransactionSubmitModal extends React.Component {

    onClose = e => {
        this.props.onClose && this.props.onClose(e);
    };

    render() {
        console.log(this.props, 'pp')
        //PROD_LOG
        dataService.setModalData(true)
        if (!this.props.show) {
            return null;
        }
        return (
            <div className="modal4" id="modal">
                {/* <div className="modal-top"> */}
                <div className="toggle-button" onClick={this.onClose}>
                    <i class="far fa-times-circle"></i>

                </div>
                <div class="mg-t-107">
                    <i class="fas fa-hourglass-half glasshr"></i>

                </div>
                <div class="mt-40">
                    Transaction submitted.
                </div>
                {/* </div> */}
                <div className="content"> {this.props.children} </div>
                <div className="actions">
                </div>
            </div>
        );
    }
}

TransactionSubmitModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
};