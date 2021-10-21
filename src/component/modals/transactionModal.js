import React from "react";
import PropTypes from "prop-types";
import { dataService } from "../../services/DataService";

export default class TransactionModal extends React.Component {
    onClose = e => {
        console.log(e, 'error')
        this.props.onClose && this.props.onClose(e);
    };

    render() {
        // this.props.ref2.current.style.background = "#0c162180"
        console.log(this.props, 'props')
        //DEBUG_LOG
        dataService.setModalData(true)
        if (!this.props.show) {
            return null;
        }
        return (
            <div className="modal3" id="modal">

                <div className="container1" >
                    <div className={this.props.type == "Success" ? 'col-green one' : this.props.type == "Failure" ? 'col-red one' : ''}>

                    </div>
                    <div className="content2 two row ">
                        <div className="col-1">
                            {this.props.type == "Success" ?
                                <i class="fas fa-check-circle success-fa"></i> : this.props.type == "Failure" ? <i class="fas fa-times-circle fail-fa"></i> : null}
                        </div>

                        <div className=" col-auto txt-left word-break mrgs-tr">
                            {this.props.children}

                        </div>
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