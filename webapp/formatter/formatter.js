sap.ui.define([
    "sap/ui/core/library"
], function (coreLibrary) {
    "use strict";

    const { ValueState } = coreLibrary;

    const Formatter = {
        formatRange: function (iRange) {
            if (iRange < 500) {
                return ValueState.Default;
            } else if (iRange > 500 && iRange < 1000) {
                return ValueState.Information;
            } else {
                return ValueState.Warning;
            }
        },

        formatRangeIcon: function (iRange) {
            if (iRange < 500) {
                return "sap-icon://arrow-down";
            } else if (iRange > 500 && iRange < 1000) {
                return "sap-icon://co"
            } else {
                return "sap-icon://alert";
            }
        }

    };

    return Formatter;
});