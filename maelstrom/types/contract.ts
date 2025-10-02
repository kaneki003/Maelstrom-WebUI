import { Address } from "viem";
import { Config, UsePublicClientReturnType } from "wagmi";
import { WriteContractMutate } from "wagmi/query";
import { BuyRequest, BuyResult, BuyTrade, Deposit, DepositRequest, DepositResult, SellRequest, SellResult, SellTrade, SwapRequest, SwapResult, SwapTrade, Withdraw, WithdrawRequest, WithdrawResult } from "./trades";
import { LiquidityPoolToken, Token } from "./token";
import { Pool, Reserve } from "./pool";

export interface IContractClient{
    contractAddress: Address;
    writeContract: WriteContractMutate<Config, unknown>;
    readContract: UsePublicClientReturnType;

    initializePool(token: Address,ethAmount: string,tokenAmount: string,inititalBuyPrice: string,initialSellPrice: string) : Promise<void>;
    deposit(depositReq: DepositRequest) : Promise<DepositResult>
    witdraw(withdrawReq: WithdrawRequest) : Promise<WithdrawResult>
    swap(swapReq: SwapRequest) : Promise<SwapResult>
    buy(buyReq: BuyRequest) : Promise<BuyResult>
    sell(sellReq: SellRequest) : Promise<SellResult>

    getPool(token: Token) : Promise<Pool>
    getToken(token: Address) : Promise<Token>
    getLPToken(token: Address,user: Address) : Promise<LiquidityPoolToken>
    getReserves(token: Token) : Promise<Reserve>
    getTokenRatio(token: Token) : Promise<string>
    getBuyPrice(token: Token) : Promise<string>
    getSellPrice(token: Token) : Promise<string>
    getUserBalance(token: Token,user: Address) : Promise<Reserve>

    getBuyTradeEventLogs(fromBlock: number,toBlock: number,user?: Address) : Promise<BuyTrade[]>
    getSellTradeEventLogs(fromBlock: number,toBlock: number,user?: Address) : Promise<SellTrade[]>
    getSwapTradeEventLogs(fromBlock: number,toBlock: number,user?: Address) : Promise<SwapTrade[]>
    getDepositEventLogs(fromBlock: number,toBlock: number) : Promise<Deposit[]>
    getWithdrawEventLogs(fromBlock: number,toBlock: number) : Promise<Withdraw[]>

}