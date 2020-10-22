$(document).ready(function () {
    categoryJS = new CategoryJS();
    //categoryJS.loadData();

})
class CategoryJS extends BaseJS {
    constructor() {
        // biến kiểm tra nút click cho sự kiện nào
        //var GetButton = 0;

        try {
            super();
            CategoryJS.prototype.loadData();
            CategoryJS.prototype.initEvents();
            $(".datepicker").datepicker($.datepicker.regional["vi"]);
            
        } catch (e) {

        }
    }
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
    
}