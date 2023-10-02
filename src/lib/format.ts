export const toRupiah = (price: number | undefined) => {
    if (typeof price === 'number' && !isNaN(price)) {
      return "Rp." + price.toLocaleString("id-ID");
    } else {
      return "Rp. 0"; // Atau nilai default lainnya jika price tidak valid
    }
  }
  