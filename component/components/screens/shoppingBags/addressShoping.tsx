import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Address from "../address";

function AddressShoping() {
  const dispatch: any = useDispatch();

  const [checkoutAddressId, setCheckoutAddressId] = useState<string | null>(
    null
  );
  //@ts-ignore
  const [nextBtnDisabled, setNextBtnDisabled] = useState(
    checkoutAddressId !== null ? false : true
  );
  const data: any = useSelector(
    (state: any) => state.shoppingBagReducer
  );
  const setCheckoutData = (id: string | null) => {
    setCheckoutAddressId(id);
    if (id) {
      setNextBtnDisabled(false);
    } else {
      setNextBtnDisabled(true);
    }
    dispatch({ type: "checkoutAddressId", payload: id }); //use in payment page to send the delivery address
  };
  return (
    <div>
      <Address
        section="mybag"
        radioButton={true}
        checkoutAddressId={
          checkoutAddressId
            ? checkoutAddressId
            : data?.address?._id
            ? data?.address?._id
            : null
        }
        setCheckoutAddressId={setCheckoutData}
      />
    </div>
  );
}

export default AddressShoping;
