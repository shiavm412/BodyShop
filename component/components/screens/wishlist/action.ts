import Utils from '../../../utils';
import request from '../../../utils/request';

export const getWishList = (param: Object, callback?: Function) => {

    // let obj: any = {
    //     "query": keyword ?? "",
    //     "categoryId": categoryId ?? "",
    //     limit: 9,
    //     page: 1,
    //     sortBy: sortingData[0]?.id?.toString()
    // }
    return (dispatch: any, _getState: any) => {
        // dispatch(showLoader())
        request.get(Utils.endPoints.WISHLIST, {
            params: param
        }).then((resp) => {
            // dispatch(hideLoader())
            if (resp) {
                dispatch({ type: Utils.ActionName.WISHLIST, payload: { ...resp?.data?.data || {} } })
                // if (callback)
                //     callback(resp)
            } else {
                dispatch({ type: Utils.ActionName.WISHLIST, payload: {} })
                // dispatch(hideSkeleton())
            }
            if (callback)
            callback(resp)

        }).catch((err) => {
            // dispatch(hideSkeleton())
            dispatch({
                type: "show-alert", payload: {
                    type: "error",
                    message: err?.response?.data?.message
                }
            })
        })
    }
}


export const getSuggestionList = (param: Object) => {
    return request.get(Utils.endPoints.SUGGESTION_LIST, {
        params: param
    })

}