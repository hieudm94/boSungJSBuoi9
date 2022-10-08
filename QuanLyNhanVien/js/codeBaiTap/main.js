var dsnv = new DanhSachNhanVien();
var validation = new Validation();


// Hàm rút gọn
function getELE(id) {
    return document.getElementById(id);
}

function setLocalStorage(){
    localStorage.setItem("DSNV", JSON.stringify(dsnv.mangNV))
}

function getlocalStorage() {
    if (localStorage.getItem("DSNV") != undefined) {
        dsnv.mangNV = JSON.parse(localStorage.getItem("DSNV"));

    }

    hienThiDS(dsnv.mangNV);
}

getlocalStorage();

function themNhanVien() {
    var taiKhoan = getELE("tknv").value;
    var hoVaTen = getELE("name").value;
    var email = getELE("email").value;
    var password = getELE("password").value;
    var ngayLam = getELE("datepicker").value;
    var luongCoBan = getELE("luongCB").value;
    var chucVu = getELE("chucvu").value;
    var gioLam = getELE("gioLam").value;
    
    var isValid = true;
    // Tên tài khoảng
    isValid &= validation.checkEmpty(taiKhoan,"tbTKNV","Tài khoản không được để trống") && validation.checkUserNV(taiKhoan,"tbTKNV","Tài khoản chỉ nhập từ 4-6 ký tự") && validation.checkTrung(taiKhoan,"tbTKNV","Đã có tài khoản tồn tại",dsnv.mangNV);

    // Tên nhân viên
    isValid &= validation.checkEmpty(hoVaTen,"tbTen","Tên không được để trống") && validation.checkTenNV(hoVaTen,"tbTen","Tên nhân viên phải là chữ");

    // Email
    isValid &= validation.checkEmpty(email,"tbEmail","Email không được để trống") && validation.checkEmail(email,"tbEmail","Email không đúng định dạng");

    // PassWord
    isValid &= validation.checkEmpty(password,"tbMatKhau","Mật khẩu không được để trống") && validation.checkPassWord(password,"tbMatKhau","Mật khẩu cần ít nhất 1 chữ hoa, 1 chữ thường, 1 số, 1 ký tự đặc biệt, độ dài từ 6-10 ký tự");


    // Ngày đi làm
    isValid &= validation.checkEmpty(ngayLam,"tbNgay","Ngày làm không được để trống")&&  validation.checkDate(ngayLam,"tbNgay","Ngày làm không đúng định dạng");

    // Lương cơ bản
    isValid &= validation.checkEmpty(luongCoBan,"tbLuongCB","Lương cơ bản không được để trống") && validation.checkSalary(luongCoBan,"tbLuongCB","Lương cơ bản kkhông hợp lệ")

    // Dropdown
    isValid &= validation.checkDropDown("chucvu", "tbChucVu", "Chức vụ chưa được chọn");

    // Giờ đi làm
    isValid &= validation.checkEmpty(gioLam,"tbGiolam","Giờ làm không được để trống") && validation.checkTimeWork(gioLam,"tbGiolam","Giờ làm không hợp lệ")



    if(isValid){
       

    var nv = new NhanVien(taiKhoan, hoVaTen, email, password, ngayLam, Number(luongCoBan), chucVu, Number(gioLam));

    // Lương
    nv.tinhTongLuong();

    // Chức vụ
    
    //  Loại Nhân viên
    nv.xepLoaiNhanVien();

    // Thêm nhân viên vào mangNV
    dsnv.themNV(nv);

    // gọi hàm hiển thị
    hienThiDS(dsnv.mangNV);

    setLocalStorage();
    resetForm();
    }
    

}


function hienThiDS(mangNV) {
    var content = "";  // giá trị ban đầu

    mangNV.map(function (nv) {

        var trELE = `
            <tr>
                <td>${nv.taiKhoan}</td>
                <td>${nv.hoVaTen}</td>
                <td>${nv.email}</td>
                <td>${nv.ngayLam}</td>
                <td>${nv.xemChucVu}</td>
                <td>${nv.tongLuong}</td>
                <td>${nv.loaiNV}</td>
                <td>
                    <button class=" btn btn-info" data-toggle="modal" data-target="#myModal" 
                    onclick =  "xemChiTiet('${nv.taiKhoan}')">Xem</button>
                    <button class=" btn btn-danger" onclick = "xoaNhanVien('${nv.taiKhoan}')" >Xóa</button>

                </td>
            </tr>
        `;

        console.log(trELE);
        content += trELE;
    });
    getELE("tableDanhSach").innerHTML = content;

}

// Xóa nhân viên

function xoaNhanVien(taikhoan){
    dsnv.xoaNV(taikhoan);
    hienThiDS(dsnv.mangNV);
    setLocalStorage(dsnv.mangNV);
}

// Xem chi tiết

function xemChiTiet(taiKhoan){
    var viTri = dsnv.timViTri(taiKhoan);
    if(viTri > -1){
        var nvTim = dsnv.mangNV[viTri];
        getELE("tknv").value = nvTim.taiKhoan;
        getELE("tknv").disabled = true;
        getELE("name").value = nvTim.hoVaTen;
        getELE("email").value = nvTim.email;
        getELE("password").value = nvTim.password;
        getELE("datepicker").value = nvTim.ngayLam;
        getELE("luongCB").value = nvTim.luongCoBan;
        getELE("chucvu").value = nvTim.chucVu;
        getELE("gioLam").value = nvTim.gioLam;
    }
    var spanThongBao = document.getElementsByClassName("sp-thongbao");
    for(var i of spanThongBao){
        i.innerHTML= "";
    }
}

function capNhatNhanVien(){
    var taiKhoan = getELE("tknv").value;
    var hoVaTen = getELE("name").value;
    var email = getELE("email").value;
    var password = getELE("password").value;
    var ngayLam = getELE("datepicker").value;
    var luongCoBan = getELE("luongCB").value;
    var chucVu = getELE("chucvu").value;
    var gioLam = getELE("gioLam").value;

    var isValid = true;

    // Tên nhân viên
    isValid &= validation.checkEmpty(hoVaTen,"tbTen","Tên không được để trống") && validation.checkTenNV(hoVaTen,"tbTen","Tên nhân viên phải là chữ");

    // Email
    isValid &= validation.checkEmpty(email,"tbEmail","Email không được để trống") && validation.checkEmail(email,"tbEmail","Email không đúng định dạng");

    // PassWord
    isValid &= validation.checkEmpty(password,"tbMatKhau","Mật khẩu không được để trống") && validation.checkPassWord(password,"tbMatKhau","Mật khẩu cần ít nhất 1 chữ hoa, 1 chữ thường, 1 số, 1 ký tự đặc biệt, độ dài từ 6-10 ký tự");


    // Ngày đi làm
    isValid &= validation.checkEmpty(ngayLam,"tbNgay","Ngày làm không được để trống")&&  validation.checkDate(ngayLam,"tbNgay","Ngày làm không đúng định dạng");

    // Lương cơ bản
    isValid &= validation.checkEmpty(luongCoBan,"tbLuongCB","Lương cơ bản không được để trống") && validation.checkSalary(luongCoBan,"tbLuongCB","Lương cơ bản kkhông hợp lệ")

    // Dropdown
    isValid &= validation.checkDropDown("chucvu", "tbChucVu", "Chức vụ chưa được chọn");

    // Giờ đi làm
    isValid &= validation.checkEmpty(gioLam,"tbGiolam","Giờ làm không được để trống") && validation.checkTimeWork(gioLam,"tbGiolam","Giờ làm không hợp lệ")



    if(isValid){

    var nv = new NhanVien(taiKhoan, hoVaTen, email, password, ngayLam, Number(luongCoBan), chucVu, Number(gioLam));

    // Lương
    nv.tinhTongLuong();

    // Chức vụ
    
    //  Loại Nhân viên
    nv.xepLoaiNhanVien();

    // Cập nhật nhân viên
    dsnv.capNhatNV(nv);

    // gọi hàm hiển thị
    hienThiDS(dsnv.mangNV);

    setLocalStorage();
    }

}

function resetForm(){
    getELE("formQLNV").reset();
    var spanThongBao = document.getElementsByClassName("sp-thongbao");
    for(var i of spanThongBao){
        i.innerHTML= "";          
    }
}


function timKiemTheoTen(){
    var tuKhoa = getELE("searchName").value;

    var mangTK = dsnv.timKiem(tuKhoa.trim());
    hienThiDS(mangTK);
}

getELE("btnTimNV").onclick = timKiemTheoTen;
getELE("searchName").onkeyup = timKiemTheoTen;
