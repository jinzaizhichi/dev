Multi Armed Bandit Notes
===

$$
\begin{array}{l}
  \text{regret} _ t (\theta) = \max _ k (\theta _ k - \theta _ {a _ t}) \\
\end{array}
$$

Bernoulli Bandits
---

$K$ bandits, each with a fixed parameter $\theta _ k$ that determines
the reward, $R(k) = \{0,1\}$.

$$
\begin{array}{l}
\theta = ( \theta _ 0, \theta _ 1, \dots, \theta _ {K-1} ) \\
R( k ) = \left\{
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


###### 2025-11-01
