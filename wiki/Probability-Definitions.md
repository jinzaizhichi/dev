Probability Definitions
===

Random Variable
---

For input space $\Omega$ and output space $G$, a random variable
is a function that, for each "event" $\omega \in \Omega$, assigns a probability
and value $g(\omega) \in G$:

$$
X = g(\omega) \text{, with probability } p _ { \omega }
$$

Shannon Entropy
---

$$
H(p) = - \sum_{x} p(x) \lg p(x)
$$

Conditional Entropy
---

$$
H(X | Y) = \sum _ {x,y} p(x,y) \lg \left( \frac{p(x,y)}{p(x)} \right)
$$

Mutual Information
---

$$
\begin{array}{ll}
I(X;Y) & = H(X) - H(X | Y) \\\\
 & = D _ {KL} \left[ \ p(x , y) \ || \ p(x) \cdot p(y) \ \right] \\\\
 & = D _ {KL} \left[ \ p(x | y) \ || \ p(x) \ \right] \\\\
 & = D _ {KL} \left[ \ p(y | x) \ || \ p(y) \ \right] \\\\
\end{array}
$$

Expectation on Transformed Random Variable
---

$$
\begin{array}{ll}
E [ f ( X ) ] = \sum _ { k } p _ k f( x _ k )
\end{array}
$$


Cross Entropy
---

$$
H(p,q) = - \sum_{x} p(x) \lg q(x)
$$

Kullback-Leilbler Divergence
---

$$
\begin{array}{ll}
D_{KL} (p || q) & = - \sum_{k} p(x) \lg \frac{q(x)}{p(x)} \\\\
 & = - \left( \sum_{x} p(x) \lg q(x) - p(x) \lg p(x) \right)
\end{array}
$$

Poisson Point Process
---

The term is ambiguous, so there are a few definitions and interpretations.

### Point Counts

$$
\begin{array}{ll}
\Pr\{ N = n \} & = \frac{\mu^n}{n!} e^{-\mu}
\end{array}
$$

$$
\to \mu = E[ N ]
$$

### Point Process on Line


$$
\begin{array}{ll}
\Pr\{ N(a,b] = n \} & = \frac{[\mu(b-a)]^n}{n!} e^{-\mu(b-a)} \\
\Pr\{ N(a _ i ,b _ i ] = n _ i, i \in [0,k)  \} & = \prod _ {i=0}^{k-1} \frac{[\mu(b _ i -a _ i )]^{n _ i}}{n _ i !} e^{-\mu(b _ i - a _ i)}
\end{array}
$$

Where $a _ i < b _ i \le a _ {i+1}$.

### Spatial Point Process

$B \subset \mathbb{R}^d$ and  $B _ i \subset \mathbb{R}^d$, $\forall i,j, B _ i \cap B _ j = \emptyset$

$$
\begin{array}{ll}
\Pr\{ N(B) = n \} & = \frac{ (\mu |B|)^n}{n!} e^{-\mu |B|} \\
\Pr\{ N(B_i) = n_i, i \in [0,k) \} & = \prod _ {i=0} ^ {k-1} \frac{ (\mu |B_i|)^n_i}{n _ i!} e^{-\mu |B_i|} \\
\end{array}
$$



### Counting Process

$$
\begin{array}{ll}
\Pr\{ N(t) = n \} & = \frac{(\mu t)^n}{n!} e^{-\mu t}
\end{array}
$$

$$
\to E[ N(t) ]  = \mu t
$$



Maximum Likelihood Estimation
---

todo

###### 2020-06-12
