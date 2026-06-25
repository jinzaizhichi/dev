Brownian Motion Notes
===

| Definition | Description |
|---|---|
| Wiener Process |  continuous time cadlag stochastic process, with stationary independent increments |
| Brownian Motion | synonym for Wiener process |
| Brownian Bridge | Brownian motion that that starts at $0$ and ends at $0$ for a given time $T$ |
| Brownian Excursion | Brownian motion that that starts and end at $0$ at time $1$ and remains positive for $s, 0 < s < 1$ |

$$
0 \le s < t \le T \\
W(0) = 0 \\
W(t) - W(s) \sim \sqrt{t-s} N(0,1) \\
$$

$$
0 \le t \le T \\
B _ {a,b} (t) = a (\frac{T-t}{T}) + b (\frac{t}{T}) + (W(t) - \frac{t}{T} W(T)) \\
B _ {a,b} (t) \sim N(a + \frac{t}{T}(b-a), t - \frac{t^2}{T}) \\
$$

References
---

* [Brownian Bridge Transform - Vitis Quantitative Finance Library](https://xilinx.github.io/Vitis_Libraries/quantitative_finance/2020.1/guide_L1/brownian/bb.html)

###### 2026-06-25
