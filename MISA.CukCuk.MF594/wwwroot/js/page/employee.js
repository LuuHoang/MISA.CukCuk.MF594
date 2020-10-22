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
    initEvents() {
        super.initEvents();
        this.checkEnterKey.bind(this);
    }
    btnAddOnClick() {
        super.btnAddOnClick();
        this.loadEmployeeCode();
        this.loadDataInputPossitionName();
        this.loadDataInputDepartmentName();
        this.loadDataSelectWorkStatus();
        $("#txtEmployeeCode").focus();
        this.checkEnterKey();
    }
    btnEditOnClick() {
        this.loadDataInputPossitionName();
        this.loadDataInputDepartmentName();
        this.loadDataSelectWorkStatus();
        super.btnEditOnClick();
        this.checkEnterKey();
    }
    btnDuplicateOnClick() {
        this.btnEditOnClick();
        super.btnDuplicateOnClick();
        this.loadEmployeeCode();
    }
    btnSaveOnClick() {
        super.btnSaveOnClick();
    }
    btnSaveAndAddOnClick() {
        super.btnSaveAndAddOnClick();
        $('.dialog input').val(null);
        this.loadEmployeeCode();
        this.loadDataInputPossitionName();
        this.loadDataInputDepartmentName();
        this.loadDataSelectWorkStatus();
        $("#txtEmployeeCode").focus();
        this.checkEnterKey();
    }
    showDialogDetail() {
        super.showDialogDetail();
        $("#txtCustomerCode").attr("disabled", false);
    }
    hideDialogDetail() {
        super.hideDialogDetail();
    }
    /** chức năng kiểm tra ký tự enter :
     *  Author LVHoang (17/09/2020)
     * */
    //#region Chức năng kiểm tra ký nhập ký tự từ bàn phím
    checkEnterKey() {
        var self = this;
        $('#txtEmployeeCode').keydown(function (event) { //event==Keyevent
            if (event.which == 13) {
                $('#txtEmployeeName').focus();
            } else if (event.which == 40) {
                $('#txtEmployeeName').focus();
            }
        });
        $('#txtEmployeeName').keydown(function (event) { //event==Keyevent
            if (event.which == 13) {
                $('#txtDateOfBirth').focus();
            } else if (event.which == 40) {
                $('#txtDateOfBirth').focus();
            } else if (event.which == 38) {
                $('#txtEmployeeCode').focus();
            }
        });
        $('#txtDateOfBirth').keydown(function (event) { //event==Keyevent
            if (event.which == 13) {
                $('#txtGender').focus();
            } else if (event.which == 40) {
                $('#txtGender').focus();
            } else if (event.which == 38) {
                $('#txtEmployeeName').focus();
            }
        });
        $('#txtGender').keydown(function (event) { //event==Keyevent
            if (event.which == 13) {
                $('#txtEmail').focus();
            } else if (event.which == 40) {
                $('#txtEmail').focus();
            } else if (event.which == 38) {
                $('#txtEmployeeName').focus();
            }
        });
        $('#txtEmail').keydown(function (event) { //event==Keyevent
            if (event.which == 13) {
                $('#txtPhoneNumber').focus();
            } else if (event.which == 40) {
                $('#txtPhoneNumber').focus();
            } else if (event.which == 38) {
                $('#txtDateOfBirth').focus();
            }
        });
        $('#txtPhoneNumber').keydown(function (event) { //event==Keyevent
            if (event.which == 13) {
                $('#txtIdentityNumber').focus();
            } else if (event.which == 40) {
                $('#txtIdentityNumber').focus();
            } else if (event.which == 38) {
                $('#txtEmail').focus();
            }
        });
        $('#txtIdentityNumber').keydown(function (event) { //event==Keyevent
            if (event.which == 13) {
                $('#txtIdentityDate').focus();
            } else if (event.which == 40) {
                $('#txtIdentityDate').focus();
            } else if (event.which == 38) {
                $('#txtPhoneNumber').focus();
            }
        });
        $('#txtIdentityDate').keydown(function (event) { //event==Keyevent
            if (event.which == 13) {
                $('#txtIdentityPlace').focus();
            } else if (event.which == 40) {
                $('#txtIdentityPlace').focus();
            } else if (event.which == 38) {
                $('#txtPhoneNumber').focus();
            }
        });
        $('#txtIdentityPlace').keydown(function (event) { //event==Keyevent
            if (event.which == 13) {
                $('#txtPossitionName').focus();
            } else if (event.which == 40) {
                $('#txtPossitionName').focus();
            } else if (event.which == 38) {
                $('#txtIdentityNumber').focus();
            }
        });
        $('#txtPossitionName').keydown(function (event) { //event==Keyevent
            if (event.which == 13) {
                $('#txtDepartmentName').focus();
            } else if (event.which == 40) {
                $('#txtDepartmentName').focus();
            } else if (event.which == 38) {
                $('#txtIdentityPlace').focus();
            }
        });
        $('#txtDepartmentName').keydown(function (event) { //event==Keyevent
            if (event.which == 13) {
                $('#txtTaxCode').focus();
            } else if (event.which == 38) {
                $('#txtPossionName').focus();
            }
        });
        $('#txtTaxCode').keydown(function (event) { //event==Keyevent
            if (event.which == 13) {
                $('#txtSalary').focus();
            } else if (event.which == 40) {
                $('#txtJoinDate').focus();
            } else if (event.which == 38) {
                $('#txtDepartmentName').focus();
            }
        });
        $('#txtSalary').keydown(function (event) { //event==Keyevent
            if (event.which == 13) {
                $('#txtJoinDate').focus();
            } else if (event.which == 40) {
                $('#txtJoinDate').focus();
            } else if (event.which == 38) {
                $('#txtDepartmentName').focus();
            }
        });
        $('#txtJoinDate').keydown(function (event) { //event==Keyevent
            if (event.which == 13) {
                $('#txtWorkStatus').focus();
            } else if (event.which == 40) {
                $('#txtWorkStatus').focus();
            } else if (event.which == 38) {
                $('#txtTaxCode').focus();
            }
        });
        $('#txtWorkStatus').keydown(function (event) { //event==Keyevent
            if (event.which == 38) {
                $('#txtSalary').focus();
            }
        });

        var checkCtrl = false;
        var checkShilf = false;
        // bắt sự kiện Ctrl + Shilf + S
        $('.dialog-body input ,select').keydown(function (e) {
            if (e.keyCode == '17') {
                checkCtrl = true;
            }
        }).keyup(function (ev) {
            if (ev.keyCode == '17') {
                checkCtrl = false;
            }
        }).keydown(function (evt) {
            if (evt.keyCode == '16') {
                checkShilf = true;
            }
        }).keyup(function (evn) {
            if (evn.keyCode == '16') {
                checkShilf = false;
            }
        }).keydown(function (event) {
            if (checkCtrl && checkShilf) {
                if (event.keyCode == '83') {
                    self.btnSaveAndAddOnClick();
                    checkCtrl = false;
                }
            }
        })
        // bắt sự kiện Ctrl + S
        $('.dialog-body input ,select').keydown(function (e) {
            if (e.keyCode == '17') {
                checkCtrl = true;
            }
        }).keyup(function (ev) {
            if (ev.keyCode == '17') {
                checkCtrl = false;
            }
        }).keydown(function (event) {
            if (checkCtrl && !checkShilf) {
                if (event.keyCode == '83') {
                    self.btnSaveOnClick();
                    checkCtrl = false;
                }
            }
        })

        // bắt sự kiện Ctrl + Q
        $('.dialog-body input ,select').keydown(function (e) {
            if (e.keyCode == '17') {
                checkCtrl = true;
            }
        }).keyup(function (ev) {
            if (ev.keyCode == '17') {
                checkCtrl = false;
            }
        }).keydown(function (event) {
            if (checkCtrl) {
                if (event.keyCode == '81') {
                    self.hideDialogDetail();
                    checkCtrl = false;
                }
            }
        })
        // bắt sự kiện Esc
        $('.dialog-body input ,select').keyup(function (e) {
            if (e.keyCode == '27') {
                self.hideDialogDetail();
            }
        })

    }
    //#endregion
    /**
     * Chức năng load ra tên chức vụ lên Select
     * Author:LVHOANG(20/10/2020)
     * */
    loadDataInputPossitionName() {
        try {
            var fields = $('.dialog .dialog-body select#txtPossitionName');
            $.ajax({
                url: '/possitions',
                method: "GET",
                data: "",// Tham số truyền qua body request
                contentType: "application/json",
                dataType: ""
            }).done(function (response) {
                // xóa dữ liệu cũ khỏi table :
                $('select#txtPossitionName').empty();
                // load dữ liệu nên tbody :
                $.each(response, function (index, item) {
                    $.each(fields, function (index, field) {
                        var fieldName = 'possitionName';
                        var value = item[fieldName];
                        var option = $(`<option value="` + item['possitionId'] + `">` + value + `</option>`);
                        $(option).data('possitionId', item['possitionId']);
                        $('select#txtPossitionName').append(option);
                    })
                    // lấy tên khóa chính của bảng và ẩn khóa chính đi.
                    //var primaryKey = $('table#tbListData thead tr').attr('accesskey');

                    //$('select#txtPossionName').append(option);
                });
            }).fail(function (response) {

            })
        } catch (e) {
        }
        finally {

        }
    }
    /**
    * Chức năng load ra tên phòng ban lên Select
    * Author:LVHOANG(20/10/2020)
    * */
    loadDataInputDepartmentName() {
        try {
            var fields = $('.dialog .dialog-body select#txtDepartmentName');
            $.ajax({
                url: '/departments',
                method: "GET",
                data: "",// Tham số truyền qua body request
                contentType: "application/json",
                dataType: ""
            }).done(function (response) {
                // xóa dữ liệu cũ khỏi table :
                $('select#txtDepartmentName').empty();
                // load dữ liệu nên tbody :
                $.each(response, function (index, item) {
                    $.each(fields, function (index, field) {
                        var fieldName = 'departmentName';
                        var value = item[fieldName];
                        var option = $(`<option value="` + item['departmentId'] + `">` + value + `</option>`);
                        $(option).data('departmentId', item['departmentId']);
                        $('select#txtDepartmentName').append(option);
                    })
                    // lấy tên khóa chính của bảng và ẩn khóa chính đi.
                    //var primaryKey = $('table#tbListData thead tr').attr('accesskey');

                    //$('select#txtPossionName').append(option);
                });
            }).fail(function (response) {

            })
        } catch (e) {
        }
        finally {

        }
    }
    /**
    * Chức năng load ra trạng thái công việc lên Select
    * Author:LVHOANG(20/10/2020)
    * */
    loadDataSelectWorkStatus() {
        try {
            var fields = $('.dialog .dialog-body select#txtWorkStatus');
            $.ajax({
                url: '/employees/workstatus',
                method: "GET",
                data: "",// Tham số truyền qua body request
                contentType: "application/json",
                dataType: ""
            }).done(function (response) {
                // xóa dữ liệu cũ khỏi table :
                $('select#txtWorkStatus').empty();
                // load dữ liệu nên tbody :
                $.each(response, function (index, item) {
                    $.each(fields, function (index, field) {
                        var fieldName = 'workStatusName';
                        var value = item[fieldName];
                        var option = $(`<option value="` + item['workStatus'] + `">` + value + `</option>`);
                        $(option).data('workStatus', item['workStatus']);
                        $('select#txtWorkStatus').append(option);
                    })
                    // lấy tên khóa chính của bảng và ẩn khóa chính đi.
                    //var primaryKey = $('table#tbListData thead tr').attr('accesskey');

                    //$('select#txtPossionName').append(option);
                });
            }).fail(function (response) {

            })
        } catch (e) {
        }
        finally {

        }
    }
    /**
    * Chức năng thêm Mã Nhân viên tự tăng
    * Author:LVHOANG(20/10/2020)
    * */
    loadEmployeeCode() {
        try {
            $.ajax({
                url: '/employees/getMaxEmployeeCode',
                method: "GET",
                data: "",// Tham số truyền qua body request
                contentType: "application/json",
                dataType: ""
            }).done(function (object) {
                // lâý ra EmployeeCode tiếp tục:
                $("#txtEmployeeCode").val(getEmployeeCodeLast(object[0]['employeeCode']));
            }).fail(function (response) {

            })
        } catch (e) {
        }
        finally {

        }
    }
}
