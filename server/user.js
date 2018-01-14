const express = require('express');
const utility = require('utility');
const Router = express.Router();
const model = require('./model');
const User = model.getModel('user');
const Chat = model.getModel('chat');

const _filter = {'pwd': 0, '__v': 0};
//清空数据
// Chat.remove({},function(e,d){

// })
Router.get('/list', function(req, res) {
  // 删除数据
  // User.remove({},function(e,d){})
  const {type} = req.query;
  User.find({type}, function(err, doc) {
    return res.json({code: 0, data: doc})
  })
})
Router.get('/getmsglist', function(req, res) {
  // const user = req.cookies.user;

  User.find({},function(err,userdoc){
    let users = {};
    userdoc.forEach(v=> {
      users[v._id] = { name: v.user, avatar: v.avatar}
    })
    // "$or": [{from: user},{to: user}]
    Chat.find({}, function(err, doc) {
      console.log("getmsglist", doc)
      if (!err) {
        return res.json({code: 0, msgs: doc, users: users})
      }
    })
  })
})
Router.post('/readmsg', function(req,res) {
  const userid = req.cookies.userid;
  const {from} = req.body;
  Chat.update(
    {from, to: userid},
    {'$set':{read:true}},
    {'multi': true},
    function(err,doc){
      console.log(doc);
    if (!err) {
      return res.json({code:0, num:doc.nModified})
    }
    return res.json({code:1,msg:'修改失败'})
  })
})
Router.post('/update', function(req, res) {
  const userid = req.cookies.userid;
  if (!userid) {
    return res.json({code: 1})
  }
  const body = req.body;
  User.findByIdAndUpdate(userid, body, function(err, doc) {
    const data = Object.assign({},{
			user:doc.user,
			type:doc.type
    },body)
		return res.json({code:0,data})
  })
})
Router.post('/login', function(req, res) {
  const { user, pwd } = req.body;
  // findOne 第一个参数是查询，第二个参数是显示
  User.findOne({user, pwd: md5Pwd(pwd)}, _filter, function(err, doc) {
    if (!doc) {
      return res.json({ code: 1, msg: '用户名或密码错误'})
    }
    res.cookie('userid', doc._id);
    return res.json({ code: 0, data: doc })
  })
})
Router.post('/register', function(req, res) {
  console.log(req.body);
  const { user, pwd, type } = req.body;
  User.findOne({user: user}, function(err, doc) {
    if (doc) {
      return res.json({ code: 1, msg: '用户名重复'})
    }
    const userModel = new User({user, type, pwd: md5Pwd(pwd)});
    userModel.save(function(err, doc) {
      if (err) {
        return res.json({ code: 1, msg: '服务器出错'})
      }
      const { user, type, _id } = doc;
      res.cookie('userid', _id);
      return res.json({ code: 0, data: { user, type, _id } })
    })
  })
})
Router.get('/info', function(req, res) {
  // 用户cookie校验
  const { userid } = req.cookies;
  if (!userid) {
    return res.json({code: 1})
  }
  User.findOne({_id:userid}, _filter, function(err, doc) {
    if (err) {
      return res.json({ code: 1, msg: '服务器出错' })
    }
    if (doc) {
      return res.json({ code: 0, data: doc })
    }
  })
})

// 密码加盐，自动帮助用户加密更高复杂度的密码
function md5Pwd(pwd) {
  const salt = 'king-is_cool_8834761_@#%WYH~~shuai';
  return utility.md5(utility.md5(pwd+salt));
}


module.exports = Router;

