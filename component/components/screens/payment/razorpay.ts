//  const RazorPayment = () => {
import { initStore } from '../../../../store/store';
import Utils from '../../../utils';
import request from '../../../utils/request';
import axios from 'axios';

const initstore = initStore;
// const script = process.env.REACT_APP_RAZORPAY_SCRIPT || "";
// export function loadScript(src: string) {
//     return new Promise((resolve) => {
//         if (!document.getElementById("razPayId")) {
//             const script = document.createElement("script");
//             script.src = src;
//             script.id = "razPayId";
//             script.onload = () => {
//                 resolve(true);
//             };
//             script.onerror = () => {
//                 resolve(false);
//             };
//             document.body.appendChild(script);
//         } else if (document.getElementById("razPayId")) {
//             var elem: any = document.getElementById("razPayId");
//             var container: any = document.getElementsByClassName("razorpay-container");
//             elem.remove();
//             container?.[0]?.remove()
//             const script = document.createElement("script");
//             script.src = src;
//             script.id = "razPayId";
//             script.onload = () => {
//                 resolve(true);
//             };
//             script.onerror = () => {
//                 resolve(false);
//             };
//             document.body.appendChild(script);
//         }
//     });
// }

// export const fetchPaymentMethods = async (callback: Function) => {
//     let config = store.getState()?.configReducer?.paymentData?.[0] || {};
//     let options = {
//         "key": config?.razorpay_key_id, // Enter the Key ID generated from the Dashboard
//     };

//     let Window: any = window
//     let rzp1 = new Window.Razorpay(options);
//     rzp1.once('ready', function (response: any) {

//         callback(response)
//     })
// }

export const makePayment =
  (options: any, successCallback?: Function, errorCallback?: Function) =>
  (getState: any) => {
    let config =
      getState()?.configReducer?.paymentConfigs?.paymentOptions?.[0] || {};
    const key = config?.razorpay_key_id || '';

    const image = 'https://i.imgur.com/n5tjHFD.png';

    const Window: any = window;

    const rzp1 = new Window.Razorpay({
      key: key,
      image: image,
      redirect: true,
      modal: { backdropclose: false },
    });

    rzp1.createPayment(options);
    rzp1.on('payment.success', function (resp: any) {
      if (successCallback) successCallback(resp);
    });
    rzp1.on('payment.error', function (resp: any) {
      if (errorCallback) errorCallback(resp);
    });
  };

export const validateVPA = async (vpa: string) => (getState: any) => {
  let config =
    getState()?.configReducer?.paymentConfigs?.paymentOptions?.[0] || {};
  const key = config?.razorpay_key_id || '';
  // const image = 'https://i.imgur.com/n5tjHFD.png';
  const options = {
    key: key, // Enter the Key ID generated from the Dashboard
  };
  const Window: any = window;
  const razorpay = new Window.Razorpay(options);
  return razorpay.verifyVpa(vpa);
};

export const getBankLogos = (bankCode: string) => {
  return axios.get('https://cdn.razorpay.com/bank/' + bankCode + '.gif');
};

export const getCards = () => {
  return request.get(Utils.endPoints.RAZORPAY_CARDS);
};

export const deleteCard = (params: string) => {
  return request.delete(Utils.endPoints.RAZORPAY_CARDS + params);
};

export const getNetbankingBanks = () => {
  return request.get(Utils.endPoints.RAZORPAY_NETBANKING_BANKS);
};
