import axios from "axios"
import * as helper from "./helper"
import { apiUrls } from "./helper"
import { IConvertPosition, IMarketDataHistory, IModifyOrder, IOrder, IProfile } from "./types"
const apiUrl = "https://api.fyers.in/api/v2/"

const getAuthToken = (appId: string, token: string) => `${appId}:${token}`

const request = async (url: string, method: string, data: any, authorization: string) => {
    const headers = {
        "Content-Type": "application/json",
        Authorization: authorization,
    }
    const response = await axios({
        url,
        method,
        data,
        headers,
    })
    return response.data
}

class fyersUser extends helper.orderUpdateHelper {
    appId: string
    secretId: string
    redirectUrl: string
    constructor(appId: string, secretId: string, redirectUrl: string) {
        super()
        this.appId = appId
        this.secretId = secretId
        this.redirectUrl = redirectUrl
    }
    /**
     * @description this will return login url
     * 
     * @returns  login url
     * 
     * @memberOf fyersUser
     */
    async generateLoginUrl() {
        const client_id = this.appId
        const redirect_uri = this.redirectUrl
        const state = "sample_state"
        return `${apiUrl}generate-authcode?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&state=${state}`
    }
    /**
     * @description this will return user access token
     * 
     * @param {*} authCode auth code generated from generateLoginUrl
     * @returns this will return access token
     * 
     * @memberOf fyersUser
     */
    async generateAccessToken(authCode: any) {
        const sha256 = await helper.sha256(`${this.appId}:${this.secretId}`)
        try {
            const accessToken = await axios.post(`${apiUrl}validate-authcode`, {
                grant_type: "authorization_code",
                code: authCode,
                appIdHash: sha256,
            })
            return accessToken.data
        } catch (error: any) {
            return error
        }
    }
    /**
     * @description this will return user profile data
     * 
     * @param {string} token user token
     * @returns you will find data object inside returned object, in which data is structured something like this {name,image,display_name,email_id,PAN,fy_id,pwd_change_date,pwd_to_expire}
     * 
     * @memberOf fyersUser
     */
    async getProfile(token: string) {
        try {
            return await request(apiUrls.profile, "GET", {}, getAuthToken(this.appId, token))
        } catch (error: any) {
            return error
        }
    }
    /**
     * @description this will return user funds data
     * 
     * @param {string} token user token
     * @returns  this will return funds data
     * 
     * @memberOf fyersUser
     */
    async getFunds(token: string) {
        try {
            return await request(apiUrls.funds, "GET", {}, getAuthToken(this.appId, token))
        } catch (error: any) {
            return error
        }
    }
    async getHoldings(token: string) {
        try {
            return await request(apiUrls.holdings, "GET", {}, getAuthToken(this.appId, token))
        } catch (error) {
            return error
        }
    }
    async getOrders(token: string) {
        try {
            return await request(apiUrls.orders, "GET", {}, getAuthToken(this.appId, token))
        } catch (error: any) {
            return error
        }
    }
    async getPositions(token: string) {
        try {
            return await request(apiUrls.positions, "GET", {}, getAuthToken(this.appId, token))
        } catch (error: any) {
            return error
        }
    }
    async getTrades(token: string) {
        try {
            return await request(apiUrls.tradeBook, "GET", {}, getAuthToken(this.appId, token))
        } catch (error: any) {
            return error
        }
    }
    async getFilteredOrders(token: string, orderId: number) {
        try {
            return await request(apiUrls.filterOrder(orderId), "GET", {}, getAuthToken(this.appId, token))
        } catch (error: any) {
            return error
        }
    }
    async getMarketStatus(token: string) {
        try {
            return await request(apiUrls.marketStatus, "GET", {}, getAuthToken(this.appId, token))
        } catch (error: any) {
            return error
        }
    }
    async placeOrder(token: string, data: IOrder) {
        try {
            return await request(apiUrls.placeOrder, "POST", data, getAuthToken(this.appId, token))
        } catch (error: any) {
            return error
        }
    }
    async multiOrder(token: string, data: IOrder[]) {
        try {
            return await request(apiUrls.placeMultiOrder, "POST", data, getAuthToken(this.appId, token))
        } catch (error: any) {
            return error
        }
    }
    async modifyOrder(token: string, data: IModifyOrder) {
        try {
            return await request(apiUrls.modifyOrder, "POST", data, getAuthToken(this.appId, token))
        } catch (error: any) {
            return error
        }
    }
    async modifyMultiOrder(token: string, data: IModifyOrder[]) {
        try {
            return await request(apiUrls.modifyOrder, "POST", data, getAuthToken(this.appId, token))
        } catch (error: any) {
            return error
        }
    }
    async cancelOrder(token: string, orderId: number) {
        try {
            return await request(apiUrls.cancelOrder, "DELETE", { id: orderId }, getAuthToken(this.appId, token))
        } catch (error: any) {
            return error
        }
    }
    async cancelMultiOrder(token: string, orderId: Array<{ id: Number }>) {
        try {
            return await request(apiUrls.cancelOrder, "DELETE", { id: orderId }, getAuthToken(this.appId, token))
        } catch (error: any) {
            return error
        }
    }
    async exitPosition(token: string, orderId: string) {
        try {
            return await request(apiUrls.exitPosition, "DELETE", { id: orderId }, getAuthToken(this.appId, token))
        } catch (error: any) {
            return error
        }
    }
    async exitAllPosition(token: string) {
        try {
            return await request(apiUrls.exitPosition, "DELETE", {}, getAuthToken(this.appId, token))
        } catch (error: any) {
            return error
        }
    }
    async convertPosition(token: string, data: IConvertPosition) {
        try {
            return await request(apiUrls.convertPosition, "PUT", data, getAuthToken(this.appId, token))
        } catch (error: any) {
            return error
        }
    }
    async getMarketDataHistory(token: string, data: IMarketDataHistory) {
        try {
            return await request(apiUrls.marketDataHistory({ ...data }), "GET", data, getAuthToken(this.appId, token))
        } catch (error: any) {
            return error
        }
    }
    async getQuotes(token: string, symbol: string) {
        try {
            return await request(apiUrls.quotes(symbol), "GET", {}, getAuthToken(this.appId, token))
        } catch (error: any) {
            return error
        }
    }
    async getDepth(token: string, symbol: string) {
        try {
            return await request(apiUrls.depth(symbol), "GET", {}, getAuthToken(this.appId, token))
        } catch (error: any) {
            return error
        }
    }
}
export default fyersUser
export { IConvertPosition, IModifyOrder, IOrder, IMarketDataHistory, IProfile }

