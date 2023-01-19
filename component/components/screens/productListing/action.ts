import Utils from "../../../utils";
import request from "../../../utils/request";

export function getProductList(params: any, authtoken: any) {
  return async (dispatch: any, getState: any) => {
    let urldecodeLevel1 = decodeURI(params.search);
    let urldecodeLevel2 = decodeURIComponent(urldecodeLevel1);

    if (urldecodeLevel2 !== "undefined" && params?.page) {
      const obj = JSON.parse(urldecodeLevel2);
      urldecodeLevel2 = JSON.stringify({ ...obj, page: +params.page });
    }

    let data = { ...params, query: "", categoryId: params.categoryId };

    let url2 = Utils.endPoints.PRODUCT_LIST + "?data=" + urldecodeLevel2;

    let url =
      Utils.endPoints.PRODUCT_LIST +
      "?data=" +
      encodeURIComponent(JSON.stringify(data));

    let str = encodeURI(url);

    if (params.search !== undefined) {
      const resp2 = await request
        .get(url2, { headers: { Authorization: "Bearer " + authtoken } })
        .catch((err) => {
          console.log(err, "error");
        });

      let respdata2: any = resp2?.data?.data ? { ...resp2?.data?.data } : {};

      dispatch({
        type: "getProductList",
        payload: { ...respdata2 },
      });

      dispatch({
        type: "product-filter",
        payload: resp2?.data?.data?.filters?.data,
      });
    } else {
      const resp = await request
        .get(str, { headers: { Authorization: "Bearer " + authtoken } })
        .catch((err) => {
          console.log(err, "error");
        });
      let respdata: any = resp?.data?.data ? { ...resp?.data?.data } : {};

      respdata = { ...respdata };

      dispatch({
        type: "product-filter",
        payload: resp?.data?.data?.filters?.data,
      });

      dispatch({
        type: "getProductList",
        payload: { ...respdata },
      });
    }
  };
}

export function getPLPCategories(params?: any) {
  return request.get(Utils.endPoints.PLP_CATEGORY, {
    params: { limit: 20, page: 1, ...params },
  });
}
