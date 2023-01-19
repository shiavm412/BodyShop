import request from "../../utils/request"
import Utils from "../../utils"

export const addToWishList = (params: any) => {
    return request.post(Utils.endPoints.ADD_WISHLIST, { ...params })
}


export const removeFromWishList = (id: string) => {
    return request.delete(Utils.CommonFunctions.replaceUrlParams(Utils.endPoints.REMOVE_WISHLIST, { ":id": id } as any))

}

export const notifyMe = (params: any) => {
    return request.post(Utils.endPoints.NOTIFY, { ...params })

}