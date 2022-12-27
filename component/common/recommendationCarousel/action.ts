import { hideSkeleton } from "../../state/actions/homeActions";
import Utils from "../../utils";
import request from "../../utils/request";

export const getHomeRecommendations = (params: any,callback?:Function) => {

    return (dispatch: any, _getState: any) => {
        request.get(Utils.endPoints.RECOMMEND_PRODUCT, { ...params }).then((resp: any) => {
                dispatch({ type: "recommend-data", payload: resp.data.data });
                if(callback)
                callback(resp?.data?.data)
        }).catch((_err) => {
            if(callback)
            callback(null)

            // dispatch(hideLoader())
        })

    }
}
export const getOthersRecommendations = (params: any, callback?: Function) => {

    return (dispatch: any, _getState: any) => {
        request.get(Utils.endPoints.SUGGESTION_LIST, { ...params }).then((resp) => {
                dispatch({ type: "recommend-data", payload: resp.data.data });
                if (callback)
                    callback(resp?.data?.data)
            

        }).catch((_err) => {
            dispatch(hideSkeleton())

        })

    }
}