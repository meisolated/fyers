/**
 *
 * Over here we have to make optimized version of FyersApi2 package
 * WHAT TO DO:
 * 1. Make a class FyersApi2
 * 2. How can we handle multiple instances of FyersApi2 with different tokens
 * 3. How can we handle multiple websocket connections with different tokens
 *
 *
 */
import axios from "axios"
import * as helper from "./helper"
import { apiUrls } from "./helper"
import { IConvertPosition, IMarketDataHistory, IModifyOrder, IOrder } from "./types"
const apiUrl = "https://api.fyers.in/api/v2/"
const dataApiUrl = "https://api.fyers.in/data-rest/v2/"

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

class fyers {
    appId: string
    secretId: string
    redirectUrl: string
    constructor(appId: string, secretId: string, redirectUrl: string) {
        this.appId = appId
        this.secretId = secretId
        this.redirectUrl = redirectUrl
    }
    async generateLoginUrl() {
        const client_id = this.appId
        const redirect_uri = this.redirectUrl
        const state = "sample_state"
        return `${apiUrl}generate-authcode?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code&state=${state}`
    }
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
    async getProfile(token: string) {
        try {
            return await request(apiUrls.profile, "GET", {}, getAuthToken(this.appId, token))
        } catch (error: any) {
            return error
        }
    }
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
            return await request(apiUrls.convertPosition, "POST", data, getAuthToken(this.appId, token))
        } catch (error: any) {
            return error
        }
    }
    async getMarketDataHistory(token: string, data: IMarketDataHistory) {
        try {
            return await request(apiUrls.marketDataHistory({ ...data }), "POST", data, getAuthToken(this.appId, token))
        } catch (error: any) {
            return error
        }
    }
}
