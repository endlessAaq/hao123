var express = require('express');
var router = express.Router();
var db = require('./db.js');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/user', function(req, res, next) {
  db.query('select * from user', function(err, rows) {
    if(err) {
      console.log(err);
      res.render('users', {title:'Express', datas:[]});
    }else{
      console.log(rows);
      console.log('success');
      res.render('users', {title:'Express', datas:rows});
    }
  })
});

router.get('/add', function(req, res) {
  res.render('add');
})

// 新增页面跳转
router.post('/add', function(req, res) {
  var name = req.body.name;
  var age = req.body.age;
    let sql = 'insert into user(name,age) values(\''+name+'\',\''+age+'\')';
    // let sql = "insert into user(name,age) values('"+name+"',"+age+')';
    console.log('********************');
    console.log(sql);
  db.query(sql, function(err, rows) {
      if(err) {
        res.end('新增失败', +err);
      }else{
        res.redirect('/users/user');
      }
  });
});
/*
* 删
* */
router.get('/del/:id', function(req, res) {
  var id = req.params.id;
  db.query('delete from user where id='+id, function(err, rows) {
    if(err) {
      res.end('删除失败：'+err);
    }else{
      res.redirect('/users/user');
    }
  })
});
router.get('/toUpdate/:id', function(req, res) {
  var id = req.params.id;
  db.query('select * from user where id='+id, function(err, rows) {
    if(err) {
      res.end('修改页面跳转失败：'+err);
    }else{
      res.render('update', {datas:rows});
    }
  });
});

router.get('/update', function(req, res) {
  var id = req.body.id;
  var name = req.body.name;
  var age = req.body.age;
  db.query("update user set name='"+name+"',age='"+age+"' where id ="+id, function(err, rows) {
    if(err) {
      res.end('修改失败');
    }else{
      res.redirect('/users/user');
    }
  });
})

/*
* 查询
* */
router.post('/search', function(req, res) {
    // res.redirect('/users/user');
  var name = req.body.s_name;
  var age = req.body.s_age;
  var sql = 'select * from user';
  if (name && age) {
    sql=(sql+ ' where name = '+ "'" + name + "'" + ' and age ='+ "'" + age + "'");
  }else {
      if (name) {
          sql = (sql + ' where name = ' + "'" + name + "'");
      }
      if (age) {
          sql = (sql + ' where age = ' + "'" + age + "'");
      }
  }
    // sql = sql.replace('and', 'where');
    console.log('*************');
    console.log(sql);
  db.query(sql, function(err, rows) {
    if(err) {
      res.end('查询失败', err);
    }else{
        res.render('users', {title:'express', datas:rows});
        // res.render('users', {title:'express', datas:row, s_name:name, s_age:age});
    }
  });
});
module.exports = router;
