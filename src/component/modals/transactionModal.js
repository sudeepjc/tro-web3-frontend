import React from "react";
import PropTypes from "prop-types";
import { dataService } from "../../services/DataService";

export default class TransactionModal extends React.Component {
    onClose = e => {
        console.log(e, 'eee')
        this.props.onClose && this.props.onClose(e);
    };

    render() {
        // this.props.ref2.current.style.background = "#0c162180"
        console.log(this.props, 'pp')
        //DEBUG_LOG
        dataService.setModalData(true)
        if (!this.props.show) {
            return null;
        }
        return (
            <div className="modal3" id="modal">
                <div className="modal-top">
                    <div className="toggle-button" onClick={this.onClose}>
                        x
                    </div>
                </div>
                <div className="content2 row">
                    {/* <div className="col-2">
                        <i class="fa fa-check-circle-o font-s-fa col-success" aria-hidden="true" ></i>
                        <i class="fa fa-plus-circle font-s-cross  col-fail" aria-hidden="true"></i>
                        <i class="fa fa-spinner font-s-fa  col-pending" aria-hidden="true"></i>

                    </div> */}
                    <div className="col-10 txt-left">
                        {this.props.children}

                    </div>
                </div>
                <div className="actions">
                </div>
            </div>
        );
    }
}
TransactionModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
};