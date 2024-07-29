export const Patterns = {
  // email: /^([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)@([0-9a-zA-Z]([-_\\.]*[0-9a-zA-Z]+)*)[\\.]([a-zA-Z]{2,9})$/,
  email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
  spaces: /\s/,
  numeric: /[0-9]*\.?[0-9]+/,
  all_numeric: /^[\-+]?[0-9]*\.?[0-9]+$/,
  integer: /^[0-9]+$/,
  alpha: /[A-Z]+/i,
  only_string_name: /^[a-zA-Z ]+$/,
  alpha_spaces: /^[A-Z-&' ]+$/i,
  alpha_numeric: /^[A-Z0-9]+$/i,
  alpha_special_char: /^[ A-Za-z_@./#&+-]*$/,
  vat: /^[A-Z0-9]{15}$/i,
  alpha_numeric_spaces: /^[A-Z0-9 ]+$/i,
  alpha_numeric_spaces_no_white: /^[A-Z0-9]+( [A-Z0-9]+)*$/i,
  alpha_numeric_special_char_no_white_space:
    /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/,
  alpha_spaces_no_white: /^[A-Z]+( [A-Z]+)*$/i,
  landline: /^[0-9]{8,16}$/,
  mobile: /^[789]\d{9,20}$/,
  single_address_line: /^[A-Za-z0-9\/,. ]+(?:[\/,.:;-][A-Za-z0-9\/,. ]+)*$/,
  url: /(http|https|ftp|ftps):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/g,
  panNumber: /[a-z]{4,5}\d{4,5}[a-z]/i,
  password: /^\S/,
  strong_password:
    /^(?!.*\s)(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-+`~]).{8,15}(?<!\s)$/,
  strong_password_no_special:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,}$/,
  strong_password_with_special:
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/,
  number_with_decimal: /^[0-9]+(\.[0-9]{1,2})?$/,
  special_char: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,
  subdomain: /^(?=.{3,50}$)[a-z]+(-[a-z]+)*$/,
  italianZip: /^[0-9]{5,6}$/,
  postal_code_regex: /^[0-9A-Z\- ]+$/,
  pay_mode: ['others', 'credit_card', 'paypal', 'bank'],
  image_types: [
    'image/png',
    'image/jpg',
    'image/jpeg',
    'image/jp2',
    'image/jpx',
    'image/jpm',
    'image/tiff',
  ],
  file_type: ['application/vnd.ms-excel'],
  weekdays: [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
  ],
  doc_type: ['application/pdf'],
  user_name: /^[A-Za-z0-9_.]*$/,
};

export function urlValidator(control: any) {
  if (control.value) {
    const urlPattern =
      /(http|https|ftp|ftps):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/g;
    if (!urlPattern.test(control.value)) {
      return { invalidUrl: true };
    }
  }
  return null;
}
