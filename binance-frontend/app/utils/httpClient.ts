import axios from "axios";
import { Depth, KLine, Ticker, Trade } from "./types";

const BASE_URL = "https://exchange-proxy.100xdevs.com/api/v1";


// GetTicker fetches ticker data for a specific market example current price of SOL/USDC.
export async function getTicker(market: string): Promise<Ticker> {
    const tickers = await getTickers();
    const ticker = tickers.find(t => t.symbol === market);
    if (!ticker) {
        throw new Error(`No ticker found for ${market}`);
    }
    return ticker;
}
const x = getTickers()

// Get tickers will return data for all the Markets we will be seeing in Markets Page.
export async function getTickers(): Promise<Ticker[]> {
    await new Promise(resolve => setTimeout(resolve, 1000));
     return [];
}

// will return all the bids and the asks for a specific market we are showing in DEPTH in page.tsx.
export async function getDepth(market: string): Promise<Depth> {   // We have also defined the types which is depth [string, string][].
    const response = await axios.get(`${BASE_URL}/depth?symbol=${market}`);
    return response.data;
}
//******************************************************** */
// This get Depth function and get Trades will be toether in same screen in 
// Alternate window where we will be seeing the order book and trades happening in real-time.


// ******************************************************* */

// get trades will return all the trades happening in a specific market.
export async function getTrades(market: string): Promise<Trade[]> {
    const response = await axios.get(`${BASE_URL}/trades?symbol=${market}`);
    return response.data;
}


// This things represent all the chart data we will be seeing in TradeView component.
// So when we are hitting the API we are getting the data in the manner of candle data .
// Having high,low,ope,close,vloume,start,trade etc.

export async function getKlines(market: string, interval: string, startTime: number, endTime: number): Promise<KLine[]> {
    const response = await axios.get(`${BASE_URL}/klines?symbol=${market}&interval=${interval}&startTime=${startTime}&endTime=${endTime}`);
    const data: KLine[] = response.data;
    return data.sort((x, y) => (Number(x.end) < Number(y.end) ? -1 : 1));
}

export async function getMarkets(): Promise<string[]> {
    const response = await axios.get(`${BASE_URL}/markets`);
    return response.data;
}