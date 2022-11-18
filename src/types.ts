// --------| types |--------
interface IOrder {
    symbol: string // "NIFTY 50"
    qty: number // 1
    type: number // 1 for limit order, 2 for market order, 3 for stop loss order, 4 stop limit order
    side: number // 1 for buy -1 for sell
    productType: string // CNC: For equity only INTRADAY: Applicable for all segmentsMARGIN: Applicable only for derivativesCO: Cover order,BO: Bracket order
    limitPrice: number //default 0Provide valid price for Limit and Stoplimit orders
    stopPrice: number //default 0Provide valid price for Stop and Stoplimit orders
    disclosedQty: number// default 0 allowed only for Equity orders
    validity: string //DAY: Valid for the dayIOC: Immediate or cancel
    offlineOrder: string //False: When market is open True: When placing AMO order
    stopLoss: number //default 0Provide valid price for CO and BO orders
    takeProfit: number //default 0Provide valid price for BO orders
}
interface IModifyOrder {
    id: number // order id to be modified
    limitPrice: number //default 0 Provide valid price for Limit and Stoplimit orders
    stopLoss: number //default 0 Provide valid price for CO and BO orders
    quantity: number
    type: number // 1 for limit order, 2 for market order, 3 for stop loss order, 4 stop limit order
}
interface IConvertPosition {
    symbol: string
    positionSide: number // 1 for long -1 for short
    convertQuantity: number // Quantity to be converted, Has to be in multiple of lot size for derivatives
    convertFrom: string // "CNC" or "MARGIN"
    convertTo: string // "CNC" or "MARGIN"
}
interface IMarketDataHistory {
    symbol: string
    resolution: string // D, 1, 5, 15, 30, 60, 120, 240, 360, 720, 1D, 1W, 1M
    dateFormat: string
    from: string
    to: string
    flagCount: number
}

export { IOrder, IModifyOrder, IConvertPosition, IMarketDataHistory }
