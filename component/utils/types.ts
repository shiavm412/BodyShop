/* eslint-disable quotes */
export type PaymentProps = {
    section?: "egift" | "mybag" | "membership" | "create_gift"
    paymentMode?: "cod" | "netbanking" | "paytm" | "upi" | "wallet" | undefined
    setPaymentMode: Function
    setProceedToPay: Function;
    disablePaymentOptions: boolean;
    paymentMethods?: any
    setBank?: Function;
    flag?: string
    onSubmit?: Function;
    setBtnText?: Function;
    setVpa?: Function;
    vpa?: string;
    setSelectedCard?: Function;
    setSavedCardToken?: Function
    selectedCard?: any
    setPaymentMethodId?: Function
    data?: any;
    rewardData?:any;
    walletBalance?:any
    handleCartSummary?:Function;
    onRetry?:Function;
    showMode?:any;
    isMembershipAdded?:any

}

export type PaymentOptionsProps = {
    section: "egift" | "mybag" | "membership"
    paymentMode: "cod" | "netbanking" | "paytm" | "upi" | "wallet" | undefined
    setPaymentMode: Function
    setProceedToPay: Function;
    disablePaymentOptions: boolean;
    paymentMethods?: any;
    setBank?: Function;
    flag?: string;
    onSubmit?: Function
    setBtnText?: Function;
    setVpa?: Function;
    vpa?: string;
    setSelectedCard?: Function;
    setSavedCardToken?: Function
    selectedCard?: any
    setPaymentMethodId?: Function
    rewardData?:any;
    walletBalance?:any;
    handleCartSummary?:Function
    showMode?:any;
    isMembershipAdded?:any
    deliveryData?:any
}