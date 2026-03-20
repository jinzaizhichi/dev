Central Limit Theorem
===

An intuitive argument of the central limit theorem is as follows:

* Consider $n$ independent, $X _ i$, identically distributed random variables with mean 0 and uniform probability density
  function, $f(x)$, on the interval $[-1/2, 1/2]$
* The convolution, $X = \sum _ {i=0}^{n-1} X _ i$ turns into multiplication when taking the Fourier transform of the probability density function
* The Fourier transform of a uniform distribution, $\hat{f}(w)$, is the $sinc(\cdot)$ function which behaves locally around 0 as $(1 - w^2)$
* The convolution to multiplication means that the product turns into $(1-w^2)^n \sim e^{-n w ^ 2}$
* The Fourier transform of a Gaussian is again Gaussian, and the result follows

If instead the exponent is taken to be $\alpha$ instead of $2$, $e^{ -n w ^ \alpha}$, with $\alpha \in (0,2]$, a Levy stable distribution results.


---

This is a quick proof of the central limit theorem.

The basic idea is as follows:

* The moment generating function of a Normal distribution is again a Normal distribution
* Two distributions that have the same moment generating function are/converge to the same underlying distribution
* The sum of uniform random variables is a convolution
* The Fourier transform of the sum of uniform random variables turns the convolution into a simple product
* The simple product (of the Fourier transform of the convolution of uniform random variables) converges to (the Fourier transform/moment generating function of) a Normal distribution

The proof is restricted to the simple case of identical uniform distributions centered at zero for simplicity.

With any luck, we can then show an extension, where if we replace the product of transformed random variables with something else,
we get Levy stable distributions or something that shows the motivation for it.

I won't be proving here that if the moment generating functions of two distributions are equal then the underlying distributions
are equal.

$ M_{N(\mu,\sigma)}(t) = N( \beta, \gamma ) $
---

First let's quickly show that the moment generating function of a Normal is again Normal:

$$
\begin{array}{c}
M_{X}(t) \stackrel{def}{=} E[e^{t X}] = \sum_{k=0}^{\infty} t^k E[X^k]  = \int_{-\infty}^{\infty} e^{t x} f_X(x) dx \\
\end{array}
$$

$$
\begin{array}{cl}
M_{N(\mu,\sigma)}(t) & = \frac{1}{\sqrt{2 \pi \sigma^2}} \int_{-\infty}^{\infty} e^{t x} e^{ -\frac{(x - \mu)^2}{2 \sigma^2}  } dx \\
 & = \frac{1}{\sqrt{2 \pi \sigma^2}} \int_{-\infty}^{\infty} \sigma e^{t (\sigma u + \mu) } e^{-\frac{u^2}{2}} du \\
 & = \frac{e^{t \mu}}{\sqrt{2 \pi }} \int_{-\infty}^{\infty} e^{ - \frac{1}{2} ( u^2  + 2 t \sigma  + \sigma^2 t^2) + \frac{t^2 \sigma}{2}  } du \\
 & = \frac{e^{t \mu} e^{\frac{t^2\sigma}{2} } }{\sqrt{2 \pi }} \int_{-\infty}^{\infty} e^{ - \frac{1}{2} ( u + \sigma t)^2 } du \\
 & = \frac{e^{t \mu} e^{\frac{t^2\sigma}{2} } }{\sqrt{2 \pi }} \int_{-\infty}^{\infty} e^{ - \frac{1}{2} v^2  } dv \\
 & = \frac{e^{t \mu} e^{\frac{t^2\sigma}{2} } }{\sqrt{2 \pi }} \sqrt{2 \pi} \\
 & = e^{t \mu} e^{\frac{t^2\sigma}{2} }  \\
\end{array}
$$


---


###### 2021-01-25

