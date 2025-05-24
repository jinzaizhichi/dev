Analysis In A Nutshell
===

Cauchy Convergence Test
---

$$
\begin{array}{ll}
S = \sum _ {k=0}^{\infty} a _ k < \infty \iff & \forall \epsilon > 0, \exists N \in \mathbb{N} \\
& \forall n > N, p \ge 0 \ \  (n,p \in \mathbb{N}) \\
& \left| \sum\limits _ {s=n}^{n+p-1} a _ {s} \right| < \epsilon
\end{array}
$$

Cauchy Condensation Test
---

$$
\begin{array}{ll}
a _ k \ge a _ {k+1} & \\
\sum\limits _ {k = 1} ^ {\infty} a _ k = c _ 0 < \infty & \iff \sum\limits _ {k=0} ^ {\infty} 2^k a _ {2^k} \le c _ 1 < \infty \\
\end{array}
$$

Proof:

$$
\begin{array}{ll}
& a _ 1 + a _ 1 + a _ 2 + a _ 2 + a _ 3 + a _ 4 + a _ 4 + a _ 5 +   \dots \\
 = & a _ 1 + (a _ 1 + a _ 2) + (a _ 2 + a _ 3 + a _ 4 + a _ 4) + a _ 5 +  \dots \\
 > & a _ 1 + 2 a _ 2 + 4 a _ 4 + 8 a _ 8  + \dots = \sum 2^k a _ {2^k} \\
\to & 2 \sum\limits _ {k=1}^{\infty} a _ k > \sum\limits _ {k=0}^{\infty} 2^k a _ {2^k} \\
\end{array}
$$

$$
\begin{array}{ll}
 & a _ 1 + a _ 2 + a _ 2 + a _ 4 + a _ 4 + a _ 4 + a _ 4 + a _ 8 + a _ 8 + \dots \\
 > & a _ 1 + a _ 2 + a _ 3 + a _ 4  + a _ 5 + a _ 6 + a _ 7 + a _ 8 + a _ 9 + \dots \\
 = & \sum\limits _ {k=1}^{\infty} a _ k \\
\to & \sum\limits _ {k=0}^{\infty} 2 ^k a _ {2^k} > \sum _ {k=1} ^ {\infty} a _ k \\
\end{array}
$$

Extra:

$$
\frac{1}{2} \sum\limits _ {k=0}^{\infty} 2^k a _ {2^k} < \sum\limits _ {k=1}^{\infty} a _ k < \sum\limits _ {k=0}^{\infty} 2^k a _ {2^k}
$$


###### 2018-08-29
