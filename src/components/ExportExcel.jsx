import React from "react";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import { FcExport } from "react-icons/fc";

const ExportExcel = ({ data, fileName, vnMonth }) => {
  const exportToExcel = async () => {
    // Tạo một workbook mới
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet(
      `BÁO CÁO HOÁ ĐƠN ĐIỆN NƯỚC THÁNG ${vnMonth}`
    );

    worksheet.mergeCells("A1:D1")
    const tentruong = worksheet.getCell("A1")
    tentruong.value = "TRƯỜNG ĐẠI HỌC QUẢN LÝ VÀ CÔNG NGHỆ HẢI PHÒNG"
    tentruong.font = { name: "Times New Roman", size: 11, color:{ argb:"FF0000" } }
    tentruong.alignment = { vertical: "middle", horizontal: "center" }

    worksheet.mergeCells("C2:H2")
    const titleCell = worksheet.getCell("C2")
    titleCell.value = `BÁO CÁO HOÁ ĐƠN ĐIỆN NƯỚC THÁNG ${vnMonth}`
    titleCell.font = { name: "Times New Roman", size: 16, bold: true }
    titleCell.alignment = { vertical: "middle", horizontal: "center" }

    worksheet.getColumn(1).width = 8
    worksheet.getColumn(2).width = 10
    worksheet.getColumn(3).width = 20
    worksheet.getColumn(4).width = 20
    worksheet.getColumn(5).width = 20
    worksheet.getColumn(6).width = 20
    worksheet.getColumn(7).width = 20
    worksheet.getColumn(8).width = 20
    worksheet.getColumn(9).width = 20
    worksheet.getColumn(10).width = 20
    worksheet.getColumn(11).width = 20
    worksheet.getColumn(12).width = 20
    worksheet.getColumn(13).width = 20
    worksheet.getColumn(14).width = 20
    worksheet.getColumn(15).width = 20
    worksheet.getColumn(16).width = 20

    worksheet.getColumn(1).alignment = { wrapText: false, vertical: 'middle', horizontal: 'center' }
    worksheet.getColumn(2).alignment = { wrapText: false, vertical: 'middle', horizontal: 'center' }
    worksheet.getColumn(3).alignment = { wrapText: false, vertical: 'middle', horizontal: 'center' }
    worksheet.getColumn(4).alignment = { wrapText: false, vertical: 'middle', horizontal: 'center' }
    worksheet.getColumn(5).alignment = { wrapText: false, vertical: 'middle', horizontal: 'center' }
    worksheet.getColumn(6).alignment = { wrapText: false, vertical: 'middle', horizontal: 'center' }
    worksheet.getColumn(7).alignment = { wrapText: false, vertical: 'middle', horizontal: 'center' }
    worksheet.getColumn(8).alignment = { wrapText: false, vertical: 'middle', horizontal: 'center' }
    worksheet.getColumn(9).alignment = { wrapText: false, vertical: 'middle', horizontal: 'center' }
    worksheet.getColumn(10).alignment = { wrapText: false, vertical: 'middle', horizontal: 'center' }
    worksheet.getColumn(11).alignment = { wrapText: false, vertical: 'middle', horizontal: 'center' }
    worksheet.getColumn(12).alignment = { wrapText: false, vertical: 'middle', horizontal: 'center' }
    worksheet.getColumn(13).alignment = { wrapText: false, vertical: 'middle', horizontal: 'center' }
    worksheet.getColumn(14).alignment = { wrapText: false, vertical: 'middle', horizontal: 'center' }
    worksheet.getColumn(15).alignment = { wrapText: false, vertical: 'middle', horizontal: 'center' }
    worksheet.getColumn(16).alignment = { wrapText: false, vertical: 'middle', horizontal: 'center' }


    // Thêm tiêu đề cột
    worksheet.getCell(6, 1).value = "STT"
    worksheet.getCell(6, 2).value = "Phòng"
    worksheet.getCell(6, 3).value = "Số người hiện tại"
    worksheet.getCell(6, 4).value = "Số người tối đa"
    worksheet.getCell(6, 5).value = "Từ ngày"
    worksheet.getCell(6, 6).value = "Đến ngày"
    worksheet.getCell(6, 7).value = "Chỉ số nước đầu"
    worksheet.getCell(6, 8).value = "Chỉ số nước cuối"
    worksheet.getCell(6, 9).value = "Chỉ số điện đầu"
    worksheet.getCell(6, 10).value = "Chỉ số điện cuối"
    worksheet.getCell(6, 11).value = "Đơn giá nước"
    worksheet.getCell(6, 12).value = "Đơn giá điện"
    worksheet.getCell(6, 13).value = "Tiền nước"
    worksheet.getCell(6, 14).value = "Tiền điện"
    worksheet.getCell(6, 15).value = "Tiền phòng"
    worksheet.getCell(6, 16).value = "Tổng tiền"

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
    worksheet.getCell(6, 12).alignment = { wrapText: false, vertical: 'middle', horizontal: 'center' }
    worksheet.getCell(6, 13).alignment = { wrapText: false, vertical: 'middle', horizontal: 'center' }
    worksheet.getCell(6, 14).alignment = { wrapText: false, vertical: 'middle', horizontal: 'center' }
    worksheet.getCell(6, 15).alignment = { wrapText: false, vertical: 'middle', horizontal: 'center' }
    worksheet.getCell(6, 16).alignment = { wrapText: false, vertical: 'middle', horizontal: 'center' }

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
    worksheet.getCell(6, 12).border = { top: { style:'thin' }, left: { style:'thin' }, right: { style:'thin' }, bottom: { style: 'thin' } }
    worksheet.getCell(6, 13).border = { top: { style:'thin' }, left: { style:'thin' }, right: { style:'thin' }, bottom: { style: 'thin' } }
    worksheet.getCell(6, 14).border = { top: { style:'thin' }, left: { style:'thin' }, right: { style:'thin' }, bottom: { style: 'thin' } }
    worksheet.getCell(6, 15).border = { top: { style:'thin' }, left: { style:'thin' }, right: { style:'thin' }, bottom: { style: 'thin' } }
    worksheet.getCell(6, 16).border = { top: { style:'thin' }, left: { style:'thin' }, right: { style:'thin' }, bottom: { style: 'thin' } }

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
    worksheet.getCell(6, 12).font = { bold: true, name: "Times New Roman" }
    worksheet.getCell(6, 13).font = { bold: true, name: "Times New Roman" }
    worksheet.getCell(6, 14).font = { bold: true, name: "Times New Roman" }
    worksheet.getCell(6, 15).font = { bold: true, name: "Times New Roman" }
    worksheet.getCell(6, 16).font = { bold: true, name: "Times New Roman" }



    // Thêm dữ liệu vào worksheet
    data.forEach((row, rowIndex) => {
      worksheet.addRow([
        ++rowIndex,
        row.room,
        row.current_num_tenants,
        row.max_tenants,
        row.start_date,
        row.end_date,
        row.start_water,
        row.end_water,
        row.start_electricity,
        row.end_electricity,
        row.water_price,
        row.electricity_price,
        row.total_water_charge,
        row.total_electricity_charge,
        row.room_price,
        row.total_revenue
      ]);
    });

    // Định dạng tiêu đề cột
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { bold: true };
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });

    // Xuất file Excel
    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `${fileName}.xlsx`);
  };

  return (
    // <button onClick={exportToExcel}><FcExport size={30}/></button>
    <label
      // htmlFor={`modal_fix_${data.id}`}
      className="btn btn-sm btn-ghost w-fit items-center tooltip tooltip-bottom flex justify-center"
      data-tip="Xuất Excel"
    >
      <FcExport size={20} onClick={exportToExcel} />
    </label>
  );
};

export default ExportExcel;
