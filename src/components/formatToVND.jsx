export default function formatToVND(number) {
  let formattedNumber = number.toLocaleString("vi-VN");
  formattedNumber += " đ";
  return formattedNumber;
}
