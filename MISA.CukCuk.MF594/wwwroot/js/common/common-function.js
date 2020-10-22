/** Chức năng kiểm tra email:
 * Author:LVHoang(14/09/2020)
 * 
 * */
function checkEmail() {
    var email = document.getElementById('txtEmail');
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(email.value)) {
        //alert('Hay nhap dia chi email hop le.\nExample@gmail.com');
        email.focus;
        return false;
    }
    else {
        return true;
    }
}
/** chức năng dữ liệu truyền vào và kiểm tra primary key:
 * Author:LVHoang (14/09/2020)
 * Edit by LVHoang (24/09/2020) -- kiểm tra nhập khoảng trắng
 * Finish by LVHoang (29/09/2020)-- tính năng tự động tìm kiếm các required ,kiểm tra giá trị của nó có bị trống,chỉ nhập space,trùng khóa hay không
 * nếu có thì bắt người dùng nhập lại:
 * Trong chức năng này việc trim dữ liệu được viết không dùng function jquery:
 * */
function checkDataAndPrimaryKey() {
    var inputRequired = $("[required]");
    var isVal = true;
    // kiểm tra null :
    // quay lại kiểm tra rằng buộc này: 
    var object = {};
    $.each(inputRequired, function (index, input) {
        var valid = $(input).trigger("blur");
        // lấy ra id của các thẻ input:
        var fieldId = $(input).attr('id');
        object[index] = fieldId;
        if (valid.hasClass("require-error")) {
            // nếu gặp 1 cái trống thì thoát luôn:
            isVal = false;
            alert('Hãy nhập đủ dữ liệu');
            return false;
        }
    });
    if (isVal) {
        // kiểm tra giá trị rỗng:
        var returned = true;
        $.each(object, function (index, input) {
            var id = object[index];
            var value = $('#' + id).val();
            if (myTrim(value) == "") {
                alert('Vui lòng nhập đủ dữ liệu');
                returned = false;
                return false;
            }
        })
        if (returned) {
            // không có hàng nào ngoại lệ:
            // kiểm tra trùng mã:
            //2.get data category:
            var ObjectID = null;
            // lấy id của đối tượng về:
            var fields = $('div#form-data input.input-text');
            var urlController = null;
            $.each(fields, function (index, field) {
                // lấy ra thuộc tính xác định khóa chính của bảng:
                var fieldKey = $(field).attr('accesskey');
                // lấy ra id của các thẻ input:
                var fieldId = $(field).attr('id');
                urlController = $(field).attr('url');
                //chèn dữ liệu vào object:
                if (fieldKey == "0") {
                    var valueInput = $("#" + fieldId + "").val();
                    // cắt giá khoảng trắng của hai đầu dữ liệu đưa vào:
                    ObjectID = myTrim(valueInput);
                }
            })
            $.ajax({
                url: '/' + urlController + '/validation/' + ObjectID,
                method: "get",
                data: "",// tham số truyền qua body request
                contenttype: "application/json",
                datatype: "json",
                async: false
            }).done(function (response) {
                if (!response) {
                    // không có customer trùng id:
                } else {
                    // có customer trùng id:
                    alert("Mã " + ObjectID + " đã tồn tại");
                    isVal = false;
                    return false;
                }
            }).fail({

            })
            if (isVal) {
                return true;
            } else {
                return false;
            }
        } else {
            // có một hàng input có giá trị null:
            return false;
        }
        
    } else {
        return false;
    }
}
/**
 * chức năng kiểm tra các dòng dữ liệu đã thêm đủ hay chưa:
 * Author:LVHoang (14/07/2020)
 * Edit by LVH (24/07/2020) -- thêm tính năng validation nhập khoản trắng:
 * Finish by LVHoang(29/09/2020) -- tính năng tự động tìm kiếm các required ,kiểm tra giá trị của nó có bị trống hay không:
 * Trong chức năng này việc trim dữ liệu được viết không dùng function jquery:
 * */
function checkData() {
    var inputRequired = $("[required]");
    var isVal = true;
    var object = {};
    var stringShow = '';
    // quay lại kiểm tra rằng buộc này: 
    $.each(inputRequired, function (index, input) {
        var valid = $(input).trigger("blur");
        // lấy ra id của các thẻ input:
        var fieldId = $(input).attr('id');
        object[index] = fieldId;
        if (valid.hasClass("required-error")) {
            // gán giá trị nhập là đã ko đủ
            var nameInput = $(input).attr('field');
            stringShow = stringShow + ' ' + nameInput;
            isVal = false;
        }
    })
    // bắt việc chỉ nhập dấu cách
    if (isVal) {
        // biến này đặt ra để xác định hàm đã trả về giá trị trước đó chưa:
        var returned = true;
        $.each(object, function (index, input) {
        // lấy ra id của các thẻ input:
            var id = object[index];
        // lấy ra value của các thẻ input:
            var value = $('#' + id).val();
            if (myTrim(value) == "") {
                var nameInput = $(input).attr('field');
                stringShow = stringShow + ' ' + nameInput;
                returned = false;
                return false;
            }
        })
        if (returned) {
            return true;
        } else {
            $('.dialog-warning div.text-question p').text('' + stringShow + ' không được bỏ trống');
            return false;
        }
    } else {
        $('.dialog-warning div.text-question p').text('' + stringShow + ' không được bỏ trống');
        return false;
    }

}

/**
 * Xử lý chuỗi ký tự cắt dấu cách ở hai đầu:
 * Author LVHoang(17/09/2020)
 * @param {string} Chuỗi ký tự 
 */
function myTrim(x) {
    return x.replace(/^\s+|\s+$/gm, '');
}
/**Chức năng xử lý ngày tháng theo chuẩn ISO:
 * Author:LVHoang (25/09/2020)
 * @param {any} inputDate
 */
function convertDateToISO(inputDate) {
    var a = inputDate.slice(0, 16);
    return a;
}
/** chức năng kiểm tra ký tự enter :
 *  Author LVHoang (17/09/2020)
 * */
function checkEnterKey() {
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

    // bắt sự kiện Ctrl + S
    // bắt sự kiện Ctrl + Shilf + S
    // bắt sự kiện Ctrl + Q
    // bắt sự kiện Esc

}

/** Hàm format tiền tệ Việt Nam:
 * Author:LVHoang (24/09/2020)
 * 
 * @param {any} number Money
 */
function formatCurrencyVietNam(number) {
    try {
        number = (number.toString()).replace(/[,VNĐ]/g, '');
        var n = number.split('').reverse().join("");
        var n2 = n.replace(/\d\d\d(?!$)/g, "$&.");
        return n2.split('').reverse().join('') + 'VNĐ';
    } catch (e) {
        return null;
    }
}
/**
 * Hàm format tiền tệ USA:
 * Author:LVHoang (28/09/2020)
 * @param {} num number money:
 */
function currencyFormatUS(num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}
/**
 * Hàm cắt datetime thành dạng ngày tháng năm:
 * Author:LVHoang (24/09/2020)
 * @param {any} datetime DateTime
 * */
function convertDateTime(datetime) {
    try {
        var day = datetime.slice(8, 10);
        var year = datetime.split('-')[0];
        var month = datetime.split('-')[1];
        var dayMonthYear = day + "/" + month + "/" + year;
        return dayMonthYear;
    } catch (e) {
        return null;
    }
}
/**
 * Hàm đưa Date dạng dd/mm/yyyy sang dạng datimeISO
 * Author:LVHoang (06/10/2020)
 * */
function convertDateToDatetimeISO(datetime) {
    //2020-10-06T02:14:52.697Z
    //2020-10-06T02:05:41.102Z
    var year = datetime.slice(6, 10);
    var day = datetime.split('/')[0];
    var month = datetime.split('/')[1];
    var dateTimeISO = year + "-" + month + "-" + day + 'T02:05:41';
    return dateTimeISO;
}
/**
 * Hàm đưa đưa ngày giờ về giờ Việt Nam:
 * Author:LVHoang (30/09/2020)
 * @param {any} datetime Datime ISO (ngày giờ bên mỹ)
 * */
function convertDateTimeVietNamese(datetime) {
    var stringDay = datetime.slice(8, 10);
    var stringYear = datetime.split('-')[0];
    var stringMonth = datetime.split('-')[1];
    var stringHour = datetime.slice(11, 13);
    var stringM = datetime.slice(14, 16);
    var intHour = parseInt(stringHour);
    var intDay = parseInt(stringDay);
    var intYear = parseInt(stringYear);
    var intMonth = parseInt(stringMonth);
    var intM = parseInt(stringM);
    intHour = intHour + 7;
    stringHour = intHour.toString();
    if (intHour > 24) {

        switch (intMonth) {
            case 1 :{
                // có 31 ngày:
                if (intDay == 31) {
                    // tăng ngày nên 1: tăng tháng nên 1, giảm giờ đi:
                    intDay = 1;
                    intMonth = intMonth + 1;
                    intHour = intHour - 24;
                    stringDay = intDay.toString();
                    stringMonth = intMonth.toString();
                    stringYear = intYear.toString();
                } else {
                    // tăng nên 1 ngày , giảm giờ đi :
                    intDay = intDay + 1;
                    intHour = intHour - 24;
                    stringDay = intDay.toString();
                    stringMonth = intMonth.toString();
                    stringYear = intYear.toString();
                }
                break;
            }
            case 3: {
                // có 31 ngày:
                if (intDay == 31) {
                    // tăng ngày nên 1: tăng tháng nên 1, giảm giờ đi:
                    intDay = 1;
                    intMonth = intMonth + 1;
                    intHour = intHour - 24;
                    stringDay = intDay.toString();
                    stringMonth = intMonth.toString();
                    stringYear = intYear.toString();
                } else {
                    // tăng nên 1 ngày , giảm giờ đi :
                    intDay = intDay + 1;
                    intHour = intHour - 24;
                    stringDay = intDay.toString();
                    stringMonth = intMonth.toString();
                    stringYear = intYear.toString();
                }
                break;
            }
            case 5: {
                // có 31 ngày:
                if (intDay == 31) {
                    // tăng ngày nên 1: tăng tháng nên 1, giảm giờ đi:
                    intDay = 1;
                    intMonth = intMonth + 1;
                    intHour = intHour - 24;
                    stringDay = intDay.toString();
                    stringMonth = intMonth.toString();
                    stringYear = intYear.toString();
                } else {
                    // tăng nên 1 ngày , giảm giờ đi :
                    intDay = intDay + 1;
                    intHour = intHour - 24;
                    stringDay = intDay.toString();
                    stringMonth = intMonth.toString();
                    stringYear = intYear.toString();
                }
                break;
            }
            case 7: {
                // có 31 ngày:
                if (intDay == 31) {
                    // tăng ngày nên 1: tăng tháng nên 1, giảm giờ đi:
                    intDay = 1;
                    intMonth = intMonth + 1;
                    intHour = intHour - 24;
                    stringDay = intDay.toString();
                    stringMonth = intMonth.toString();
                    stringYear = intYear.toString();
                } else {
                    // tăng nên 1 ngày , giảm giờ đi :
                    intDay = intDay + 1;
                    intHour = intHour - 24;
                    stringDay = intDay.toString();
                    stringMonth = intMonth.toString();
                    stringYear = intYear.toString();
                }
                break;
            }
            case 8: {
                // có 31 ngày:
                if (intDay == 31) {
                    // tăng ngày nên 1: tăng tháng nên 1, giảm giờ đi:
                    intDay = 1;
                    intMonth = intMonth + 1;
                    intHour = intHour - 24;
                    stringDay = intDay.toString();
                    stringMonth = intMonth.toString();
                    stringYear = intYear.toString();
                } else {
                    // tăng nên 1 ngày , giảm giờ đi :
                    intDay = intDay + 1;
                    intHour = intHour - 24;
                    stringDay = intDay.toString();
                    stringMonth = intMonth.toString();
                    stringYear = intYear.toString();
                }
                break;
            }
            case 10: {
                // có 31 ngày:
                if (intDay == 31) {
                    // tăng ngày nên 1: tăng tháng nên 1, giảm giờ đi:
                    intDay = 1;
                    intMonth = intMonth + 1;
                    intHour = intHour - 24;
                    stringDay = intDay.toString();
                    stringMonth = intMonth.toString();
                    stringYear = intYear.toString();
                } else {
                    // tăng nên 1 ngày , giảm giờ đi :
                    intDay = intDay + 1;
                    intHour = intHour - 24;
                    stringDay = intDay.toString();
                    stringMonth = intMonth.toString();
                    stringYear = intYear.toString();
                }
                break;
            }
            case 4: {
                // có 30 ngày:
                if (intDay == 30) {
                    // tăng ngày nên 1: tăng tháng nên 1, giảm giờ đi:
                    intDay = 1;
                    intMonth = intMonth+1;
                    intHour = intHour - 24;
                    stringDay = intDay.toString();
                    stringMonth = intMonth.toString();
                    stringYear = intYear.toString();
                } else {
                    // tăng nên 1 ngày , giảm giờ đi :
                    intDay = intDay + 1;
                    intHour = intHour - 24;
                    stringDay = intDay.toString();
                    stringMonth = intMonth.toString();
                    stringYear = intYear.toString();
                }
                break;
            }
            case 6: {
                // có 30 ngày:
                if (intDay == 30) {
                    // tăng ngày nên 1: tăng tháng nên 1, giảm giờ đi:
                    intDay = 1;
                    intMonth = intMonth + 1;
                    intHour = intHour - 24;
                    stringDay = intDay.toString();
                    stringMonth = intMonth.toString();
                    stringYear = intYear.toString();
                } else {
                    // tăng nên 1 ngày , giảm giờ đi :
                    intDay = intDay + 1;
                    intHour = intHour - 24;
                    stringDay = intDay.toString();
                    stringMonth = intMonth.toString();
                    stringYear = intYear.toString();
                }
                break;
            }
            case 9: {
                // có 30 ngày:
                if (intDay == 30) {
                    // tăng ngày nên 1: tăng tháng nên 1, giảm giờ đi:
                    intDay = 1;
                    intMonth = intMonth + 1;
                    intHour = intHour - 24;
                    stringDay = intDay.toString();
                    stringMonth = intMonth.toString();
                    stringYear = intYear.toString();
                } else {
                    // tăng nên 1 ngày , giảm giờ đi :
                    intDay = intDay + 1;
                    intHour = intHour - 24;
                    stringDay = intDay.toString();
                    stringMonth = intMonth.toString();
                    stringYear = intYear.toString();
                }
                break;
            }
            case 11: {
                // có 30 ngày:
                if (intDay == 30) {
                    // tăng ngày nên 1: tăng tháng nên 1, giảm giờ đi:
                    intDay = 1;
                    intMonth = intMonth + 1;
                    intHour = intHour - 24;
                    stringDay = intDay.toString();
                    stringMonth = intMonth.toString();
                    stringYear = intYear.toString();
                } else {
                    // tăng nên 1 ngày , giảm giờ đi :
                    intDay = intDay + 1;
                    intHour = intHour - 24;
                    stringDay = intDay.toString();
                    stringMonth = intMonth.toString();
                    stringYear = intYear.toString();
                }
                break;
            }
            case 2: {
                if (intYear % 4 == 0 && intYear % 100 != 0 || intYear % 400 == 0) {
                    if (intDay == 29) {
                        // tăng ngày nên 1: tăng tháng nên 1, giảm giờ đi:
                        intDay = 1;
                        intMonth = 3;
                        intHour = intHour - 24;
                        stringDay = intDay.toString();
                        stringMonth = intMonth.toString();
                        stringYear = intYear.toString();
                    } else {
                        // tăng nên 1 ngày , giảm giờ đi :
                        intDay = intDay + 1;
                        intHour = intHour - 24;
                        stringDay = intDay.toString();
                        stringMonth = intMonth.toString();
                        stringYear = intYear.toString();
                    }
                }
                else {
                    if (intDay == 28) {
                        // tăng ngày nên 1: tăng tháng nên 1, giảm giờ đi:
                        intDay = 1;
                        intMonth = 3;
                        intHour = intHour - 24;
                    } else {
                        // tăng nên 1 ngày , giảm giờ đi :
                        intDay = intDay + 1;
                        intHour = intHour - 24;
                    }
                }
                break;
            }
            case 12: {
                if (intDay == 31) {
                    // nếu là ngày 31 thì tăng tháng nên 1 , ngày quay về 1,năm tăng nên 1:
                    intDay = 1;
                    intMonth = 1;
                    intYear = intYear + 1;
                    intHour = intHour - 24;
                } else {
                    // tăng nên 1 ngày:
                    intDay = intDay + 1;
                    intHour = intHour - 24;
                }
            }
        }
    } else if (intHour < 10) {
        stringHour = '0' + intHour;
    }
    if (intDay<10) {
        stringDay = '0' + intDay;
    }
    if (intM < 10) {
        stringM = '0' + intM;
    }
    if (intMonth < 10) {
        stringMonth = '0' + intMonth;
    }
    // nối chuổi để tạo thành ,ngày giờ:
    var returnString = stringYear + '-' + stringMonth + '-' + stringDay + 'T' + stringHour + ':' + stringM;
    return returnString;
}

/**
 * Hàm kiểm tra độ dài màn hình nếu <1600 thì se xóa thẻ p
 * Author:LVHoang (2/10/2020)
 */
function deleteTagText() {
    var x = screen.width;
    if (x < 1610) {
        $('.alert-box-edit p').empty();
        $('.alert-box-add p').empty();
        $('.alert-box-delete p').empty();
    }
}
/**
 * Hàm đưa ra định dạng số điện thoại ra view
 * Author: LVHoang (09/10/2020)
 * @param phone : Số điện thoại.
 * */
function fomartNumberPhone(phone) {

    //var returnValue = phone.toString().substr(0, 3) + ' ' + phone.toString().substr(3, 3) + ' ' + phone.toString().substr(6, 3);
    try {
        if (phone.length > 0) {
            if (phone.length == 10) {
                //phone = phone.match(new RegExp('.{1,3}', 'g')).join(" ");
                phone = phone.toString().substr(0, 3) + ' ' + phone.toString().substr(3, 4) + ' ' + phone.toString().substr(7, 3);
            } else {
                phone = phone.match(new RegExp('.{1,3}', 'g')).join(" ");
            }
        }
        return phone;
    } catch (e) {
        return null;
    }
}
/**
 * Hàm đưa ra định dạng số ra view 
 * Author: LVHoang (09/10/2020)
 * */
function fomartNumber(number) {
    try {
        number = number.match(new RegExp('.{1,3}', 'g')).join(" ");
    } catch (e) {

    } finally {
        return number;
    }
}
/**
 * Hàm lấy ra mã employeeCode tiếp theo
 * Author LVHOANG(19/10/2020)
 * */
function getEmployeeCodeLast(code) {
    // NV0098360
    var length = code.length;
    var abc = code.slice(0, 2);
    var stringNumber = code.slice(2, 9);
    var number = parseInt(stringNumber);
    number = number + 1;
    var string = number.toString();
    var n = stringNumber.length - string.length;
    if (n > 0) {
        var o = '0';
    }
    for (var i = 0; i < n-1; i++) {
        o = o + '0';
    }
    var ouput = 'NV'+o+number;
    return ouput;
}