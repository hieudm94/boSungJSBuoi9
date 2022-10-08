function DanhSachNhanVien(){
    // Mảng nhân viên
    this.mangNV = [];

    // Phương thức
    this.themNV = function(nv){
        this.mangNV.push(nv);
    }

    this.timViTri = function(taikhoan){
        var vitri = -1;
        this.mangNV.map(function(nv,index){
            if(nv.taiKhoan === taikhoan){
                vitri = index
            }
        });
        return vitri;
    }

    this.xoaNV = function(taikhoan){
        var viTri = this.timViTri(taikhoan);
        if(viTri > -1){
            this.mangNV.splice(viTri,1)
        }
    }

    this.capNhatNV = function(nv){
        var viTri = this.timViTri(nv.taiKhoan);
        if(viTri > -1){
            // dsnv.mangNV[viTri]= nv
            dsnv.mangNV[viTri] = nv
        }
    }
    
}

DanhSachNhanVien.prototype.timKiem = function(tuKhoa){
    var mangTK = [];
    var tuKhoaThuong = tuKhoa.toLowerCase();
    this.mangNV.map(function(nv){
        var tenNVThuong = nv.hoVaTen.toLowerCase();
        var viTriTK = tenNVThuong.indexOf(tuKhoaThuong);
        if(viTriTK !== -1){
            mangTK.push(nv);
        }
    });
    return mangTK
}