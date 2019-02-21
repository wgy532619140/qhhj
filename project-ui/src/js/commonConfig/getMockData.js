define([
  'Mock',
  'Ajax',
  'util'
], function (Mock, Ajax,util) {



    // mock第一种方式,拦截请求,返回数据
    Mock.mock('/api/item', {
      id: Mock.Random.guid(),
      name: Mock.Random.cname(),
      addr: Mock.mock('@county(true)'),
      'age|18-60': 1,
      birth: Mock.Random.date(),
      sex: Mock.Random.integer(0, 1)
    })

    Mock.mock('/api/item_list',function(res) {
      console.log(res, 'item-list')
      console.log(util.formate(res.body))
      var {name, pwd} = util.formate(res.body)
      if (name == 1) {
        return '我是1账号'
      } else {
        return '这个账户不认识'
      }
    })













  var  loginArr = [
    {
      name: 'majinkai',
      pwd: 123
    },
    {
      name: '123',
      pwd: '123'
    }
  ];

  // 登陆接口
  Mock.mock('/api/login', function (res) {
    console.log(util.formate(res.body))
    var {name, pwd} = util.formate(res.body);
    console.log(name, pwd, '----->')
    var flag = loginArr.some(item => {
      console.log(item, 'item')
      if (item.name == name && item.pwd == pwd){
        return true
      } else {
        return false
      }
    })
    console.log(flag, 'flag')
    // 匹配上账户名和密码的时候,给前端一个信息提示;
    if (flag) {
      return {code:0,  msg: '登陆成功'}
    } else {
      return {code:1,  msg: '请注册'}
    }
  })

  Mock.mock('/api/list', {
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  })







  //搜索列表
  // var arr = []
  // var a = Mock.mock('/api/searchList', {
  //   'search|10-12': [{
  //     title: '@ctitle'
  //   }]
  // });

  // Mock.mock('/api/login', function(data) {
  //   console.log(data, 'data')
  // })


  // Mock.mock('/api/login', {
  //   id: Mock.Random.guid(),
  //   name: Mock.Random.cname(),
  //   addr: Mock.mock('@county(true)'),
  //   'age|18-60': 1,
  //   birth: Mock.Random.date(),
  //   sex: Mock.Random.integer(0, 1)
  // })



  // var init = {
  //   getData: {
  //     Mock.Mock()
  //   }
  // };



});