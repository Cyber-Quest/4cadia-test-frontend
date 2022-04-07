export const numberToCurrency = (number) => {
  return new Intl.NumberFormat("pt-br", {
    style: "currency",
    currency: "BRL",
  }).format(number);
};

export const dataFormat = (date) => {
  const newDate = new Date(date),
    day = newDate.getDate().toString().padStart(2, "0"),
    month = (newDate.getMonth() + 1).toString().padStart(2, "0"),
    year = newDate.getFullYear();
  return day + "/" + month + "/" + year;
};

export const getTime = (date) => {
  var d = new Date(date);
  return `${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
};
