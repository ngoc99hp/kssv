
import ExcelJS from "exceljs"
import { SiMicrosoftexcel } from 'react-icons/si'
// const data = [
//     {"ten": "Nguyen Van A", "tuoi": 25, "que": "Ha Noi", "cong_viec": "Lap trinh vien"},
//     {"ten": "Tran Thi B", "tuoi": 30, "que": "Ho Chi Minh", "cong_viec": "Giao vien"},
//     {"ten": "Le Van C", "tuoi": 28, "que": "Da Nang", "cong_viec": "Nhan vien kinh doanh"},
//     {"ten": "Pham Thi D", "tuoi": 35, "que": "Hai Phong", "cong_viec": "Bac si"},
//     {"ten": "Hoang Van E", "tuoi": 22, "que": "Can Tho", "cong_viec": "Sinh vien"},
//     {"ten": "Nguyen Thi F", "tuoi": 40, "que": "Vinh", "cong_viec": "Nha bao"},
//     {"ten": "Trinh Van G", "tuoi": 32, "que": "Quang Ninh", "cong_viec": "Quan ly nhan su"},
//     {"ten": "Bui Thi H", "tuoi": 27, "que": "Hue", "cong_viec": "Nhan vien marketing"},
//     {"ten": "Vu Van I", "tuoi": 38, "que": "Ninh Binh", "cong_viec": "Kiem soat vien"},
//     {"ten": "Nguyen Van K", "tuoi": 33, "que": "Tien Giang", "cong_viec": "Ky su dien"}
// ]

const ExportExcel = ({data}) => {
  const handleExport = async () => {
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet(
      "BÁO CÁO THỐNG KÊ THÔNG TIN NGƯỜI THUÊ TẠI KSSV"
    );

    worksheet.mergeCells("A1:D1")
    const tentruong = worksheet.getCell("A1")
    tentruong.value = "TRƯỜNG ĐẠI HỌC QUẢN LÝ VÀ CÔNG NGHỆ HẢI PHÒNG"
    tentruong.font = { name: "Times New Roman", size: 11, color:{ argb:"FF0000" } }
    tentruong.alignment = { vertical: "middle", horizontal: "center" }

    worksheet.mergeCells("C2:H2")
    const titleCell = worksheet.getCell("C2")
    titleCell.value = "BÁO CÁO THỐNG KÊ THÔNG TIN NGƯỜI THUÊ TẠI KSSV"
    titleCell.font = { name: "Times New Roman", size: 16, bold: true }
    titleCell.alignment = { vertical: "middle", horizontal: "center" }

    worksheet.mergeCells("C3:G3")
    const Taingay = worksheet.getCell("C3")
    Taingay.value = "Từ ngày …... tháng …... năm 202.... đến ngày …... tháng …... năm 202...."
    Taingay.font = {
      name: "Times New Roman",
      size: 12
    }
    Taingay.alignment = { vertical: "middle", horizontal: "center" }
    // Thêm dữ liệu vào bảng tính
    worksheet.getColumn(1).width = 8
    worksheet.getColumn(2).width = 20
    worksheet.getColumn(3).width = 15
    worksheet.getColumn(4).width = 15
    worksheet.getColumn(5).width = 8
    worksheet.getColumn(6).width = 15
    worksheet.getColumn(7).width = 25
    worksheet.getColumn(8).width = 25
    worksheet.getColumn(9).width = 25
    worksheet.getColumn(10).width = 25
    worksheet.getColumn(11).width = 25


    worksheet.mergeCells("G5:O5")
    worksheet.mergeCells("P5:X5")
    worksheet.getCell(6, 1).value = "STT"
    worksheet.getCell(6, 2).value = "Họ và tên"
    worksheet.getCell(6, 3).value = "Số CCCD"
    worksheet.getCell(6, 4).value = "SĐT"
    worksheet.getCell(6, 5).value = "Khu"
    worksheet.getCell(6, 6).value = "Số phòng"
    worksheet.getCell(6, 7).value = "Ngày bắt đầu thuê"
    worksheet.getCell(6, 8).value = "Ngày kết thúc thuê"
    worksheet.getCell(6, 9).value = "Số tiền tạm thu"
    worksheet.getCell(6, 10).value = "Số điện khi bắt đầu"
    worksheet.getCell(6, 11).value = "Số nước khi bắt đầu"

    worksheet.getCell(6, 1).alignment = { wrapText: false, vertical: 'middle', horizontal: 'center' }
    worksheet.getCell(6, 2).alignment = { wrapText: false, vertical: 'middle', horizontal: 'center' }
    worksheet.getCell(6, 3).alignment = { wrapText: false, vertical: 'middle', horizontal: 'center' }
    worksheet.getCell(6, 4).alignment = { wrapText: false, vertical: 'middle', horizontal: 'center' }
    worksheet.getCell(6, 5).alignment = { wrapText: false, vertical: 'middle', horizontal: 'center' }
    worksheet.getCell(6, 6).alignment = { wrapText: false, vertical: 'middle', horizontal: 'center' }
    worksheet.getCell(6, 7).alignment = { wrapText: false, vertical: 'middle', horizontal: 'center' }
    worksheet.getCell(6, 8).alignment = { wrapText: false, vertical: 'middle', horizontal: 'center' }
    worksheet.getCell(6, 9).alignment = { wrapText: false, vertical: 'middle', horizontal: 'center' }
    worksheet.getCell(6, 10).alignment = { wrapText: false, vertical: 'middle', horizontal: 'center' }
    worksheet.getCell(6, 11).alignment = { wrapText: false, vertical: 'middle', horizontal: 'center' }
   

    worksheet.getCell(6, 1).border = { top: { style:'thin' }, left: { style:'thin' }, right: { style:'thin' }, bottom: { style: 'thin' } }
    worksheet.getCell(6, 2).border = { top: { style:'thin' }, left: { style:'thin' }, right: { style:'thin' }, bottom: { style: 'thin' } }
    worksheet.getCell(6, 3).border = { top: { style:'thin' }, left: { style:'thin' }, right: { style:'thin' }, bottom: { style: 'thin' } }
    worksheet.getCell(6, 4).border = { top: { style:'thin' }, left: { style:'thin' }, right: { style:'thin' }, bottom: { style: 'thin' } }
    worksheet.getCell(6, 5).border = { top: { style:'thin' }, left: { style:'thin' }, right: { style:'thin' }, bottom: { style: 'thin' } }
    worksheet.getCell(6, 6).border = { top: { style:'thin' }, left: { style:'thin' }, right: { style:'thin' }, bottom: { style: 'thin' } }
    worksheet.getCell(6, 7).border = { top: { style:'thin' }, left: { style:'thin' }, right: { style:'thin' }, bottom: { style: 'thin' } }
    worksheet.getCell(6, 8).border = { top: { style:'thin' }, left: { style:'thin' }, right: { style:'thin' }, bottom: { style: 'thin' } }
    worksheet.getCell(6, 9).border = { top: { style:'thin' }, left: { style:'thin' }, right: { style:'thin' }, bottom: { style: 'thin' } }
    worksheet.getCell(6, 10).border = { top: { style:'thin' }, left: { style:'thin' }, right: { style:'thin' }, bottom: { style: 'thin' } }
    worksheet.getCell(6, 11).border = { top: { style:'thin' }, left: { style:'thin' }, right: { style:'thin' }, bottom: { style: 'thin' } }
   

    worksheet.getCell(6, 1).font={ bold: true, name: "Times New Roman" }
    worksheet.getCell(6, 2).font = { bold: true, name: "Times New Roman" }
    worksheet.getCell(6, 3).font = { bold: true, name: "Times New Roman" }
    worksheet.getCell(6, 4).font = { bold: true, name: "Times New Roman" }
    worksheet.getCell(6, 5).font = { bold: true, name: "Times New Roman" }
    worksheet.getCell(6, 6).font = { bold: true, name: "Times New Roman" }
    worksheet.getCell(6, 7).font = { bold: true, name: "Times New Roman" }
    worksheet.getCell(6, 8).font = { bold: true, name: "Times New Roman" }
    worksheet.getCell(6, 9).font = { bold: true, name: "Times New Roman" }
    worksheet.getCell(6, 10).font = { bold: true, name: "Times New Roman" }
    worksheet.getCell(6, 11).font = { bold: true, name: "Times New Roman" }
   

    data.forEach((row, rowIndex) => {
      worksheet.addRow([
        ++rowIndex,
        row.tenant.name,
        row.tenant.cccd,
        row.tenant.phone_number,
        row.category_room.category_area.name,
        row.category_room.name,
        row.start_date,
        row.end_date,
        row.advance_payment,
        row.initial_electricity,
        row.initial_water,

        
      ])
    })

    const blob = await workbook.xlsx.writeBuffer()
    // Tạo URL cho blob và tạo một thẻ a để kích hoạt tải về
    const url = window.URL.createObjectURL(new Blob([blob]))
    const a = document.createElement("a")
    a.href = url
    a.download = "BÁO CÁO THỐNG KÊ HỌC SINH ĐĂNG KÝ XÉT TUYỂN.xlsx"
    document.body.appendChild(a)
    a.click()
    // Xóa thẻ a sau khi tải xong
    document.body.removeChild(a)
    window.URL.revokeObjectURL(url)
  }

  return (
    <div>
      <button onClick={handleExport} className='flex items-center gap-2 font-bold border border-[#41B06E] px-4 py-2 rounded-md m-3 hover:bg-[#41B06E]/30 duration-300'>
        <SiMicrosoftexcel color='#41B06E'/>
        Xuất Excel
      </button>
    </div>
  )
}

export default ExportExcel
