import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
const Alert = ({ alerts }) => {
    return (
        alerts !== null &&
        alerts.length > 0 &&
        alerts.map((alert) => {
            return (
                <div
                    key={alert.id}
                    className={`alert alert-${alert.alertType}`}
                >
                    {alert.msg}
                </div>
            );
        })
    );
};
const mapStateToProps = (state) => {
    return { alerts: state.alerts };
};

Alert.propTypes = {
    alerts: PropTypes.array.isRequired,
};

export default connect(mapStateToProps)(Alert);
