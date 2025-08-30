Simple Inequalities
===

$$
\begin{align}
x  _ 0 \le x \le x _ 1 &, \ \ \   x _ 0 , x, x _ 1 \in \mathbb{R} \\
f(x _ 0) \ge g(x _ 0), & \ \ \ f'(x) \ge g'(x) \\
\to & \ \ \ f(x) \ge g(x)
\end{align}
$$

---

For (real), bounded, continuous functions of one variable,
explicit formulas for the error term of the remainder on the Taylor
series can be used to get bounds on functions.

Let $f: \mathbb{R} \to \mathbb{R}$ be $n+1$ differentiable over
a closed interval between $x _ 0$ to $x$, then:

$$
\begin{array}{ll}
\exists x _ * , & x _ 0 \le x _ * \le x , \\
f(x) & = [ {\sum} _ { k=0 } ^ { n } \frac { f ^ { (k) }( x _ 0 ) } { k! } (x-x _ 0) ^ { k } ] + \frac { f ^ { (n+1) } ( x _ * ) } { (n+1)! } (x-x _ 0) ^ { n+1 } \\
\end{array}
$$

Where the last term is the Lagrange form of the mean value form of the remainder ([src](https://en.wikipedia.org/wiki/Taylor%27s_theorem)).

By restricting to an interval where you know the remainder term is of one sign, you can get explicit inequalities ([mo](https://math.stackexchange.com/questions/78261/using-taylor-series-expansion-as-a-bound)).

---

**Claim**: $0 \le x \le 1 , 1 - x \le e ^ { -x }$


$$
\begin{array}{llr}
e ^ { -x } & = 1 - x e ^ { x _ * } \\
\forall x _ * , & 0 \ge x _ * \ge 1, \\
 &  0 \le e ^ { -x _ * } \le 1 \\
 \to & -e ^ { -x _ * } \ge -1 \\
 \to & -x e ^ { -x _ * } \ge -x  & (x \ge 0) \\
 \to & 1 - x e ^ { -x _ * } \ge 1 - x  \\
 \to & e ^ { -x } \ge 1 - x \\
 \to & 1 - x \le e ^ { -x }
\end{array}
$$

---

**Claim**: $\frac { \pi } { 2 } \ge x \ge 0, x \ge sin(x)$

$$
\begin{array}{llr}
\sin(x) & = x - \frac { x ^ 3 } { 3! } \cos( x _ * ) \\
\forall x _ * , & 0 \le x _ * \le \frac { \pi } { 2 }, \\
 & 0 \le \cos( x _ * ) \le 1 \\
\to & \frac { x ^ 3 } { 3! } \cos( x _ * ) \ge 0 & (\frac { \pi } { 2 } \ge x \ge 0) \\
\to & -\frac { x ^ 3 } { 3! } \cos( x _ * ) \le 0 \\
\to & x -\frac { x ^ 3 } { 3! } \cos( x _ * ) \le x \\
\to & \sin( x )  \le x \\
\to & x \ge \sin( x )  \\
\end{array}
$$

---

**Claim**: $0 < x < 1, \ln(1+x) < x < -\ln(1-x)$

...


---

$$
\begin{array}{llr}
n \ge k & \to & -n \le -k \\
 & \to & nk - n \le nk - k \\
 & \to & n(k - 1) \le k(n - 1) \\
 & \to & \frac{n}{k} \le \frac{n - 1}{k-1} \\
 & \to & \frac{n}{k} \le \frac{ n - 1}{k-1} \\
 & \to & ( \frac { n } { k } ) ^ k \le {\prod} ^ { k-1 }  _ { j=0 }  \frac { n-j } { k-j } \\
 & \to &  (\frac{n}{k})^k \le { n \choose k } \\
\end{array}
$$

---

**Claim**: $h > -1, n \in \mathbb{N} \to \boxed{ (1+h)^n \ge 1 + hn }$

(Bernoulli's inequality)

$ n = 0 \to 1 \ge 1 $

Assume true $\forall k < n+1$:

$$
\begin{array}{llr}
(1+h)^{n+1} & = (1+h)^n (1+h) \ge (1 + hn) (1 + h) & \\
 & = 1 + hn + h + h^2 n & \\ & = 1 + (n+1)h + h^2n & \\ & \ge  1 + (n+1)h & \\
 & & \blacksquare \\
\end{array}
$$

---

**Claim**: $n \in \mathbb{N}, a _ i \ge 0 \to \boxed{ \frac{\sum\limits _ 0 ^ {n-1} a _ i}{n} \ge (\prod a _ i)^{\frac{1}{n}} }$

$a _ i = 0$ trivial, assume:

$$
a _ i > 0, 0 < a _ 0 \le a _ 1 \le a _ 2 \le \dots \le a _ {n-1}
$$

$$
\begin{array}{ll}
& 0 < a _ i  \le 1 \\
\to & ( \sum a _ i)^n \ge (\sum a _ 0)^n = n^n a _ 0 ^ n \\
 & \ge n ^ n \prod a _ i \\
\end{array}
$$

Now,

$$
\begin{array}{llr}
 ( \sum a _ i)^n & = a _ {n-1}^n ( \sum \frac{a _ i}{a _ {n-1}})^n & \\
 & \ge a _ {n-1}^n n ^ n a _ 0 ^n & \\
 & \ge a _ {n-1}^n n^n \prod( \frac{a _ i}{a _ {n-1}} )& \\
 & = n^n \prod a _ i & \\
 & & \blacksquare
\end{array}
$$

---

$M \in \mathbb{R}^{n,n}$, $m _ i \mathbb{R}^n$, $M = [ m _ 0, m _ 1, \dots, m _ {n-1} ]$

$$
\begin{array}{ll}
M & = \begin{bmatrix} m _ 0 ^{ * } & m _ 1 ^ { * } & \dots & m _ {n-1} ^ { * } \end{bmatrix}
\begin{bmatrix}
1 & m _ {1,0} & m _ {2,0} & \dots \\
0 & 1  & m _ {2,1} &  \dots \\
0 & 0 & 1  &  \dots \\
\vdots & \vdots & \vdots & \ddots \\
\end{bmatrix} \\
 & = G T
\end{array}
$$

Where $G$ is the array of Gramm-Schmidt vectors, $T$ hold method of Gramm-Schmidt construction.

$$
\begin{array}{llr}
\det(M) & = \det(G) \det(T) = \det(G) & \\
 & = \prod m _ i ^ { * } \le \prod | m _ i | & \\
\to & \boxed{ \det(M) \le \prod | m _ i | } & \\
& & \blacksquare \\
\end{array}
$$


###### 2021-03-15
