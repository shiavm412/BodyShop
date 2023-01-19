// export const initTransaction = (payload: any) => {

import Utils from '../../../../../utils';
import request from '../../../../../utils/request';

//     let url = Utils.endPoints.PAYMENT_INIT
//     return request.post(url, payload)

// };

export const sendOtp = (payload: any) => {
  let url = Utils.endPoints.PAYTM_SEND_OTP;
  return request.post(url, payload);
};
export const verifyOtp = (payload: any) => {
  let url = Utils.endPoints.PAYTM_VALIDATE_OTP;
  return request.post(url, payload);
};

export const getWalletBalance = (payload: any) => {
  let url = Utils.endPoints.PAYTM_FETCH_BALANCE;

  return request.post(url, payload);
};

export const revokePaytmWallet = () => {
  let url = Utils.endPoints.REVOKE_PAYTM_WALLET;
  return request.delete(url);
};

// export const addMoney = () => {
//     addMoneyToWallet(
//         {
//             "amount": "10.00",
//             "orderId": "4343242"
//         }
//     ).then((resp: any) => {
//         var information = {
//             action: resp?.data?.data?.url,
//             params: resp?.data?.data
//         }
//         post(information)
//     }).catch((err: any) => {
//     })
// }

export const addMoneyToWallet = (payload: any, callback?: Function) => {
  let url = Utils.endPoints.PAYTM_ADD_MONEY;
  return request
    .post(url, { ...payload, orderId: Date.now().toString() })
    .then((resp: any) => {
      var information = {
        action: resp?.data?.data?.url,
        params: resp?.data?.data,
      };

      // var information = {
      //     action: "https://securegw-stage.paytm.in/order/process?ORDER_ID=c14e4452b9cfaa3c",
      //     params: {
      //         "MID": "TheBod98299346760959",
      //         "REQUEST_TYPE": "ADD_MONEY",
      //         "WEBSITE": "WEBSTAGING",
      //         "INDUSTRY_TYPE_ID": "Retail",
      //         "CHANNEL_ID": "WAP",
      //         "ORDER_ID": "c14e4452b9cfaa3c",
      //         "CUST_ID": "61d2cbc07530730007279848",
      //         "MOBILE_NO": "7777777777",
      //         "EMAIL": "testuser180@yopmail.com",
      //         "SSO_TOKEN": "eyJlbmMiOiJBMjU2R0NNIiwiYWxnIjoiZGlyIn0..i_n77wCLZBQ6JhwE.nEE7zWGtxsdIobtPw9jrGL-2qUCy6gdaNE9m79w6JAND0zJBgTBVSmtBMqvyZaklPgeBaIqdYLA2woRaOV0BP9qospDXz76RfMdoKMWIr_4cMX2y_FAJhjqMg0f2tYtV3bHrtQ8TJJZrow_sLpW6jWoZxeWb8Ph7VX9-E8xi0Ae-CMvq6vEN47LtbTxUnZX5QiYV3EuO84pDuwCBPpLPyn8ykylQyaJox4fczCjS3LC22hzgubQNvqae_mX7QMuXFisfznFUbA6DAlHHRjEYI1dh.r3yrzElUunoQKSktwp9fGQ3000",
      //         "TXN_AMOUNT": "10.00",
      //         "CALLBACK_URL": "https://bodyshopdevapi.appskeeper.in/order-service/api/v1/payment/redirect-url?platfrom=app",
      //         "CHECKSUMHASH": "lNQ6+aILHsMvEzj+4qaIddejFqbEIH5e3V5HbOlw8om7A2CcClFPaDDC1MM+0kgDLqeTWylcNtpB33cvdhDvqqVDoJO3+uF7JkY72Iosalg=",
      //         "url": "https://securegw-stage.paytm.in/order/process?ORDER_ID=c14e4452b9cfaa3c"

      //     }
      // }
      post(information);
    })
    .catch((err: any) => {
      callback && callback(err);
    });
};

const isDate = (val: any) => {
  // Cross realm comptatible
  return Object.prototype.toString.call(val) === '[object Date]';
};

const isObj = (val: any) => {
  return typeof val === 'object';
};

const stringifyValue = (val: any) => {
  if (isObj(val) && !isDate(val)) {
    return JSON.stringify(val);
  } else {
    return val;
  }
};

const buildForm = ({ action, params }: any) => {
  const form = document.createElement('form');
  form.setAttribute('method', 'post');
  form.setAttribute('action', action);

  Object.keys(params).forEach((key) => {
    if (key !== 'url') {
      const input = document.createElement('input');
      input.setAttribute('type', 'hidden');
      input.setAttribute('name', key);
      input.setAttribute('value', stringifyValue(params[key]));
      form.appendChild(input);
    }
  });

  return form;
};

const post = (details: any) => {
  const form = buildForm(details);
  document.body.appendChild(form);
  form.submit();
  form.remove();
};
