type PhoneNumber = {
  international_area_code: Number;
  area_code: Number;
  exchange: Number;
  extension: Number;
};

type ConversionFunction = (str: String) => PhoneNumber;

const generate_phonenumber_from_string: ConversionFunction = (str) => {
  const international_area_code = Number(str.slice(0, 1));
  const area_code = Number(str.slice(1, 4));
  const exchange = Number(str.slice(4, 7));
  const extension = Number(str.slice(7));

  return {
    international_area_code,
    area_code,
    exchange,
    extension,
  };
};

export default generate_phonenumber_from_string;
