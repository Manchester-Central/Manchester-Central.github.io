## Subresource Integrity

If you are loading Highlight.js via CDN you may wish to use [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Subresource_Integrity) to guarantee that you are using a legimitate build of the library.

To do this you simply need to add the `integrity` attribute for each JavaScript file you download via CDN. These digests are used by the browser to confirm the files downloaded have not been modified.

```html
<script
  src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"
  integrity="sha384-9mu2JKpUImscOMmwjm1y6MA2YsW3amSoFNYwKeUHxaXYKQ1naywWmamEGMdviEen"></script>
<!-- including any other grammars you might need to load -->
<script
  src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/go.min.js"
  integrity="sha384-WmGkHEmwSI19EhTfO1nrSk3RziUQKRWg3vO0Ur3VYZjWvJRdRnX4/scQg+S2w1fI"></script>
```

The full list of digests for every file can be found below.

### Digests

```
sha384-0OZaeLK1yb5eP3nW4y0JP1fVharSrsuv/1mkI/6/8aRFm9laYIWIMXjCOqu+vRW5 /es/languages/c.js
sha384-G7WtwjMBNGrPly3ZsbPhfnT0v88hG3Ea9fQhrSWfzj7cNAsXsU7EKMQLyLGj7vTH /es/languages/c.min.js
sha384-XT4oRe1NeFTZXGmTo1gp7cuec9Ap/64f/vt4I5GMRCj3pobm/sNDBZMhJsK/xlBZ /es/languages/cmake.js
sha384-O4LQvDBqImUEPey0HB0Cg3aMyXEf/P4KYm+7uDjqqeU0+ciFh6wEQd3jkRbLD7G7 /es/languages/cmake.min.js
sha384-Wjwd1YEG/PYlkLHTWIx+RlPK6XboMN3bEpveERJ8D8Z4RaNE02Ho19ZFrSRPGi0j /es/languages/cpp.js
sha384-Q4zTNH8WsDVdSZbiZtzWS1HmAUcvMSdTmth9Uqgfjmx7Qzw6B8E3lC9ieUbE/9u4 /es/languages/cpp.min.js
sha384-DA5ii4oN8R2fsamNkHOanSjuN4v7j5RIuheQqnxMQ4cFnfekeuhwu4IdNXiCf+UU /es/languages/css.js
sha384-OBugjfIr093hFCxTRdVfKH8Oe3yiBrS58bhyYYTUQJVobk6SUEjD7pnV8BPwsr8a /es/languages/css.min.js
sha384-3p/2cG3HUNx9rqLOXHgKKfr/Mqv95R+00Iii0s3wgdfWWJVhKm5jEO6/kdL1HIJw /es/languages/gradle.js
sha384-+ilwPpCDudisnRgBeI+XBD7X3bLGw6EZnosF/W6iT/5YyGn0Qwjef5JIZXBkdrnr /es/languages/gradle.min.js
sha384-7hMYwsnoFLW0Wnjv4vRnZxuedW1tCz7/pydl1b9w3fg7B+rldToCjqzXwCRHUE7C /es/languages/ini.js
sha384-LDu6uT3diI3jBUJtdoGFa787cYlVrR+aqFfmW+kW+TImOkpVe+P5LBdDzydIHo9Z /es/languages/ini.min.js
sha384-WFJdA9Hz+G9NQx5vPba/tcGyIibm57UkKVY32wNB/94iT2FmPma5W7gY8p2l6qps /es/languages/java.js
sha384-coaxfgI2lKuDqSxfMlfyPq5WM0THaLGyATZHzaFMrWdIbPcLdduuItTe6AmT/m33 /es/languages/java.min.js
sha384-WCznKe2n87QvV/L1MlXN+S8R6NPUQGU34+AqogMuWGZJswSD6rt3Mgih+xuKlDgm /es/languages/javascript.js
sha384-eGsBtetyKPDKaLiTnxTzhSzTFM6A/yjHBQIj4rAMVaLPKW5tJb8U6XLr/AikCPd+ /es/languages/javascript.min.js
sha384-12GbYFzdyZCSmfBTmO2CR/qE89K5uE1PEuJ3QUwXH0Q9u+uoLNigjH9dG7LAxxiI /es/languages/json.js
sha384-+DT7AtubDhVDciRc6CgjJJRsCt0L8NC3Dh8n9Tj2tZWU8rWxDIj1ViubmUDn8OCY /es/languages/json.min.js
sha384-OkDbf1Slbqz4CwuUJVZyhq9SKn5vYk5ADIxIBS3iV5D0ZY7T3g3BOGZgd9u0kyZH /es/languages/lua.js
sha384-wvrGnUzHwJzO9dWQFF2DxrFjkSPw5gmc0iOQYmJUzeZ4tqa+15VEFRCH4GI2DNF3 /es/languages/lua.min.js
sha384-UgQTewauLJ4EgpADCJ99JfEtiPvw+fyaSrY1gtCVBviDNG7yCH5U7qutYptSfYk+ /es/languages/makefile.js
sha384-aUXBqKsjOzPD/W+hccF21KKWmWts/CrY/lWGJU+dAcsKtuh1/XtyDnzfLmqy/fV1 /es/languages/makefile.min.js
sha384-bWwkdmOCj83zZ8/m+oPD9goRMhrPCb25ZA6aTyg7vcsq9IpuyED38kQSw1Na4UTZ /es/languages/markdown.js
sha384-SqGSUq0DMQ0OUQnQnTuVDCJyhANd/MFNj+0PF67S+VXgHpR8A4tPsf/3GoSFRmrx /es/languages/markdown.min.js
sha384-KW5m+lJxeSte36eSdXdF6RWKt1rP3PKVAblsiDORE441O/7ONXso3W4FMiQM7DVo /es/languages/matlab.js
sha384-gU9Mv6FEG6RVi/d3cgP9RYHSdGMkLi/gYQCn7smdbY+m1qDCN2paZoONWRk0tBP4 /es/languages/matlab.min.js
sha384-Qb0lgsDvkX4k+zBLrQYk4QRuYU8yxfgXrhCQaha+21MnncDVhS7gnQIU/CI39I9n /es/languages/protobuf.js
sha384-93TO3rpvKyXqikneOt71cSHkxWQWPKaa6n00Me0j5Fzvjb7j+EjURqbZHyqx8m8T /es/languages/protobuf.min.js
sha384-+5oyk7Ed3OlvEWGj8xracq/6e52BScKUN4kxcreNwB7kfRTVsAMs/aAJM58dzIFN /es/languages/python.js
sha384-ND/UH2UkaeWiej5v/oJspfKDz9BGUaVpoDcz4cof0jaiv/mCigjvy7RQ7e+3S6bg /es/languages/python.min.js
sha384-I4aH0szMeaCbcs8R7dhxA3p7ZBL/HFxnD5Gbz6l52kIrd/igSSFi/9sJCykNuL52 /es/languages/rust.js
sha384-1vvSh2x0WCtPLbkTMqNuf8JSZw8N5bSo9oONZ9vqU8NOBHPIuKt+kFdC8G5nA+P1 /es/languages/rust.min.js
sha384-CS3qiWid6Sod3yAiQwgPzy2ZerR00u/cwhnMxQrETuI74o006r1p5qj1U9Gdo4uD /es/languages/typescript.js
sha384-HHgazax8ozQ9RDWlJQyaFzaTk/OgTFRVHH+lcaYInkE8wVu5fnpkqkB3KUdzKcvE /es/languages/typescript.min.js
sha384-OFoR8IZ+CFwcY8plx8HSDZNoCwLxc701CwdNGfoIEhSgwAbwhvInaxnEi3HYTt2Q /es/languages/xml.js
sha384-yFd3InBtG6WtAVgIl6iIdFKis8HmMC7GbbronB4lHJq3OLef3U8K9puak6MuVZqx /es/languages/xml.min.js
sha384-MX3xn8TktkjONV3aWF6Qn6WZyq2Lh/98p0v7D0qEoJ4WLdYjoAyXF/L/80q3qaEc /es/languages/yaml.js
sha384-4IiaMbQ0LBiRJYBGoAXsN+dV9qu/cGLES6IuVowdeCu/FAMY5/MQfD/bHXoL2YBb /es/languages/yaml.min.js
sha384-VZxKf0mjKYDwZIgrW+InqDfJ0YwYUFEMw/4YmpV1oKtVXFVmVq/Ga1vgq6zKTUqS /languages/c.js
sha384-mWenE7UXKnmYRcJ3mh+Os3iZ43BmFf9x3AZMM6gi/2sT6vxouPWspbTdREwWDO3w /languages/c.min.js
sha384-/DE6n+XheQ/kdrhU7A+cWj1GSRUM44zfgDDcWPvIeGGr02ckG45tZIoLbVgx4X1h /languages/cmake.js
sha384-iqJTnKrAPlpoueHQticEO1SgUDmD+Lv1EGplrE41YfNgnnVCt6pLeVjutOnr/Ddi /languages/cmake.min.js
sha384-J4Ge+xXjXgzbK2FP+OyzIGHLfKU/RR0+cH4JJCaczeLETtVIvJdvqfikWlDuQ66e /languages/cpp.js
sha384-LMyrRAiUz6we2SGvYrwDd4TJoJZ+m/5c+4n4E64KVkfWFcZdlrs4Wabr0crMesyy /languages/cpp.min.js
sha384-r9czyL17/ovexTOK33dRiTbHrtaMDzpUXW4iRpetdu1OhhckHXiFzpgZyni2t1PM /languages/css.js
sha384-HpHXnyEqHVbcY+nua3h7/ajfIrakWJxA3fmIZ9X9kbY45N6V+DPfMtfnLBeYEdCx /languages/css.min.js
sha384-vfTjgSZcL3SaB+N5397Yp0A1gp7blEH1eNjC1q5c+NfNyJK78P5OYvmtZfv39LA3 /languages/gradle.js
sha384-6TGxjdrZB3xEK6UL4EcWt1IQb2v4GpvxFzOBntkuOlDC688Rf5gqq5XTWJzO1izc /languages/gradle.min.js
sha384-JSUMPR+WT0h/7NlqXi1Al9bVlNT31AeZNpAHttuzu+r02AmxePeqvsZkKqYZf06n /languages/ini.js
sha384-QrHbXsWtJOiJjnLPKgutUfoIrj34yz0+JKPw4CFIDImvaTDQ/wxYyEz/zB3639vM /languages/ini.min.js
sha384-pYIeBYeCE96U9EkPcT4uJjNWyrB1BKB41JIadYJbvmGa5KacaoXtSQOUpBfeyWQX /languages/java.js
sha384-uUg+ux8epe42611RSvEkMX2gvEkMdw+l6xG5Z/aQriABp38RLyF9MjDZtlTlMuQY /languages/java.min.js
sha384-vJxw3XlwaqOQr8IlRPVIBO6DMML5W978fR21/GRI5PAF7yYi2WstLYNG1lXk6j9u /languages/javascript.js
sha384-44q2s9jxk8W5N9gAB0yn7UYLi9E2oVw8eHyaTZLkDS3WuZM/AttkAiVj6JoZuGS4 /languages/javascript.min.js
sha384-dq9sY7BcOdU/6YaN+YmFuWFG8MY2WYJG2w3RlDRfaVvjdHchE07Ss7ILfcZ56nUM /languages/json.js
sha384-RbRhXcXx5VHUdUaC5R0oV+XBXA5GhkaVCUzK8xN19K3FmtWSHyGVgulK92XnhBsI /languages/json.min.js
sha384-/Ml+gzp/rkQcZkCwBqpVjCj028T6aTnOF/LCRJH8LBE5xcPcTkntQwJ5KGMMNLI3 /languages/lua.js
sha384-T04Yu4dcDCykCMf4EbZ62u3nURYEVkpphRGFhF/cMu+NrtDqoRHgbVOZz7hHdcaO /languages/lua.min.js
sha384-LmfE+sO0d5qZL2Ka0DIrgJ/5U1plo4uFFAmgjcMxrQO+RkeWVYWuaphHAdrY9g7V /languages/makefile.js
sha384-NIrob3StFQyD/nlOsXVCeRsJ0N2SvFEDjFtYS393wbD3CY1eT+2kwT4RL7tpMMhs /languages/makefile.min.js
sha384-U+zIQPoVdPCO0o4poik2hYNbHtNm+L5OojDTulgIeEZTNz+LooLAm72d66mNjwKD /languages/markdown.js
sha384-mCUujHHbWJEjcupTTfWOk9YR3YCYNHaA578+TTXUd4LPi7fGNuMQbysbl1pmcIGd /languages/markdown.min.js
sha384-NKxL9la40gyvGCP5oLrJcIJDWXXv2FJc9aatPho9P/PAH1IcOBIcklePMhGDlI6x /languages/matlab.js
sha384-KveG8st4Ls4iaD1XzpsBzVc7g2K6kxnbxlZOy9cH6Knla0ZH9jsloP8nOOs6WYMP /languages/matlab.min.js
sha384-v2nhli5f4LiO6PnSA6zJgJ/YqCBEYjpUyadALhzMSH8h9cN/iFJEOTFOtXw9jzda /languages/protobuf.js
sha384-1ALwZ77/iqBsHTR04APuiMf4wWnFgY4b8VUXQHCjPfywk7S9K76uwvs1xLZUTfY5 /languages/protobuf.min.js
sha384-zdZio5RcGiKQJCpe/1IXujPle3bIY8sbmvCabSU5G5GzWAzZtoRZfg9QAQXCL08q /languages/python.js
sha384-IP4vv4Aoh9Lyg8QyzVkAmn2JGoDCpgVHzVSrD3Z+rVyn7+s4wx4pRjv+go3TEwfj /languages/python.min.js
sha384-CA6FQ5i08WYjgGIhQBrXKmcJg42apGjTP9b5WqttVw3cYEtXwHHGo+XJLYS7u7F2 /languages/rust.js
sha384-ZQJ5PCEftpFqCZkLDs96CSDGddxBultwqTdlxjnJ5h2doMAQv0n1x66w7T/JQEyy /languages/rust.min.js
sha384-yZXtQC/OmWoPykosK7vE1nCvV4E/six6+apjNau4JwBkejkea5nP7VBEJJkGnvoF /languages/typescript.js
sha384-ORwtVEfrCZ0gzGacgmfv1wOtxcPIaVfHKwq8dKQjObRwx3qpKjsSg1ldTu1PEgXd /languages/typescript.min.js
sha384-+PuZYFfVX2UQZU2yKt/FsJUZNUPzZWxW7auXltsaecr1xLvzBYF3c5gYoyOs1++x /languages/xml.js
sha384-jgkY4GMNWfQcLLIoP1vg3FWXflDrRhcSXGBW6ONIWC2SOIv5H1Pa57sXs+aomCuZ /languages/xml.min.js
sha384-tB5cwwsX4Ddp7P4d+ZInDb3nt4ihEEglHXoQ18eVLlT7soEn7bfGfABWKIn1l+H2 /languages/yaml.js
sha384-WC56y8OaFPt5Kj2HX6JAumxUYEjQmBDcSTJy2pn/N8g7dg1hKjeNVrJYoxlpeVmz /languages/yaml.min.js
sha384-XPe27WRmazN1KenKTo4RRendY4OU+fPLSUTUiKKUS/1445zWXVg1dTbnWsFy4bbf /highlight.js
sha384-NZsqkyoxr01Qh1Ct8a/DLMYmJCxvefCBirfb1dBOszdOT4/0RmlEV7VgjViFHQUb /highlight.min.js
```

