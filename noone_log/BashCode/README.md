
### 安装

```bash
npm i whbostcopy -g
```


###  同服务器

```bash
whbostcopy --a='aaa.com' --b='bbb.com' --ap='passwd'
```



### 跨服务器

```bash
whbostcopy --a='aaa.com' --b='bbb.com' --ap='passwd' --export
# 到 aaa.com 服务器下运行

whbostcopy --a='aaa.com' --b='bbb.com' --ap='passwd' --import
# 到 bbb.com 服务器下运行
```



### 数据库名不一样

```bash
whbostcopy --a='aaa.com' --b='bbb.com' --ap='passwd' --bdb='bDBName'
# bbb.com 数据库不一样
```