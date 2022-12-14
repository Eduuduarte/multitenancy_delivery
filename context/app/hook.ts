import { useContext } from "react"
import { AppContext } from "."
import { Address } from "../../types/Address";
import { Tenant } from "../../types/tenant";
import { Actions } from "./types";

export const useAppContext = () => {
    const {state, dispatch } = useContext(AppContext);

    return {
        ...state,
        setTenant: (tenant: Tenant) => {
            dispatch({
                type: Actions.SET_TENANT,
                payload: { tenant }
            });
        },
        setShippingAddress: (shippingAddress: Address) => {
            dispatch({
                type: Actions.SET_SHIPPINGADDRESS,
                payload: {shippingAddress}
            });
        },
        setShippingPrice: (shippingPrice: number) => {
            dispatch({
                type: Actions.SET_SHIPPINGPRICE,
                payload: { shippingPrice }
            })
        }
    }
}