---
id: git
title: git使用
tags: [git, git使用]
keywords: [git, git使用]
description: git使用
last_update:
  date: 8/5/2024
  author: ZhangJiaxiang
---

一般开发流程,基于主份支切出自己的分支, 这里假设主分支为 main,开发分支为 dev.

合并代码发生冲突或者我们每天拉取最新 main 上的代码时,通常使用 `(dev)git merge main`,但是这样会多出一条 commit 同时 git graph 也变得混乱,我们可以使用 `git rebase main`.

## [git rebase -i](https://docs.github.com/zh/get-started/using-git/using-git-rebase-on-the-command-line)

扁平化（Squash）合并,合并多次提交为一次,避免冗余的提交记录.
![](https://png.zjiaxiang.cn/blog/202408041759560.png)
gitee 和[github](https://docs.github.com/zh/repositories/configuring-branches-and-merges-in-your-repository/configuring-pull-request-merges/configuring-commit-squashing-for-pull-requests)都支持在提交 pr 的时候自动压缩.

如果在本地合并多个提交这里记录下 vim 命令:

- i : 开始编辑
- esc : 退出编辑
- :wq : 保存退出

## 删除分支

```
// 删除本地分支
git branch -d localBranchName

// 删除远程分支
git push origin --delete remoteBranchName

//删除任何不再存在于远程的本地标签.
git fetch -p
```

如果你还在一个分支上，那么 Git 是不允许你删除这个分支的。所以，删除本地分支之前，你需要切换到另一个分支。

当一个分支被推送并合并到远程分支后，-d 才会本地删除该分支。如果一个分支还没有被推送或者合并，那么可以使用-D 强制删除它。

## 参考

- [git 使用](https://git-scm.com/docs)
- [关于 Git(github)](https://docs.github.com/zh/get-started/using-git/about-git)
- [分支合并请求](https://segmentfault.com/a/1190000040941132)
- [让 commits 历史像 Vue 一样清爽优雅-Git rebase 原理、工作流介绍+常见问题指南](https://juejin.cn/post/6933247925057224712#heading-13)
- [使用 git rebase 提高 PR 质量](https://juejin.cn/post/6844903497645686797#heading-3)
