let db = require('../db/index')

exports.post = (req, res) => {
    const userid = req.body.userid;
    var sql = 'SELECT * FROM user WHERE id = ?';
    db.query(sql, [userid], (error, data) => {
      if (error) throw error;

      const userData = data[0];
      if (data.length > 0) {
            // 用户存在，可以重定向到首页或者发送其他响应
            res.status(200).json({ message: 'Login successful', userData });
            // res.send(data)
          } else {
            // 用户不存在，发送错误响应
            res.status(401).json({ message: 'Invalid user ID' });
          }
    })
}


