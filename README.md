# AFT Remittance

## Overview

AFT Remittance is a blockchain-powered platform that simplifies and optimizes money transfers to Ethiopia. We address two primary challenges: high fees and unfavorable exchange rates.

1. **Fee-Free Deposits**: Users can deposit funds into their AFT accounts using Zelle, a free and widely-accepted payment method.
2. **Onchain transfers**: Funds are securely transferred onchain, bypassing traditional banking systems and associated fees.
3. **Optimal Exchange Rates**: Our Proactive Market Maker (PMM) mechanism ensures competitive exchange rates for USD to Ethiopian Birr (ETB) conversion. Arbitrageurs incentivized to maintain optimal rates, making AFT a more cost-effective option.
4. **Democratization of Currency Conversion**: AFT allows anyone to participate in liquidity provision for the PMM. By providing liquidity, users can earn fees from swaps.

## PMM

Proactive Market Maker (PMM) algorithm is a unique and flexible approach to automated market making in decentralized finance (DeFi). Unlike traditional Automated Market Maker (AMM) systems, which operate on a fixed formula (e.g., Uniswap’s constant product model), the PMM algorithm adjusts prices dynamically based on market demand and liquidity needs. This design makes it especially effective for minimizing slippage and providing more stable and competitive pricing, which is crucial for USD to ETB conversions in remittance services

### How PMM Algorithm Works:

1. **Proactive Price Adjustments**: The PMM algorithm actively adjusts the buying and selling prices of assets by simulating the behavior of professional market makers. Instead of relying solely on fixed curves, it uses a flexible pricing formula that can shift liquidity closer to the market price. This reduces price slippage and maintains a more stable conversion rate for users, even in volatile markets.

2. **Concentration of Liquidity**: PMM concentrates liquidity near the market price of an asset pair, which improves the depth of the order book and makes trades more efficient. For USD to ETB conversions, this means that users can expect better exchange rates with lower spreads, maximizing the value of each remittance transaction.

3. **Incentivizing Arbitrageurs**: PMM creates incentives for arbitrageurs to keep prices in line with external market rates. If there is a price discrepancy between the onchain USD/ETB rate and the prevailing market rate, arbitrageurs can profit from correcting the imbalance. This self-correcting mechanism ensures that the USD to ETB exchange rate on the platform remains competitive and up-to-date.

4. **Flexible Asset Pricing**: Traditional AMMs often suffer from "impermanent loss" and price inefficiencies due to their rigid formulas (e.g., constant product formulas). PMM reduces this problem by using dynamic adjustments that respond to changes in order flow and market conditions, making it more cost-effective for remittances that involve currency conversion.
