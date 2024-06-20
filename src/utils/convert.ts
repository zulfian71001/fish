export const convertStatusDelivery = (status: string) => {
  let statusData = "Tertunda";
  if (status == "pending") {
    return statusData;
  } else if (status == "processing") {
    return statusData = "Proses"
  }else if (status == "delivery") {
    return statusData = "Pengiriman"
  } 
  else if (status == "placed") {
    return statusData = "Sampai"
  } else {
    return statusData = "Batal"
  }
};

export const convertStatus = (status: string) => {
  let statusData = "Belum Bayar";
  if (status === "unpaid") {
    return statusData;
  } else {
    return (statusData = "Lunas");
  }
};

export const convertRupiah = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(price);
};

export const convertStatusDeliverySearch = (status: string) => {
  let statusData = "pending";
  if (status == "tertunda") {
    return statusData;
  } else if (status == "processing") {
    return (statusData = "process");
  } else if (status == "sampai ") {
    return (statusData = "placed");
  } else if (statusData == "batal"){
    return (statusData = "cancelled");
  } else {
    return (statusData = "")
  }
};

// export const convertDate = (date: string) => {
//   return new Intl.DateTimeFormat("id-ID", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//     hour: "numeric",
//     minute: "numeric",
//     hour12: true,
//   }).format(date);
// };


export function getFirstCharacter(data:string) {
  if (data && typeof data === 'string') {
    return data.charAt(0).toUpperCase();
  } else {
    return '';
  }
}