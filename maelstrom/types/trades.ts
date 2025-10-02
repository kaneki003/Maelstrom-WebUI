import { Token } from "./token"

export interface BuyTrade{
  token: Token
  buyPrice: string
  imapct: string  //10% for say
  timestamp: number
}

export interface SellTrade{
  token: Token
  sellPrice: string
  impact: string
  timestamp: number
}

export interface SwapTrade{
    tokenIn: Token
    tokenOut: Token
    amountIn: string
    amountOut: string
    sellPrice: string
    buyPrice: string
    timestamp: number
}

export interface Deposit{
    token: Token
    ethAmount: string
    tokenAmount: string
    lpTokensMinted: string
    timestamp: number
}

export interface Withdraw{
    token: Token
    lpTokensBurnt: string
    ethAmount: string
    tokenAmount: string
    timestamp: number
}

export interface SwapRequest{
  tokenIn: Token,
  tokenOut: Token,
  amountIn: string,
}

export interface SellRequest{
  token: Token,
  amountIn: string,
}

export interface BuyRequest{
  token: Token,
  amountIn: string
}

export interface DepositRequest{
  token: Token,
  ethAmount: string
  tokenAmount: string
}

export interface WithdrawRequest{
  token: Token,
  lpTokenAmount: string
}

export interface SwapResult{
  success: boolean
  txHash: string
  swapRequest: SwapRequest
  amountOut: string
  timestamp: number
  fee: string
  error?: string
}

export interface SellResult{
  success: boolean
  txHash: string
  sellRequest: SellRequest
  amountOut: string
  timestamp: number
  fee: string
  error?: string
}

export interface BuyResult{
  success: boolean
  txHash: string
  buyRequest: BuyRequest
  amountOut: string
  timestamp: number
  fee: string
  error?: string
}

export interface DepositResult{
  success: boolean
  txHash: string
  depositRequest: DepositRequest
  lpTokensMinted: string
  timestamp: number
  error?: string
}

export interface WithdrawResult{
  success: boolean
  txHash: string
  withdrawRequest: WithdrawRequest
  tokenAmount: string
  ethAmount: string
  timestamp: number
  error?: string
}