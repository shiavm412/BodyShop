import Utils from '../../../utils';
import request from '../../../utils/request';

export const getReviewQuestions = (params: any, callback?: Function) => {
    return (dispatch: any, _getState: any) => {
        // dispatch(showLoader());
        let url = Utils.endPoints.REVIEW_QUESTIONS
        request.post(url, params).then((resp) => {
            if (resp) {
                if (callback) {
                    callback(resp?.data?.data)
                }
                dispatch({ type: "set-rating-data", payload: { ...resp?.data } })
            } else {
                // dispatch(hideLoader())
            }
        })
            .catch((_err) => {
                // dispatch(hideSkeleton())
                // dispatch({
                //   type: "show-alert",
                //   payload: {
                //     type: "error",
                //     message: "Something went wrong",
                //   },
                // });
            });
    };
}

export const submitReview = (params: any, _callback?: Function) => {
    let url = Utils.endPoints.SUBMIT_REVIEW
    return request.post(url, params);
}
export const uploadPhoto = (params: any, _callback?: Function) => {
    let url = Utils.endPoints.UPLOAD_PHOTO
    return request.post(url, params, {
        headers: {
            "content-type": "multipart/form-data"
        }
    });
}