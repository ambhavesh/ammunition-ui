sap.ui.define([
    "zammunition/controller/App.controller",
    "zammunition/formatter/formatter",
    "sap/m/MessageBox"
], (BaseController, Formatter, MessageBox) => {
    "use strict";
    return BaseController.extend("zammunition.controller.List", {
        formatter: Formatter,

        onInit() {
            this.getModel("ui").setProperty("/editEnabled", false);
        },

        onSelectionChange: function (oEvent) {
            const mParams = oEvent.getParameters();
            const bSelected = mParams.selected;
            const aSelectedItems = mParams.listItems;
            oEvent.getSource().getSelectedItems().length > 0 ?
                this.getModel("ui").setProperty("/editEnabled", true) :
                this.getModel("ui").setProperty("/editEnabled", false);

            aSelectedItems.forEach(item => {
                item.getCells().forEach(cell => {
                    if (cell.getBindingInfo("value") && cell.getBindingInfo("value").binding.getPath() === "Cost") {
                        cell.setEnabled(bSelected);

                        if (!bSelected) {
                            const oContext = item.getBindingContext();
                            if (oContext) {
                                const oModel = oContext.getModel();
                                const sPath = oContext.getPath();
                                oModel.resetChanges([sPath]);
                            }
                        }
                    }
                });
            });
        },

        onUpdateWeightPress: async function () {
            sap.ui.core.BusyIndicator.show(0);
            await this._updateWeaponWeight().then(() => {
                sap.ui.core.BusyIndicator.hide();
                MessageBox.success("Weapon weight updated successfully", { title: "Success" });
                const oWeaponTable = this.byId("weaponsTable");
                oWeaponTable.removeSelections(true);
                oWeaponTable.getSelectedItems().length > 0 ?
                    this.getModel("ui").setProperty("/editEnabled", true) :
                    this.getModel("ui").setProperty("/editEnabled", false);

                oWeaponTable.getItems().forEach(item => {
                    item.getCells().forEach(cell => {
                        const oBindInfo = cell.getBindingInfo("value");
                        if (oBindInfo && oBindInfo.binding.getPath() === "Cost") {
                            cell.setEnabled(false);
                        }
                    });
                });
            });
        },

        _updateWeaponWeight: function () {
            return new Promise((resolve, reject) => {
                const aSelectedItems = this.byId("weaponsTable").getSelectedItems();
                aSelectedItems.forEach(item => {
                    const oContext = item.getBindingContext();
                    const oData = oContext.getObject();
                    // const oPayload = { "Cost": oData.Cost };
                    oContext.getModel().update(oContext.getPath(), oData, {
                        success: resolve,
                        error: reject
                    });
                });
            });
        }
    });
});