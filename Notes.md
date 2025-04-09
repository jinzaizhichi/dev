Notes
---

###### 2025-04-09

Getting syntax highlighting working was a chore.

Enabling `pandoc` was easy enough but figuring out what proper CSS to use was
difficult.
Eventually found a [SO](https://github.com/jgm/pandoc/issues/7860) answer.

Here's the abbridged version:


```
echo '$highlighting-css$' > tmp.html
echo '`test`{.js}' | pandoc --highlight-styles=pygments --template=tmp.html > pygments_style.css
rm tmp.html
```


