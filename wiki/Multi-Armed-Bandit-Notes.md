Multi Armed Bandit Notes
===

The canonical setup is that you have $K$ slot machines each with a fixed but
unknown probability of winning, $\theta _ k$, with the goal of minimizing regret
after $T$ rounds ( $T \in \[0,\infty\]$ ).

Some common examples are:

| Name | Reward | Prior |
|---|---|---|
| Beta-Bernoulli Bandit | 0 or 1 | Beta distribution |
| Gaussian Bandit | $\mathbb{R}$ | Gaussian |

Some common algorithms are:

| Name | Notes |
|---|---|
| $\epsilon$-greedy | Simple but often not very good |
| UCB1 | Good but often perfoms worse than Thompson (?) |
| Thompson Sampling | Good (?) |
| EXP3 | Works in advesarial settings but has ubounded regret by necessity |

Extensions involve assuming delayed feedback, non-stationary systems, and contextual
systems.

### Regret

$$
\begin{array}{l}
  \text{regret} _ t (\theta) = \max _ k (\theta _ k - \theta _ {a _ t}) \\
\end{array}
$$

Bernoulli Bandits (Thompson Sampling)
---

$K$ bandits, each with a fixed parameter $\theta _ k$ that determines
the reward, $R(k) = \{0,1\}$.

$$
\begin{array}{l}
\theta = ( \theta _ 0, \theta _ 1, \dots, \theta _ {K-1} ) \\
R( k ) = \left\\{
\begin{array}{ll}
 1  & \text{w/ prob } \theta _ k \\
 0  & \text{w/ prob } 1-\theta _ k \\
\end{array}
\right. \\
\text{Beta}(x | \alpha, \beta) = \frac{\Gamma(\alpha + \beta)}{\Gamma(\alpha) \Gamma(\beta)} x^{\alpha-1} (1-\beta)^{\beta-1} \\
\end{array}
$$

$$
\begin{array}{l}
  \text{BernoulliBanditThompsonSampling} \\
  \hline
  \begin{array}{l}
  \text{for } t \in [0,T): \\
    \begin{array}{l}
    \text{for } k \in [0,K): \widehat{\theta} _ k \sim \text{beta}(\alpha _ k, \beta _ k) \\
    a _ t = \arg\max _ k \widehat{\theta } _ k \\
    r _ t = R(a _ t) \\
    \alpha _ k = \alpha _ {a _ t} + r _ t \\
    \beta _ k = \beta _ {a _ t} + (1-r _ t) \\
    \end{array}
  \end{array}
\end{array}
$$


Gaussian Bandits (Thompson Sampling)
---

I guess we have to assume bandits have Gaussian distributions
drawn from the prior meta parameters $w _ k = ( m _ k, \nu _ k, \alpha _k , \beta _ k )$, with:

$$
\begin{array}{ll}
 m _ k & \equiv \text{ prior mean } \\
 \nu _ k & \equiv \text{ prior count } \\
 \alpha _ k & \equiv \text{ prior shape } \\
 \beta _ k & \equiv \text{ prior scale } \\
\end{array}
$$

Below:

$$
\begin{array}{ll}
 N _ t ( k ) & = \sum _ {\tau = 0} ^ {t-1} \mathbb{1} _ {k = a _ \tau} \\
 r _ t & = R ( a _ t ) \\
 \bar{ x } _ {t,k} & = \frac{1}{N _ t ( k) } \sum _ {\tau = 0} ^ {t-1} \mathbb{1} _ { k = a _ \tau} r _ t \\
 s _ {t,k} & = \sum _ {\tau = 0} ^ {t-1} \mathbb{1} _ {k = a _ \tau} ( r _ {\tau} - \bar{x} _ {t,k} ) ^2 \\
\end{array}
$$

So $\bar{x} _ {t,k}$ and $s _ {t,k}$ are the observed mean and variance at time $t$ and bandit $k$, respectively.

$$
\begin{array}{l}
  \text{GaussianBanditThompsonSampling} \\
  \hline
  \begin{array}{l}
    \text{for } t \in [0,T): \\
    \begin{array}{l}
      \text{for } k \in [0,K): \\
      \begin{array}{l}
        \widehat{ \sigma } ^ 2 _ k \sim \mathcal{IG}(\frac{1}{2} N_t(k) + \alpha _ k, \beta _ {t,k} ) \\
        \widehat{ \mu } _ k \sim \mathcal{N}( \rho _ {t,k}, \frac{ \widehat{\sigma} ^ 2 _ k }{ N _ t ( k) + \nu _ k) } ) \\
      \end{array} \\
      a _ t = \arg\max _ { k \in [0,K) } \mathbb{E} [ X _ t |  \widehat{ \mu } _ k, \widehat{ \sigma } ^ 2 _ k ] = \arg\max _ {k \in [0,K)} \widehat { \mu } _ k \\
      r _ t = R ( a _ t ) \\
      N _ {t+1} (a _ t) = N _ t ( a _ t ) + 1\\
      \bar{x} _ {t+1,k} = \bar{x} _ {t,k} + \frac{1}{ N _ t(k) + 1} ( X _ t - \bar{x} _ {t,k} ) \\
      s _ {t + 1, k} = s _ {t,k} + r _ t ^ 2 + N _ t (k) \bar{x} ^ 2 _ {t,k} - N _ {t+1} (k) \bar{x}^2 _ {t+1, k} \\
      \rho _ {t+1,k} = \frac{ \nu _ k m _ k + N _ {t+1} ( k ) \bar{x} _ {t+1,k} }{ \nu _ k + N _ {t+1} (k) } \\
      \beta _ { t+1, k } = \beta _ k + \frac{s _ {t+1,k}}{2} + \frac{ N _ {t+1}(k) \nu _ k ( \bar{x} _ {t+1,k} - m _ k) ^2 }{ 2 (N _ {t+1} ( k )  + \nu _k } \\
    \end{array}
  \end{array}
\end{array}
$$

([src](https://gertjanvandenburg.com/blog/thompson_sampling/), [inverse gamma](https://en.wikipedia.org/wiki/Normal-inverse-gamma_distribution))

EXP3
---

$$
\begin{array}{l}
  \text{EXP3}(\gamma \in [0,1]) \\
  \hline
  \begin{array}{l}
    \text{for } k \in [0,k): w _ {0,k} = 1 \\
    \text{for } t \in [0,T): \\
    \begin{array}{l}
      \text{for } k \in [0,K): \\
      \begin{array}{l}
        p _ {t,k} = (1 - \gamma) \frac{ w _ {t,k} }{ \sum _ {a=0}^{K-1} w _ {t,a} } + \frac{\gamma}{K}  \\
      \end{array} \\
      a _ t \sim (p _ {t,0}, p _ {t,1} , \dots, p _ {t,K-1} ) \\
      r _ t = R ( a _ t ) \\
      w _ {t + 1, a _ t} = w _ {t,a _ t} \exp( \gamma r _ t / ( K p _ {t, a _ t} ) ) \\
    \end{array}
  \end{array}
\end{array}
$$



References
---

* ["Adversarial Bandits and the EXP3 Algorithm"](https://www.jeremykun.com/2013/11/08/adversarial-bandits-and-the-exp3-algorithm/)
* ["Bandits and Stocks"](https://www.jeremykun.com/2013/12/09/bandits-and-stocks/)
* ["An Exploration of Thompson Sampling"](https://gertjanvandenburg.com/blog/thompson_sampling/)

###### 2025-11-01
