$(document).ready(function () {
    departmentJS = new DepartmentJS();
    //departmentJS.loadData();
})
class DepartmentJS extends BaseJS {
    constructor() {
        // biến kiểm tra nút click cho sự kiện nào
        //var GetButton = 0;
        try {
            super();
            DepartmentJS.prototype.loadData();
            DepartmentJS.prototype.initEvents();
            $(".datepicker").datepicker($.datepicker.regional["vi"]);
        } catch (e) {
        }
    }
    btnAddOnClick() {
        super.btnAddOnClick();
        $("#txtDepartmentCode").focus();
        $('#txtDepartmentCode').keydown(function (event) { //event==Keyevent
            if (event.which == 13) {
                $('#txtCustomerName').focus();
            }
        });
        checkEnterKey();
    }
    showDialogDetail() {
        super.showDialogDetail();
        $("#txtDepartmentCode").attr("disabled", false);
    }
}