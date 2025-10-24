sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "../formatter/formatter",
], (Controller, Formatter) => {
    "use strict";
    return Controller.extend("zammunition.controller.List", {
        formatter: Formatter,
        onInit() {
        }
    });
});