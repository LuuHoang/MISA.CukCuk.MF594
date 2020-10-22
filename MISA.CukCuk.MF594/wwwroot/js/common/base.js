$(document).ready(function () {
    baseJS = new BaseJS();
    //baseJS.loadData();

})
class BaseJS {
    constructor() {
        // biến kiểm tra nút click cho sự kiện nào
        var GetButton = 0; // 1 là bấm vào nút thêm ,2 là bấm vào nút sửa
        var isChooseRow = true;
        var buttonSaveAndAdd = 0;
        try {
            //this.loadData();
            //this.initEvents();
            deleteTagText();
            //this.checkPrimaryKey();
        } catch (e) {

        }
        finally {
            // viết câu lệnh dù làm được hay thất bại thì vẫn chạy lệnh đấy như closeDatabase...
        }
    }
    //#region LoadData và Khai báo sự kiện
    /**
     * Load dữ liệu lên bảng
     * Author:LVHoang (26/09/2020)
     * Edit:LVHoang (28/09/2020)
     * */
    loadData() {
        // GET data server call service:
        try {
             //#region Lấy số trang và số lượng     :
            var amount = parseInt($('select[name=sum-number-pages] option').filter(':selected').val());
            var numberpage = parseInt($('input.number-pages').val());
            var index = amount * numberpage - amount;
            //#endregion
            var fields = $('table#tbListData thead th');
            var getUrlController = $("#tbListData thead tr").attr('url');
            $.ajax({
                url: '/' + getUrlController + '/' + index + '/' + amount,
                method: "GET",
                data: "",// Tham số truyền qua body request
                contentType: "application/json",
                dataType: ""
            }).done(function (response) {
                // xóa dữ liệu cũ khỏi table :
                $('.main-table tbody').empty();
                // load dữ liệu nên tbody :
                $.each(response, function (index, item) {
                    var tr = $(`<tr></tr>`);
                    $.each(fields, function (index, field) {
                        var fieldName = $(field).attr('fieldName');
                        var value = item[fieldName];
                        var format = $(field).attr('format');
                        if (format == 'date') {
                            var td = $(`<td style="text-align:center" title="` + value + `">` + convertDateTime(value) + `</td>`);
                        } else if (format == 'money') {
                            var td = $(`<td style="text-align:right" title="` + formatCurrencyVietNam(value) + `">` + formatCurrencyVietNam(value) + `</td>`);
                        } else if (format == 'phoneNumber') {
                            var td = $(`<td style="text-align:center" title="` + value + `">` + fomartNumberPhone(value) + `</td>`);
                        } else if (format == 'datepicker') {
                            var td = $(`<td style="text-align:center" title="` + convertDateTime(value) + `">` + convertDateTime(value) + `</td>`);
                        } else if (format=='number') {
                            var td = $(`<td title="` + fomartNumber(value) + `">` + fomartNumber(value) + `</td>`);
                        }else {
                            var td = $(`<td title="` + value + `">` + value + `</td>`);
                        }
                        $(tr).append(td);
                    })
                    // lấy tên khóa chính của bảng và ẩn khóa chính đi.
                    var primaryKey = $('table#tbListData thead tr').attr('accesskey');
                    $(tr).data(primaryKey, item[primaryKey]);
                    
                    $('#tbListData tbody').append(tr);
                });
            }).fail(function (response) {

            })
        } catch (e) {
        }
        finally {
            // viết câu lệnh dù làm được hay thất bại thì vẫn chạy lệnh đấy như closeDatabase...
        }


    }
    /**Khởi tạo sự kiện cho file javascript này
    * Author:LVHoang(14/09/2020)
    * */
    initEvents() {
        // khai báo sự kiện cho các button
        $('#btnAdd').click(this.btnAddOnClick.bind(this));
        $('#btnSaveAndAdd').click(this.btnSaveAndAddOnClick.bind(this));
        $('#btnDuplicate').click(this.btnDuplicateOnClick.bind(this));
        $('#btnEdit').click(this.btnEditOnClick.bind(this));
        $('#btnRemove').click(this.btnRemoveOnClick.bind(this));
        // khai báo sự kiện cho các button trong dialog
        $('#btnCancel').click(this.btnCancelOnClick.bind(this));
        $('#btnSave').click(this.btnSaveOnClick.bind(this));
        //khai báo sự kiện nhấn vào nút export :
        $('#btnExport').click(this.exportDataTable);
        $('.title-close-button').click(this.btnCancelOnClick.bind(this));
        // khai báo sự kiện cho các button trong dialog confirm delete
        $('#btnOpenDialogDelete').click(this.openDialogConfirmDelete.bind(this));
        $('#btnDeleteCancel').click(this.btnCancelDialogConfirmDelete.bind(this));
        $('.icon-close').click(this.btnCancelDialogConfirmDelete.bind(this));
        // khai báo sự kiện cho các button trong dialog warning
        $('#btnOpenDialogWarning').click(this.openDialogWarning.bind(this));
        $('#btnAgree').click(this.btnCancelDialogWarning.bind(this));
        $('.icon-close-warning').click(this.btnCancelDialogWarning.bind(this));
        //  khai báo sự kiện check required.
        $("input[required]").blur(this.checkRequired);
        $("table").on("click", "tbody tr", this.rowOnClick);
        // khai báo sự kiện click trên icon-bar
        $('.menu').on("click", ".logo", this.hideSideBar);
        $('.header-left').on("click", ".icon-bar", this.showSideBar);
        // sự kiện cho các button phân trang
        $('#btnFirstPage').click(this.btnFirstPageOnClick.bind(this));
        $('#btnPreviousPage').click(this.btnPreviousPageOnClick.bind(this));
        $('#btnNextPage').click(this.btnNextPageOnClick.bind(this));
        $('#btnLastPage').click(this.btnLastPageOnClick.bind(this));
        $("select.show-number").change(this.btnSelectChange.bind(this));
    }
    //#endregion
    //#region Chức năng phím bấm trên Trang
    /**Chức năng show dialog khi click vào button thêm để nhập dữ liệu,
     * các ngày giờ trong thẻ input được có giá trị là ngày giờ Việt Nam hiện tại:
     * Author:LVHoang:(14/09/2020)
     * 
     * */
    btnAddOnClick() {
        this.GetButton = 1;
        this.showDialogDetail();
        // Dạng Datime-local : xét ngày giờ hiện tại là mặc định :
        var fields = $('div#form-data input.input-text');
        $.each(fields, function (index, field) {
            var fieldType = $(field).attr('type');
            //trường hợp trong Dialog có the input dạng datime-local:
            if (fieldType == 'datetime-local') {
                // lấy ra id của the input đấy:
                var fieldId = $(field).attr('id');
                var date = new Date();
                var dateformatISO = date.toISOString();
                $("#" + fieldId).val(convertDateTimeVietNamese(dateformatISO));
            }
            // nếu còn trường hợp nào muốn giá trị mặc định vào nữa thì ghi trong này:
        });
        // Dạng DatePicker : xét ngày giờ hiện tại là mặc định :
        var datepicker = $('div#form-data input.datepicker');
        $.each(datepicker, function (index, field) {
            //trường hợp trong Dialog có the input dạng datime-picker:
            // lấy ra id của the input đấy:
            var fieldId = $(field).attr('id');
            var date = new Date();
            var dateformatISO = date.toISOString();
            $("#" + fieldId).val(convertDateTime(dateformatISO));
            // nếu còn trường hợp nào muốn giá trị mặc định vào nữa thì ghi trong này:
        });
    }
    /**
     * Chức năng show dữ liệu lên dialog khi click vào button Edit
     * Author:LVHoang(14/09/2020)
     * */
    btnEditOnClick() {
        try {
            var self = this;
            this.GetButton = 2;
            // get selected data in tbody
            //1.confirm Selected Object
            var trSelected = $("#tbListData tbody tr.row-selected");
            var fields = $('table#tbListData thead th');
            var namePrimaryKey = $("#tbListData thead tr").attr('accesskey');
            //get ObjectID
            var ObjectID = $(trSelected).data(namePrimaryKey);
            var getUrlController = $("#tbListData thead tr").attr('url');
            //TODO: code chỗ này chưa clean vì hàm kiểm tra id lặp lại 2 lần .
            // trường hợp đã chọn hàng dữ liệu:
            if (ObjectID) {
                //show dialog 
                self.showDialogDetail();
                //2.get data category
                $.ajax({
                    url: '/' + getUrlController + '/' + ObjectID,
                    method: "get",
                    data: "",// tham số truyền qua body request
                    contenttype: "application/json",
                    datatype: "json"
                }).done(function (object) {
                    if (!object) {
                        alert("không có nhân viên với mã tương ứng");
                    } else {
                        //đã hoàn thành nốt phần hiển thị dữ liệu nên dialog bằng lớp base:
                        var fields = $('div#form-data input.input-text');
                        $.each(fields, function (index, field) {
                            // chỗ này ,postman trả về kết quả là chữ đầu không in nên trong html nên đặt không in:
                            var fieldName = $(field).attr('fieldName');
                            var fieldId = $(field).attr('id');
                            var fieldType = $(field).attr('type');
                            var fieldKey = $(field).attr('accesskey');
                            if (fieldType == 'datetime-local') {
                                $("#" + fieldId + "").val(convertDateToISO(object[fieldName]));
                            } else if (fieldKey == '0') {
                                $("#" + fieldId + "").val(object[fieldName]);
                                // chỉ có thể đọc không thể sửa:
                                $("#" + fieldId + "").attr("disabled", true);
                            } else if (fieldKey == '1') {
                                $("#" + fieldId + "").val(object[fieldName]);
                                // focus vào thẻ input tiếp theo:
                                $("#" + fieldId + "").focus();
                            } else {
                                $("#" + fieldId + "").val(object[fieldName]);
                            }
                        });
                        //Gửi dữ liệu lên form dạng datetimepicker:
                        var datepicker = $('div#form-data input.datepicker');
                        $.each(datepicker, function (index, field) {
                            var fieldName = $(field).attr('fieldName');
                            var fieldId = $(field).attr('id');
                            var fieldType = $(field).attr('type');
                            $("#" + fieldId + "").val(convertDateTime(object[fieldName]));

                        });
                        // gửi dữ liệu nên select
                        var fieldSelects = $('div#form-data select');
                        $.each(fieldSelects, function (index, select) {
                            var fieldName = $(select).attr('fieldName');
                            var field = $(select).attr('field');
                            var fieldId = $(select).attr('id');
                            //$('div#form-data select#txtDepartmentName option[value=' + object[fieldName]+']').attr("selected", true);
                            $('div#form-data select#' + fieldId+' option[value=' + object[fieldName]+']').attr("selected", true);
                        });
                        //TODO: chỗ này code chưa clean .. Hỏi anh mạnh xem chỗ này nên cất khóa chính vào vị trí nào ?
                        // Gửi khóa chính nên  dialog
                        var key = $('table#tbListData thead tr').attr('accesskey');
                        $('.content .dialog').data(key, ObjectID);
                        checkEnterKey();
                    }
                }).fail({

                })
            } else {
                alert("Vui lòng chọn nhân viên muôn sửa");
            }
        } catch (e) {
            // đưa ra thông tin lỗi:
        }
        finally {
            // viết câu lệnh dù làm được hay thất bại thì vẫn chạy lệnh đấy như closeDatabase...
        }
    }
    /**
     * Chức năng xóa dòng dữ liệu khi click button xóa
     * Author:LVHoang(14/09/2020)
     * */
    btnRemoveOnClick() {
        // Get ID Student:
        var self = this;
        try {
            // get selected data in tbody
            //1.confirm Selected Object
            var ObjectID = null;
            // lấy ra hàng được chọn
            var trSelecteds = $("#tbListData tbody tr.row-selected");
            // lấy ra tên của Khóa chính
            var namePrimaryKey = $("#tbListData thead tr").attr('accesskey');
            // lấy ra khóa chính của hàng được chọn 
            var fields = $('table#tbListData thead th');
           
            var getUrlController = $("#tbListData thead tr").attr('url');
            $.each(trSelecteds, function (index, trSelected) {
                ObjectID = $(trSelected).data(namePrimaryKey);
                // Call API Service Delete Data
                $.ajax({
                    url: '/' + getUrlController + '/' + ObjectID,
                    method: "DELETE",
                    async: false
                }).done(function (res) {
                    
                }).fail(function () {

                })
            })
            //load lại data:
            self.loadData();
            // ẩn đi Dialog:
            self.hideDialogConfirmDelete();
            // thông báo thành công:
            $('.alert-box-delete').show();
            setTimeout(function () {
                $('.alert-box-delete').hide();
            }, 3000);
        } catch (e) {
            alert("Vui lòng chọn sinh viên muốn xóa");
        }
        finally {
            // viết câu lệnh dù làm được hay thất bại thì vẫn chạy lệnh đấy như closeDatabase...
        }
    }
    /**
     * Chức năng xuất dữ liệu ra file excel .
     * Author: LVHoang 09/10/2020
     */
    exportDataTable() {
        $('table').tblToExcel();
    }
    /**
     * Chức năng kiểm tra dòng được click và đặt dòng đấy là đã được chọn:
     * Author:LVHoang (14/09/2020)
     * @param {any} sender
     */
    rowOnClick(sender) {
        this.classList.add("row-selected");
        if (event.ctrlKey) {
            
        } else {
            $(this).siblings().removeClass("row-selected");
        }
    }
    /**
     * Chức năng lưu dữ liệu ,và hiển thị dialog 
     * Author:  LVHOANG (20/10/2020)
     * */
    btnSaveAndAddOnClick() {
        this.buttonSaveAndAdd = 1;
        this.btnSaveOnClick();
    }
    /**Chức năng nhân bản
     * Author : LVHOANG (21/10/2020)
     * */
    btnDuplicateOnClick() {
        this.GetButton = 1;
    }
    /**
     * Chức năng lưu dữ liệu ,khi thêm mới cũng như sửa lại
     * Author:LVHoang (14/09/2020)
     * Edit by:LVHoang (24/09/2020)
     * */
    btnSaveOnClick() {
        // validate data inputs
        var self = this;
        //var isCheckMail = checkEmail();
        try {
            //TODO: Cần làm phần kiểm tra những ô input chưa nhập vào rồi hiển thị lên dialog Warning
            //#region Chức năng xử lý việc thêm mới 
            if (this.GetButton == 1) {
                var isValid = checkData();
                // kiểm tra tính hợp lệ của dữ liệu đưa vào:
                // kiểm tra trong dialog có email không ?  :
                var isEmail = false;
                var fields = $('table#tbListData thead tr th'); 
                $.each(fields, function (index, field) {
                    var format = $(field).attr('format');
                    if (format == "email") {
                        isEmail = true;
                    }
                })
                // kiểm tra xem có email trong form nhập không :
                if (isEmail && isValid) {
                    // có email :
                    var isCheckMail = checkEmail();
                    if (isValid && isCheckMail) {
                        this.insertData();
                    }
                } else if (isValid) {
                    // không có email:
                    this.insertData();
                } else {
                    self.showDialogWarning();
                }
                //#endregion 
                //#region Chức năng xử lý việc sửa  
            } else if (this.GetButton == 2) {
                var isValid = checkData();
                // kiểm tra tính hợp lệ của dữ liệu đưa vào:
                // kiểm tra trong dialog có email không ?  :
                var isEmail = false;
                var fields = $('table#tbListData thead tr th');
                $.each(fields, function (index, field) {
                    var format = $(field).attr('format');
                    if (format == "email") {
                        isEmail = true;
                    }
                })
                // kiểm tra xem có email trong form nhập không :
                if (isEmail && isValid) {
                    // có email :
                    var isCheckMail = checkEmail();
                    if (isValid && isCheckMail) {
                        this.updateData();
                    }
                } else if (isValid) {
                    // không có email:
                    this.updateData();
                } else {
                    self.showDialogWarning();
                }
            }
            //#endregion 
        } catch (e) {

        } finally {
            // viết câu lệnh dù làm được hay thất bại thì vẫn chạy lệnh đấy như closeDatabase...

        }
    }
    /**
     * Lưu dữ liệu vào database
     * Author:LVHoang
     * Created:14/09/2020
     * */
    insertData() {
        var self = this;
        //#region Kiểm tra Mã nhân viên:
        // false là chưa có mã nào trùng
        var isCheckCode = false;
        var getUrlController = '/employees/checkEmployeeByCode/' + $("#txtEmployeeCode").val();
        $.ajax({
            url: getUrlController,
            method: "GET",
            data: '',// Tham số truyền qua body request
            contentType: "application/json",
            async: false
        }).done(function (response) {
            if (response) {
                isCheckCode = true;
            }
        }).fail(function (response) {

        })
        //#endregion
        if (!isCheckCode) {
            var object = {};
            this.dataCollection(object);
            var getUrlController = $("#tbListData thead tr").attr('url');
            // Save  database
            $.ajax({
                url: '/' + getUrlController,
                method: "POST",
                data: JSON.stringify(object),// Tham số truyền qua body request
                contentType: "application/json"
                //async: false
            }).done(function (response) {
                self.loadData();
                // hiển thị ra thông báo thành công:
                $('.alert-box-add').show();
                setTimeout(function () {
                    $('.alert-box-add').hide();
                }, 3000);
                //close connect database...
            }).fail(function (response) {
                //alert("fail ajax");
                self.hideDialogDetail();
            })
            // kiểm tra là click và button cất hay cất và thêm
            if (self.buttonSaveAndAdd == 1) {

            } else {
                self.hideDialogDetail();
            }
        } else {
            // trường hợp trùng mã:
            self.showDialogWarning();
            $('.dialog-warning div.text-question p').text('Mã nhân viên trùng với Mã nhân viên ABC');
        }
    }
    /**
     * Sửa chửa dữ liệu trong database:
     * Author:LVHoang(15/09/2020)
     * */
    updateData() {
        var self = this;
        var object = {};
        var getUrlController = $("#tbListData thead tr").attr('url');
        var trSelected = $("#tbListData tbody tr.row-selected");
        var namePrimaryKey = $("#tbListData thead tr").attr('accesskey');
        //get ObjectID
        var ObjectID = $(trSelected).data(namePrimaryKey);
        object[namePrimaryKey] = ObjectID;
        this.dataCollection(object);
        // Save data
        $.ajax({
            url: '/' + getUrlController,
            method: "PUT",
            data: JSON.stringify(object),
            contentType: "application/json",
            dataType: "json"
            //async: false
        }).done(function (res) {
            //debugger
            self.loadData();
            $('.alert-box-edit').show();
            setTimeout(function () {
                $('.alert-box-edit').hide();
            }, 3000);
        }).fail(function (res) {
            
        })
        if (self.buttonSaveAndAdd == 1) {

        } else {
            self.hideDialogDetail();
        }
    }
    /**
     * Chức năng thu thập data từ dialog
     * @param {any} object
     * Author:LVHoang(15/09/2020)
     */
    dataCollection(object) {
        //Thu nhap Data dạng các thẻ input:
        //var fields = $('div#form-data input.input-text');
        var fields = $('div#form-data input.input-text');
        $.each(fields, function (index, field) {
            // lấy tên thuộc tính của lớp , cũng như lấy ra id của các thẻ input:
            var fieldName = $(field).attr('fieldName');
            var fieldId = $(field).attr('id');
            var format = $(field).attr('type');
            //chèn dữ liệu vào object:
            var valueInput = $("#" + fieldId + "").val();
            if (format == 'number') {
                object[fieldName] = parseFloat(myTrim(valueInput));
            } else {
                object[fieldName] = myTrim(valueInput);
            }
        })
        //Thu nhap Data dạng datepicker :
        var datepicker = $('div#form-data input.datepicker');
        $.each(datepicker, function (index, field) {
            // lấy tên thuộc tính của lớp , cũng như lấy ra id của các thẻ input:
            var fieldName = $(field).attr('fieldName');
            var fieldId = $(field).attr('id');
            var datepicker = $("#" + fieldId + "").val();
            //chèn dữ liệu vào object:
            object[fieldName] = convertDateToDatetimeISO(datepicker);
        })
        // thu thập Data dạng select
        var fieldsSelect = $('div#form-data select');
        $.each(fieldsSelect, function (index, fieldSelect) {
            // lấy tên thuộc tính của lớp , cũng như lấy ra id của các thẻ input:
            var fieldName = $(fieldSelect).attr('fieldName');
            var fieldId = $(fieldSelect).attr('id');
            var format = $(fieldSelect).attr('type');
            //chèn dữ liệu vào object:
            var valueInput = $("#" + fieldId + "").val();
            if (format == 'int') {
                object[fieldName] = parseInt(myTrim(valueInput));
            } else {
                object[fieldName] = myTrim(valueInput);
            }
        })
        return object;
    }
    /**
     * Chức năng click và nút hủy,nút x trên header-dialog
     * Author:LVHoang (14/09/2020)
     * */
    btnCancelOnClick() {
        this.hideDialogDetail();
    }
    //#endregion
    //#region Các chức năng hiển thị Dilog Cảnh báo,...
    /**
     * Chức năng khi click chọn và click xóa , hiển thị lên dialog xác nhận có xóa không?
     * Author: LVHoang (1/10/2020)
     * 
     * */
    openDialogConfirmDelete() {
        // kiểm tra đã chọn đối tượng nào chưa ?
        //TODO: chỗ này cần xem lại nên đặt enum cho các thông báo đưa ra
        try {
            var ObjectID =[];
            var trSelecteds = $("#tbListData tr.row-selected");
            var namePrimaryKey = $("#tbListData thead tr").attr('accesskey');
            $.each(trSelecteds, function (index, trSelected) {
                ObjectID[index] = $(trSelected).data(namePrimaryKey);
            })
            if (ObjectID.length == 1) {
                // hiển thị dialog xóa 1 phần tử
                var name =$("#tbListData tr.row-selected").children()[1].textContent;
                $('.dialog-confirm-delete .text-question p').text('Bạn có chắc muốn xóa Nhân viên <<'+ name +'>> không ?');
                this.showDialogConfirmDelete();
            } else if (ObjectID.length == 0) {
                alert("Vui lòng chọn đối tượng muốn xóa");
            } else if (ObjectID.length > 1) {
                // hiển thị dialog xóa nhiều phần tử
                $('.dialog-confirm-delete .text-question p').html('Bạn có chắc muốn xóa những Nhân viên đã chọn không ?');
                this.showDialogConfirmDelete();
            }
        } catch (e) {
            // in ra thông báo:
        }
        finally {

        }
    }
    /** 
     *  Chức năng hủy sự việc xóa ?
     *  Author :LVHoang (1/10/2020)
     * */
    btnCancelDialogConfirmDelete() {
        this.hideDialogConfirmDelete();
    }
    btnCancelDialogWarning() {
        this.hideDialogWarning();
    }
    /**Chức năng hiển thị ra dialog,và bỏ focus:
     * Author:LVHoang (14/09/2020)
     * */
    showDialogDetail() {
        $('.dialog input').val(null);
        $('.dialog-modal').show();
        $('.dialog').show();

    }
    /**
     * chức năng ẩn dialog 
     * Create By LVHoang(14/09/2020)
     * */
    hideDialogDetail() {
        this.buttonSaveAndAdd = 0;
        $('.dialog-modal').hide();
        $('.dialog').hide();
        //studentJS.FrmDialog.dialog('close');
    }
    /**Chức năng hiển thị ra dialog confirm delete
     * Author:LVHoang (14/09/2020)
     * */
    showDialogConfirmDelete() {
        $('.dialog-modal').show();
        $('.dialog-confirm-delete').show();
    }
    /**Chức năng hiển thị ra dialog confirm delete
    * Author:LVHoang (14/09/2020)
    * */
    showDialogWarning() {
        $('.dialog-modal').show();
        $('.dialog-warning').show();
    }
    /**
     * chức năng ẩn dialog confirm delete
     * Author: LVHoang(14/09/2020)
     * */
    hideDialogConfirmDelete() {
        $('.dialog-modal').hide();
        $('.dialog-confirm-delete').hide();
    }
    /**
     * chức năng ẩn dialog confirm warning
     * Author: LVHoang(14/09/2020)
     * */
    hideDialogWarning() {
        $('.dialog-modal').hide();
        $('.dialog-warning').hide();
    }
    /**
    * Chức năng khi thực hiện nút cất kiểm tra và đưa ra các 
    * thông tin còn thiếu.
    * Author: LVHoang (1/10/2020)
    * */
    openDialogWarning() {
        this.showDialogWarning();
    }
    //#endregion
    /**
     * Chức năng ẩn đi sidebar khi click vào logo CUKCUK:
     * Author:LVHoang(03/10/2020)
     * */
    hideSideBar() {
        // ẩn menu :
        $('.menu').hide("slow");
        // xét chiều rộng của content là 100%:
        $('.content').width("100%");
        $('.content').css('margin-left', 0);
        // hiển thị icon-bar thứ 2:
        $('.header-left .icon-bar').show("slow");
    }
    /**
     * Chức năng hiển thị lại menu khi click vào side-bar
     * Author:LVHoang(03/10/2020)
     * */
    showSideBar() {
        // ẩn đi icon-bả thứ 2 đi:
        $('.header-left .icon-bar').hide("slow");
        // vào element xóa đi thuộc tính width:
        var x = screen.width;
        $('.content').width(x - 202);
        // cho margin-left bằng 200:
        $('.content').css('margin-left', 200);
        $('.menu').show("slow");
    }
    /**
     * Kiểm tra các dữ liệu còn trống trong form input và báo lỗi nếu chưa đủ
     * Author:LVHoang(14/07/2020)
     * */
    checkRequired() {
        var value = this.value;
        if (!value || !(value && value.trim())) {
            $(this).addClass('required-error');
            $(this).attr("title", "Bạn phải nhập thông tin này");
        } else {
            $(this).removeClass('required-error');
            $(this).removeAttr("title");
        }
    }
    //#region Chức năng phân trang
    btnFirstPageOnClick() {
        //alert($('select[name=sum-number-pages] option').filter(':selected').val());
        var numberpage = parseInt(1);
        $('input.number-pages').val(1);
        this.loadData();
    }
    btnPreviousPageOnClick() {
        var numberpage = parseInt($('input.number-pages').val()) - 1;
        if (numberpage > 1) {
            $('input.number-pages').val(numberpage);
        } else {
            $('input.number-pages').val(1);
        }
        this.loadData();
    }
    btnNextPageOnClick() {
        //alert($('select[name=sum-number-pages] option').filter(':selected').val());
        var numberpage = parseInt($('input.number-pages').val())+1;
        $('input.number-pages').val(numberpage);
        this.loadData();
    }
    btnLastPageOnClick() {
        alert('Tính năng chưa được viết');
    }
    btnSelectChange() {
        this.loadData();
    }
    //#endregion
    add() {
    }
    edit() {
    }
    delete() {
    }
}