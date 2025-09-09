2008 Financial Crisis Summary
===

([src](https://www.youtube.com/watch?v=VlOjcOp9a5U))

Overview
---

* Circa 1990 to 2000, CDOs and CDSs started proliferating with regulations being relaxed and bank appetites
  increasing to provide more financial instruments to invest in, especially with high
  credit ratings
  - regulations were eventually relaxed to allow CDSs for non owned bonds
* The CDOs and CDSs allowed mortgage originators to create mortgages and sell/offload the mortgage,
  divesting direct mortgage originators risk and any repercussions of any risky lending
* 2000-2007, effective guarantee of purchase for these mortgages creates perverse
  incentives for mortgage lenders who start loosening credit standards (e.g. low "teaser rates",
  no credit checks, no income verification, no assets needed, 0% down payment, 2-year 0% APR, etc.)
* 2004-2005 handful of investors realize high correlation of sub-prime mortgages could yield
  large defaults and buy cheap CDS on sub-prime (?) mortgages
* 2006-2007 some trading desks noticed as well and started shorting CDSs but quickly (1 year+)
  lost their nerve and started hedging with long protection
* Correlation matrix of underlying bonds is hard to calculate, so simplifying assumption is
  that there's a fixed/global correlation between all assets within a tranche.
  - Apparently, assuming fixed correlation per tranche and backing into the correlation produces
    a stable curve of tranche vs. correlation value
  - This stable curve gave false confidence to investors by discounting correlation and the risk
    of correlated default
* 2007 bulk of teaser rates started ending
* 2008 market starts crashing
  - senior bonds are more negatively impacted in the event of correlated loss,
    leading to higher losses from long senior CDOs than was recouped from short equity CDOs
  
My take is that the first causal effect was relaxation of regulations (repeal of [Glass-Steagall](https://en.wikipedia.org/wiki/Glass%E2%80%93Steagall_legislation))
that opened the way for banks to take riskier strategies.
The appetite for risk increased
and sent a signal throughout the chain, eventually leading to mortgage originators who saw an arbitrage opportunity to
unethically write bad mortgages and offload the risk by packing the sub-prime mortgages into CDOs that were papered over with a investment
grade ratings.

One argument is that the CDS and CDO financial instruments in and of themselves were novel and valuable but the environment
in which they were created, modified and used was a vector for abuse.
The hedging of CDSs and CDOs by the bigger firms amplified the losses when the correlated mass of sub-prime mortgages started defaulting.

It's easy to blame the mortgage originators but, from what I understand, the bulk of the sub-prime mortgage lending was at the tail end
of the bubble (circa 2005-2007) with originators progressively loosening standards.
This meant mortgage originators were testing how much they could get away with, slowly offering mortgages to more and more people who
didn't have income or assets and progressively offering more lucrative teaser rates.
As the mortgage originators learned there was no significant push back from regulators or banks and with the ability to offload the
risk immediately, they eventually resorted to underwriting toxic mortgages.

It's not clear to me whether the models assumed little to no correlation between tranches and/or
the simple within tranche correlation led to a misunderstanding of the risk, but whatever modelling
was used didn't account for large pools of correlated defaults.
A "black swan" event, where mortgages defaulted en-masse, wasn't identified by the modeling, leading
to a false sense of protection from risk.

I don't know how much worse it made the crisis, but the further mis-understanding of where and how to hedge amplified losses.

While it may seem like a "perfect storm" of bad issues, a lot of the events are correlated.

Deregulation meant banks now had a pool of money available for investment and an increatged appetite for risk.
Increased investment appetite meant there was a demand for more instruments that could handle demand along
with pressure to make those instruments seem less risky then they might have been.

The newly created instruments created an increased demand for the underlying mortgages.
Everyone is making money so people want to accept models that allow them to keep making money
while quieting dissent.

To be in a position to even understand that there was something fundamentally wrong, they would have to understand
what a CDS and CDO is, how they were being repackaged and what the average lending terms of the underlying mortgages
were.
Or they needed to understand the pricing models and how their assumptions were being violated, or could be violated,
in the climate pre-meltdown.

If the "Big Short" is any indication of truth, the few people who understood what was going on were ones that had a detailed
view of the toxic mortgages being issued and/or had a deep understanding of the models.



Glossary
---

| Term | Description |
|------|-------------|
| Bond | Cash flows, $(c _ 0, c _ 1, \dots, c _ {N-1})$, payed at times, $(t _ 0, t _ 1, \dots, t _ {N-1})$, subject to interest rate curve $r(t)$, bond price $\sum _ {k=0}^{N-1} c _ k e ^ { - r ( t _ k ) t _ k }$ |
| U.S. Treasury Bond | Bond with fixed cashflows (e.g. $c _ k = 2.5\%$) that additionally pays face value (e.g. $\$100$) at the last payment ($c _ {N-1} = c + v$) |
| Corporate Bond | $\lambda$ default rate (Poisson rate), price $\sum _ {k=0} ^ {N-1} c _ k e ^ { - r (t _ k) t _ k} e ^ { -\lambda t _ k} = \sum c _ k e^ { -R (t _ k) t _ k}$ |
| Tranche | Piece or slice. In this context, a synthetic structure to allocate incoming cashflows so that higher tranches that get paid first, with other payments waterfalling down |
| Bond Rating | `AAA, AA+, AA, AA-, A+, A, A-, BBB+ BBB, BBB-, BB+, BB, BB-, B+, B, B-, CCC-C` |
| Investment Grade Bonds | `AAA, AA+, AA, AA-, A+, A, A-, BBB+ BBB, BB-` |
| Junk Bonds | aka "High Yield" bonds. `BB+, BB, BB-, B+, B, B-, CCC-C` |
| Mortgage | Self Amortizing Bond, fixed cashflow amount schedule but structured so that principal is paid off with each payment (e.g. 30 year mortgage at 5% APR) |
| Collaterized Debt Obligation (CDO) | Financial instrument collecting (corporate) bonds with a tranche structure to allow for tranches with better known risk |
| Special Purposes Investment Vehicle (SPIV) | Bespoke company (e.g. subsidiary of a bank) that purchases diversified corporate bonds and creates financial instruments (CDOs) with tranche structures for investment |
| $CDO^2$ | A CDO build from CDOs. Note that dependence now gets complicated as there is a path dependence here |
| Commercial Mortgage Backed Securities (CMBS) | CDOs of commercial mortgages |
| Residential Mortgage Backed Securities (RMBS) | CDOs of residential mortgages |
| Credit Default Swap (CDS) | Insurance on bonds, guaranteeing the bond will not default by paying an insurance premium if it does |
| Over the Counter (OTC) | Private contracts between two individuals with no need to report to regulatory agencies |


