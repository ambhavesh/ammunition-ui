sap.ui.define([
  "sap/ui/core/mvc/Controller"
], (BaseController) => {
  "use strict";

  return BaseController.extend("zammunition.controller.App", {
    onInit() {
    },

    getModel: function (sName) {
      return !sName ? this.getOwnerComponent().getModel() : this.getOwnerComponent().getModel(sName)
    }
  });
});