import { get } from 'mongoose'
;(function() {
  //存储章节列表
  function getChapterList(name) {
    let ChapterList = sessionStorage.getItem('ChapterList')
    let nowList = []
    if (!ChapterList) {
      ChapterList = []
    } else {
      JSON.parse(ChapterList).forEach(item => {
        if (item.bookName === name) {
          nowList.push(item)
        }
      })
    }

    return nowList
  }
  function setChapterList(list) {
    let ChapterList = getChapterList()
    let flag = false
    for (let i = 0; i < ChapterList.length; i++) {
      let novel = ChapterList[i]
      if (novel.bookName === list.bookName) {
        flag = true
        break
      }
    }
    if (!flag) {
      ChapterList.unshift(list)
    }
    sessionStorage.setItem('ChapterList', JSON.stringify(ChapterList))
  }

  //设置书架
  function setBookRack(imgSrc, bookName, newChapter, author, lastRead) {
    let collectArray = getBookRack()
    let flag = false
    for (let i = 0; i < collectArray.length; i++) {
      let novel = collectArray[i]
      if (novel.bookName === bookName) {
        flag = true
        break
      }
    }
    if (!flag) {
      collectArray.unshift({
        imgSrc,
        bookName,
        newChapter,
        author,
        lastRead
      })
    }

    localStorage.setItem('collectArray', JSON.stringify(collectArray))
  }
  //更新书架书籍阅读记录
  function updataBookRack(bookName, lastRead) {
    let collectArray = getBookRack()
    collectArray.forEach((item, i) => {
      if (bookName === item.bookName && item.lastRead !== lastRead) {
        item.lastRead = lastRead
      }
    })
    localStorage.setItem('collectArray', JSON.stringify(collectArray))
  }
  function getBookRack() {
    let collectArray = localStorage.getItem('collectArray')
    if (!collectArray) {
      collectArray = []
    } else {
      collectArray = JSON.parse(collectArray)
    }
    return collectArray
  }
  function clearRack(bookName) {
    let collectArray = getBookRack()
    let newArray = []
    collectArray.forEach(item => {
      if (item.bookName !== bookName) {
        newArray.push(item)
      }
    })
    localStorage.setItem('collectArray', JSON.stringify(newArray))
  }

  //登录状态
  function setStatus(status) {
    sessionStorage.setItem('statusArr', status)
  }
  function getStatus() {
    return sessionStorage.getItem('statusArr')
  }
  function clearStatus() {
    sessionStorage.removeItem('statusArr')
  }

  //储存分类排行首页列表信息
  function setHomeList(type, list) {
    let newList = getHomeList()
    let flag = false
    for (let i = 0; i < newList.length; i++) {
      let novel = newList[i]
      if (novel.type === type) {
        flag = true
        break
      }
    }
    if (!flag) {
      newList.push({
        type,
        list
      })
    }

    sessionStorage.setItem('CARList', JSON.stringify(newList))
  }
  function getHomeList(type) {
    let CARList = sessionStorage.getItem('CARList')
    let nowList = []
    if (!CARList) {
      ChapterList = []
    } else {
      JSON.parse(CARList).forEach(item => {
        if (item.typeName === type) {
          nowList.push(item)
        }
      })
    }

    return nowList
  }

  window.setBookRack = setBookRack
  window.getBookRack = getBookRack
  window.clearRack = clearRack
  window.getChapterList = getChapterList
  window.setChapterList = setChapterList
  window.updataBookRack = updataBookRack
  window.setStatus = setStatus
  window.getStatus = getStatus
  window.clearStatus = clearStatus
  window.setHomeList = setHomeList
  window.getHomeList = getHomeList
})()
