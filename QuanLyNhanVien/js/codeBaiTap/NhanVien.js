function NhanVien(taiKhoan,hoVaTen,email,password,ngayLam,luongCoBan,chucVu,gioLam,tongLuong ,xemChucVu, loaiNV){
    this.taiKhoan = taiKhoan;
    this.hoVaTen = hoVaTen;
    this.email = email;
    this.password = password;
    this.ngayLam = ngayLam;
    this.luongCoBan = luongCoBan;
    this.chucVu = chucVu;
    this.gioLam = gioLam;
    this.tongLuong = tongLuong;
    this.xemChucVu = xemChucVu;
    this.loaiNV = loaiNV;


    this.tinhTongLuong = function(){
        if(this.chucVu == "sep"){
            this.tongLuong = this.luongCoBan * 3
            this.xemChucVu = "Sếp";
        }else if(this.chucVu == "truongPhong"){
            this.tongLuong = this.luongCoBan * 2
            this.xemChucVu ="Trưởng Phòng";

        }else{
            this.tongLuong = this.luongCoBan
            this.xemChucVu = "Nhân Viên";

        }
    }

    this.xepLoaiNhanVien = function(){
        if(this.gioLam >= 192){
            this.loaiNV = "Xuất sắc";
        } else if(this.gioLam >= 176 && this.gioLam < 192){
            this.loaiNV = "Giỏi";
        }else if(this.gioLam >= 160 && this.gioLam < 176){
            this.loaiNV = "Khá";
        }else{
            this.loaiNV = "Trung bình";
  
        }
    }

   
}