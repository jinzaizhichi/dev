Complex Analysis in a Nutshell
===

$$
\begin{array}{l}
z \in \mathbb{C}, z = x + iy, x,y, \in \mathbb{R}  \\\\
u(x,y), v(x,y) \in \mathbb{R}^2 \mapsto \mathbb{R}  \\\\
f(z) = u(x,y) + iv(x,y), \ dz = dx + idy
\end{array}
$$

## Cauchy-Riemann Condition (for analyticy)

$$
\begin{array}{l}
f'(z) = \frac{f(z + dz) - f(z)}{z + dz - z} = \frac{f(z + dz) - f(z)}{dz} \\\\
= \frac{[ u(x+dx, y+dy) - u(x,y)] + i([v(x+dx,y+dy) - v(x,y)]}{dx + idy } \\\\
dx \to 0: f'(z) = -i \frac{\partial u}{\partial y} + \frac{\partial v}{\partial y} \\\\
dy \to 0: f'(z) = \frac{\partial u}{\partial x} + i \frac{\partial v}{\partial x} \\\\
\to \frac{\partial v}{\partial y} - i \frac{\partial u}{\partial y} = \frac{\partial u}{\partial x} + i \frac{\partial v}{\partial x} \\\\
\boxed{ \frac{\partial v}{\partial y} = \frac{\partial u}{\partial x}, \ \ -\frac{\partial u}{\partial y} = \frac{ \partial v}{\partial x} } \\\\
\end{array}
$$

## Greens Theorem: $\Omega$ analytic

![Green's Theorem](img/greens_theorem.svg#center)

$$
\begin{array}{l}
\boxed{ \int\limits _ {\partial \Omega} p\ dx = - \iint\limits _ {\Omega} p _ y\ dx\ dy }
\end{array}
$$

Proof:

$$
\begin{array}{llr}
\int\limits _ {\partial \Omega} p\ dx & = \int\limits _ { \Gamma _ 0} p(x,y) dx + \int\limits _ {\Gamma _ 2} p(x,y) dx & \\\\
 & = \int\limits _ {x _ 0}^{x _ 1} p(x, y _ 0) dx + \int\limits _ {x _ 1}^{x _ 0} p(x,y _ 1) dx & \\\\
 & = - \int\limits _ {x _ 0} ^ {x _ 1} ( p(x,y _ 1) - p(x, y _ 0)) dx & \\\\
 & = - \int\limits _ {x _ 0}^{x _ 1} \int\limits _ {y _ 0}^{y _ 1} p _ y \ dy \ dx & \\\\
 & & \blacksquare \\\\
\end{array}
$$


$$
\begin{array}{l}
\boxed{ \int\limits _ {\partial \Omega} q\ dy = \iint\limits _ {\Omega} q _ x\ dx\ dy }
\end{array}
$$

Proof:


$$
\begin{array}{llr}
\int\limits _ {\partial \Omega} q\ dy & = \int\limits _ { \Gamma _ 1} q(x,y) dy + \int\limits _ {\Gamma _ 3} q(x,y) dy & \\\\
 & = \int\limits _ {y _ 0}^{y _ 1} q(x _ 1,y) dy + \int\limits _ {y _ 1}^{y _ 0} q(x _ 0, y) dy & \\\\
 & = \int\limits _ {y _ 0} ^ {y _ 1} ( q(x _ 1, y) - q( x _ 0, y)) dy & \\\\
 & = \int\limits _ {y _ 0}^{y _ 1} \int\limits _ {x _ 0}^{x _ 1} q _ y \ dx \ dy & \\\\
 & & \blacksquare \\\\
\end{array}
$$

## Cauchy Theorem

$f(z)$ analytic in $\Omega$:

$$
\begin{array}{ll}
\to &  \boxed{ \oint\limits _ {\partial \Omega} f(z)\ dz = 0 } \\\\
\end{array}
$$

Proof:

$$
\begin{array}{llr}
\oint\limits _ {\partial \Omega} f(z)\ dz & = \oint\limits _ {\partial \Omega} (u + iv)(dx + idy)  & \\\\
  & = \oint\limits _ {\partial \Omega} (u dx + - v dy) + i \oint\limits _ {\partial \Omega} ( u dy + v dx) & \\\\
  & = \iint\limits _ {\Omega} (- u _ y - v _ x ) dx\ dy + i \iint\limits _ {\Omega} ( u _ x - v _ y ) dx \ dy & \\\\
  & = 0 + 0i = 0 & \\\\
 & & \blacksquare \\\\
\end{array}
$$

## Singularities

### Type I (removable)

$$
\text{Def: } \lim\limits _ {z \to z _ 0} f(z) = \omega _ 0
$$

#### example

$$
\frac{\sin(z)}{z}
$$

$z=0$ undefined but:

$$
\frac{1}{z}(z - \frac{z^3}{3!} + \frac{z^5}{5!} - \dots ) = 1 - \frac{z^2}{3!} + \frac{z^4}{5!} - \dots = 1
$$
  
### Type II (pole)

$$
\text{Def: } \lim\limits _ {z \to z _ 0} |f(z)| = + \infty
$$

#### example

$$
\frac{1}{z}
$$

### Type III (essential)

Def: neither of the other two

#### example

$e^{\frac{1}{z}}$, $\ln(z)$

## Picards Theorem

(stated without proof)

Every punctured disc about an isolated essential singularity assumes every complex value with at most one exception.


## Riemann Mapping Theorem

$\Omega$ domain in $\mathbb{C}$.
There exists a 1-1 analytic (and conformal) mapping $f$ of $\Omega$ onto the open unit disc iff $\Omega$ is
simply connected but not equal to the entire plane $\mathbb{C}$.


## Misc.

$$
\begin{array}{ll}
 \oint\limits _ {C(0,1)} \frac{1}{z} dz & = \oint \frac{x - iy}{x^2 + y^2} (dx + idy) \\\\
 & = \int\limits _ {0} ^ {2 \pi} (\cos(t) - i \sin(t)) (-\sin(t) + i \cos(t)) dt \\\\
 & = \int\limits _ {0} ^ {2 \pi} (-cos(t)\sin(t) + \cos^2(t)) dt \\\\
 & = 2 \pi i
\end{array}
$$

$\frac{1}{z}$ is *not* analytic on interior of $C(0,1)$ (which is why Cauchy's theorem doesn't apply).

---

$$
\begin{array}{l}
\text{Res}(f(a)) = \lim\limits _ {z \to a} (z - a) f(z) \\\\
z = r e^{i \theta} \to \text{Arg}(z) = \theta \\\\
\end{array}
$$

$\text{Res}$ for *Residue*.

---

$f(z)$ not analytic at $z _ 0$.
Assume $g(z)$ analytic in $\Omega$.

$$
\oint\limits _ {\partial \Omega} \frac{g(z)}{z - z _ 0} dz = 2 \pi g(z _ 0)
$$

So,

$$
\oint\limits _ {\partial \Omega} \frac{g(z)}{z - z _ 0} dz = 2 \pi \text{Res}(f(z _ 0))
$$

in general,

$$
\boxed{ \oint\limits _ {\partial \Omega} f(z) dz = 2 \pi  i \sum\limits _ k \text{Res}(f(a _ k)) }
$$

---

$f(z)$ continuous on $\Gamma$, $|f(z)| \le M$ on $\Gamma$ and $L = $ length $\Gamma$

$$
\to \left| \int\limits _ {\Gamma} f(z) dz \right| \le \int\limits _ {\Gamma} |f(z)||dz| \le ML
$$

(ML inequality)

---

$f(z)$ analytic on $\Omega$, continuous on $\overline \Omega$

$$
\to \text{max}( |f(z)|) \in |f(w)|,\  w \in \partial \Omega
$$

(weak maximum modulus principle)

---

$$
n \in \mathbb{Z} \to \oint\limits _ C z^n dz = \left\\{ \begin{array}{ll}
 0 & n > 0 \\\\
2 \pi i  & n = 0 \\\\
0 & n < 0 \\\\
\end{array}
\right.
$$


$$
\begin{array}{ll}
p(z) & = \sum p _ j z^j \to p(z) z ^ {-k-1} = \sum p _ j z ^ {j - k -1} \\\\
 \to & \oint\limits _ C p(z) z^{-k-1} dz = \oint\limits _ C \sum p _ j z^{j-k-1} dz \\\\
  & = \sum \oint\limits _ C p _ j z^{j-k-1} dz \\\\
 & = p _ k \\\\
\to & p _ k = \oint\limits _ C p(z)z^{-k-1} dz
\end{array}
$$

###### 2025-05-24


