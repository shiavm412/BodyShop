import _ from "lodash";
// import {
//   useLocation
// } from "react-router-dom";
import moment from "moment";
import { useRouter } from "next/router";


const PageSwitch = (value: any, history: any, _event: any) => {
  // event.preventDefault();
  window.scrollTo(0, 0);
  history(value);
};

function onlyNumberKey(evt: any) {
  // Only ASCII charactar in that range allowed
  var ASCIICode = evt.which ? evt.which : evt.keyCode;
  if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) return false;
  return true;
}
/**
 * function to remove all spaces from a given string.
 * @param value
 */
const removeSpaces = (value: string) => {
  return value.replace(/\s/g, "");
};




const generateRandomNumber = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

function setCookie(cname: any, cvalue: any, exdays: any = 0) {
  var d = new Date();
  var expires;
  if (exdays) {
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    expires = "expires=" + d.toUTCString();
  }
  if (typeof window !== 'undefined') {
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
  }
}


function getCookie(cname: any) {
  var name = cname + "=";
  if (typeof window !== 'undefined') {
    var decodedCookie = document ? decodeURIComponent(document?.cookie) : "" ;
    var ca = decodedCookie?.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      //@ts-ignore
      while (c.charAt(0) === " ") {
        c = c.substring(1);
      }
      //@ts-ignore
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
  }
 
  return "";
}

const nth = (n: number) => {
  return ["st", "nd", "rd"][((((n + 90) % 100) - 10) % 10) - 1] || "th";
};

/**
 * function to generate 32 chars substring from hexSalt
 * @param hex
 * @param nonce
 */
const generate32CharsSalt = (hex: string, nonce: number) => {
  return hex.substring(nonce, nonce + 32);
};

/**
 * function to generate axios config for cancel token
 * @param payload
 * @param endPoint
 * @param authorised
 */
const axiosCancelTokenConfig = (
  payload: any,
  endPoint: string,
) => {
  // var defaultLanguage = localStorage.getItem("i18nextLng");
  //@ts-ignore
  // var splitString = defaultLanguage.split("-");

  return {
    method: "post",
    timeout: 30000,
    data: payload,
    url: endPoint,
    headers: {
      "Content-Type": "application/json",
      // "Accept-Language": localStorage.getItem("i18nextLng"),

    },
    baseURL: `${process.env.NEXT_PUBLIC_DOMAIN}${process.env.NEXT_PUBLIC_VERSION}`,
  };
};

/**
 * function to generate axios config for cancel token
 * @param payload
 * @param endPoint
 * @param authorised
 */


/**
 * function to slugify url entered by user for business link
 * @param url
 */
const slugifyUrl = (url: string) => {
  var slugify = require('slugify');
  return slugify(url, { remove: /[*+~.()'"!:@#$%!]/g, lower: true });
};



// for 2 decimal places at max
function maxDecimalFiat(value: any, digitsAfterDecimal: any) {
  return +parseFloat(value).toFixed(digitsAfterDecimal);
}

// always 2 decimal values
function decimalFlat(value: any, digitsAfterDecimal: any = 0) {
  value = value ?? 0;
  let number = (Math.round(value * 100) / 100).toFixed(digitsAfterDecimal);
  let convert = new Intl.NumberFormat();
  return convert.format(+number)

}
function addCommaToAmount(amount: number | string) {
  let convert = new Intl.NumberFormat();
  return amount && amount !== '' ? convert.format(+Number(amount)) : 0;

}

function getApiAuthHeader() {
  return {
    headers: {
      'Authorization': `Basic ${process.env.NEXT_PUBLIC_API_KEY}`

    }
  }
}

function replaceUrlParams(url: string, replaceArr: any) {
  var re = new RegExp(Object.keys(replaceArr).join("|"), "gi");
  return _.replace(url, re, (matched: any) => replaceArr[matched]).replace("?", "")
}

function useQuery() {
  // return new URLSearchParams(useLocation().search);
  return new URLSearchParams(useRouter().pathname);

}

function replaceHtmlTag(str: any) {
  return str?.replace(/(<([^>]+)>)/ig, '');
}
function unixToDate(value: any, format = "MM/DD/YYYY") {
  // return moment.unix(value).format(format);
  return moment(new Date(value)).format(format);

  // return format(new Date(value), format)

}
function formatDate(value: any, format = "MM/DD/YYYY") {
  return moment(value).format(format);
}

function percentageOff(amount: any, totalAmount: any) {
  // return Math.ceil((amount * 100 - totalAmount) / amount)
  return Math.ceil((totalAmount - amount) * 100 / totalAmount)
}


const removeScroll = (elements: any) => {
  elements.forEach((element: any) => {
    const collection: any = document.getElementById(element);
    if (collection) {
      collection.addEventListener('mousewheel', (e: any) => {
        e.target.blur();
      });
    }
  });
};


const isColor = (strColor: string) => {
  var s = new Option().style;
  s.color = strColor;
  return s.color === strColor;
}


const getAttributeValue = (data: Array<any>, attributeCode: string) => {
  if (data && data?.length > 0) {
    return data?.find((el: any) => el.attribute_code === attributeCode)?.value;
  }
  return "";
};

const getColor = (val: any) => {
  let shadeColor = "var(--disabled-color)"
  let swatchColor = val?.swatch_colorcode?.toLowerCase()?.replace(" ", "")
  // let color = val?.label?.toLowerCase()?.replace(" ", "")
  // if (isColor(swatchColor)) {
  //   shadeColor = swatchColor
  // } else if (isColor(color)) {
  //   shadeColor = color
  // }

  return swatchColor ? swatchColor : shadeColor;
}

function htmlDecode(input: any) {
  var str_esc = escape(input);
  return unescape(str_esc)
}


function mobileCheck() {
  let Window: any = window
  let check = false;
  (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw(n|u)|c55\/|capi|ccwa|cdm|cell|chtm|cldc|cmd|co(mp|nd)|craw|da(it|ll|ng)|dbte|dcs|devi|dica|dmob|do(c|p)o|ds(12|d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(|_)|g1 u|g560|gene|gf5|gmo|go(\.w|od)|gr(ad|un)|haie|hcit|hd(m|p|t)|hei|hi(pt|ta)|hp( i|ip)|hsc|ht(c(| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i(20|go|ma)|i230|iac( ||\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|[a-w])|libw|lynx|m1w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|mcr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|([1-8]|c))|phil|pire|pl(ay|uc)|pn2|po(ck|rt|se)|prox|psio|ptg|qaa|qc(07|12|21|32|60|[2-7]|i)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h|oo|p)|sdk\/|se(c(|0|1)|47|mc|nd|ri)|sgh|shar|sie(|m)|sk0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h|v|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl|tdg|tel(i|m)|tim|tmo|to(pl|sh)|ts(70|m|m3|m5)|tx9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas|your|zeto|zte/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || Window.opera);
  return check;
}


const emailMask = (email: string) => {
  const arr = email?.split('@') || [];
  let str = arr?.[0]?.[0] || ""
  // arr?.[0]?.split("")?.forEach((item: any, index: number) => {
  //   if (index >= 1 && index <= arr?.[0]?.split("").length - 2) {
  //     str += 'x';
  //   }
  //   else if (index === arr?.[0]?.split("").length - 1)
  //     str = str + arr?.[0]?.[arr?.[0]?.split("").length - 1] + '@' + arr[1]

  // })
  str = str + 'xxxxx' + arr?.[0]?.[arr?.[0]?.split("").length - 1] + '@' + arr[1]
  return str || ""
}
const getCamelCaseString = (str: string) => {
  let strArr = str?.split(' ');
  strArr = strArr?.map((item: string) => {
    return item?.[0]?.toUpperCase() + item?.slice(1)?.toLowerCase()

  })

  return str ? strArr?.join(' ') : ''
}


const seoUrl = (item: any, type: "plp" | "pdp" | "others") => {
  // let id = item?.magentoId ?? item?.id
  let is_root = item?.is_root ?? item?.is_root
  let path = item?.customAttributes?.find((item: any) => item.attribute_code === "url_path" || item.attribute_code === "url_key")?.value
  let googleCode = item?.customAttributes?.find((item: any) => item.attribute_code === "google_category")?.value
  let pathname = ""

  if (item?.urlPath) {
    path = item?.urlPath
    googleCode = item?.googleKey
  }


  if (type == "plp") {
    if (is_root == 1) {
      pathname = `/${path}/h/${googleCode}`
    } else {
      pathname = `/${path}/c/${googleCode}`
    }
  } else if (type == "pdp") {

    let catPath = "";

    if (item?.category?.child_category?.urlPathObj?.value) {
      catPath = item?.category?.child_category?.urlPathObj?.value;
    } else if (item?.category?.urlKey && item?.category?.child_category?.urlKey) {
      catPath = `${item?.category?.urlKey}/${item?.category?.child_category?.urlKey}`;
    } else if (item?.category?.child_category?.urlKey) {
      catPath = item?.category?.child_category?.urlKey;
    } else if (item?.subCat?.url_key) {
      catPath = `${item?.plpData?.categoryData?.urlKey}/${item?.subCat?.url_key}`;
    } else if (item?.plpData?.categoryData?.urlPath) {
      catPath = item?.plpData?.categoryData?.urlPath;
    }

    // let catPath = item?.category?.child_category?.urlPathObj?.value ?? item?.plpData?.categoryData?.child_category?.urlPath != "" ? item?.plpData?.categoryData?.child_category?.urlPath : item?.plpData?.categoryData?.urlPath;
    // let catPath = item?.category?.child_category?.urlPathObj?.value ? item?.category?.child_category?.urlPathObj?.value : item?.subCat?.url_key ? `${item?.plpData?.categoryData?.urlKey}/${item?.subCat?.url_key}` : item?.plpData?.categoryData?.urlKey;

    pathname = `${catPath ? `/${catPath}` : ``}/${path}/p/${googleCode}`
  } else if (type == "others") {
    if (is_root == 1) {
      pathname = `/${item?.url}/h/${item?.google_category}`
    } else {
      pathname = `/${item?.url}/c/${item?.google_category}`
    }
  }
  return pathname;
}


const serialize: any = (obj: any, prefix?: any) => {
  var str = [],
    p;
  for (p in obj) {
    if (obj.hasOwnProperty(p)) {
      var k = prefix ? prefix + "[" + p + "]" : p,
        v = obj[p];
      str.push((v !== null && typeof v === "object") ?
        serialize(v, k) :
        encodeURIComponent(k) + "=" + encodeURIComponent(v));
    }
  }
  return str.join("&");
}


const parseJwt = (token:string) => {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
  return JSON.parse(jsonPayload);
};


const CommonFunctions = {
  nth,
  PageSwitch,
  removeSpaces,
  onlyNumberKey,
  generate32CharsSalt,
  generateRandomNumber,
  axiosCancelTokenConfig,
  slugifyUrl,
  maxDecimalFiat,
  decimalFlat,
  setCookie,
  getCookie,
  getApiAuthHeader,
  replaceUrlParams,
  useQuery,
  replaceHtmlTag,
  unixToDate,
  percentageOff,
  removeScroll,
  formatDate,
  isColor,
  getAttributeValue,
  getColor,
  htmlDecode,
  mobileCheck,
  emailMask,
  getCamelCaseString,
  addCommaToAmount,
  seoUrl,
  serialize,
  parseJwt
};

export default CommonFunctions;


