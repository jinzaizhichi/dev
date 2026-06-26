Brownian Motion Notes
===

| Definition | Description |
|---|---|
| Wiener Process |  continuous time cadlag stochastic process, with stationary independent increments |
| Brownian Motion | synonym for Wiener process |
| Brownian Bridge | Brownian motion that that starts at $0$ and ends at $0$ for a given time $T$ |
| Brownian Excursion | Brownian motion that that starts and end at $0$ at time $1$ and remains positive for $s, 0 < s < 1$ |

Brownian Motion (Wiener Process)
---

$$
\begin{array}{l}
0 \le s < t \le T \\
W(0) = 0 \\
W(t) - W(s) \sim \sqrt{t-s} N(0,1) \\
\end{array}
$$

Brownian Bridge
---

$$
\begin{array}{l}
0 \le t \le T \\
B _ {a,b} (t) = \frac{ a (T-t) }{T} + \frac{b t}{T} + (W(t) - \frac{t}{T} W(T)) \\
B _ {a,b} (t) \sim N(a + \frac{t}{T}(b-a), t - \frac{t^2}{T}) \\
\end{array}
$$

Brownian Excursion
---

Verlaat's transform:

$$
\begin{array}{l}
\tau = \arg \min _ t W  (t) \\
W ^ +  (t) = W ( (t+\tau) \bmod 1 )  - W (\tau) \\
\Pr\{ W ^ + (t) = y \} = \frac{ y ^ 2 }{ \sqrt{ 2 \pi t ^ 3 (1-t) ^ 3}  }  \exp (- \frac{y^2}{2t(1-t)} ) \\
\end{array}
$$



Brownian Meander
---





References
---

* [Brownian Bridge Transform - Vitis Quantitative Finance Library](https://xilinx.github.io/Vitis_Libraries/quantitative_finance/2020.1/guide_L1/brownian/bb.html)
* ["Some Points on Vervaat's Transform aof Brownian Bridges and Brownian Motion" - Titus Lupu](https://arxiv.org/pdf/1308.3759)

###### 2026-06-25
