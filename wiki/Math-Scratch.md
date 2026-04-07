Math Scratch
===

Tonelli-Shanks Algorithm
---

$p$ an odd prime, $n s.t. \left( \dfrac{a}{p} \right) = 1$.

Find $Q 2^s = p-1$ and consider:

$$
\begin{array}{ll}
 & R \equiv n^{\frac{Q+1}{2}} (\bmod p ) \\
\to & R^2 = n^{Q+1} = n \cdot n^Q (\bmod p ) \\
\end{array}
$$

If $n^Q \equiv 1 ( \bmod p ) \ \to \ R \equiv \sqrt{n} ( \bmod p )$.

Otherwise ( $n^Q {\not \equiv} 1 ( \bmod p )$ ), $n^Q$ is a $2^{s-1}$'th root of unity:

$$
(n^Q)^{2^{s-1}} \equiv n ^ { \frac{Q 2^s}{2}} \equiv n ^ {\frac{p-1}{2}} ( \bmod p )
$$

...

[wiki](https://en.wikipedia.org/wiki/Tonelli%E2%80%93Shanks_algorithm)


Quadratic Gauassian Sum
---

$$
\begin{array}{ll}
g(a;p) & = \sum _ {k=0} ^ {p-1} e^{2 \pi i a k^2 / p } \\
 & = \sum _ {k=0}^{p-1} (1 +  \left( \dfrac{a}{p} \right) ) e^{ 2 \pi i a k / p } \\
\end{array}
$$

$$
g(a;p) = \left( \dfrac{a}{p} \right) g(1;p)
$$

$$
G(a,b,c) & = \sum _ {k=0} ^{c-1} e ^ {2 \pi i (a k^2 + b k) / c }
$$

For $c$ odd, $\epsilon _ c = (1,i)$:

$$
G(a,c) = G(a,0,c) = \epsilon _ c \sqrt{c} \left( \dfrac{a}{c} \right)
$$

[wiki](https://en.wikipedia.org/wiki/Quadratic_Gauss_sum)

###### 2026-04-06
