export default class MockData {
  userData () {
    return JSON.stringify({
      sussess: 'success',
      message: '获得用户信息成功',
      data: [
        {
          userId: 1,
          userName: '杨庭培',
          userEmail: 'ytp1234@qq.com',
          userPw: 'ytp1234',
          isAdmin: 1
        },
        {
          userName: '李四',
          userPw: 'ls1234',
          email: 'ls1234@qq.com',
          userId: 2,
          isAdmin: 0
        }
      ]
    })
  }
  logoData () {
    return JSON.stringify({
      sussess: 'success',
      message: '获得logo信息成功',
      data: []
    })
  }
}
