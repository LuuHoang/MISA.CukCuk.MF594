$(document).ready(function () {
    customerJS = new CustomerJS();
    $(".datepicker").datepicker($.datepicker.regional["vi"]);
})
class CustomerJS extends BaseJS {
    constructor() {
        try {
            super();
            CustomerJS.prototype.loadData();
            CustomerJS.prototype.initEvents();
            //$(".datepicker").datepicker($.datepicker.regional["vi"]);
        } catch (e) {

        }
    }
    //
    btnAddOnClick() {
        super.btnAddOnClick();
        $("#txtCustomerCode").focus();
        $('#txtCustomerCode').keydown(function (event) { //event==Keyevent
            if (event.which == 13) {
                $('#txtCustomerName').focus();
            }
        });
        checkEnterKey();
    }
    showDialogDetail() {
        super.showDialogDetail();
        $("#txtCustomerCode").attr("disabled", false);
    }
    //TODO: inport data Excel to C# .
    
}