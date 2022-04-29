import dayjs from "dayjs";
import numeral from "numeral";

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

function formatDate(date, format = "DD/MM/YYYY - HH:mm") {
  return dayjs(date).format(format);
}

function formatCurrency(amount) {
  return numeral(amount).format("0,0.0");
}

export { getBase64, formatDate, formatCurrency };
