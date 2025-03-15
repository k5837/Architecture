// const db = require('../db/index');

//  exports.post = (req, res) => {
//   const userId = req.body.userid;
//   const userInput = req.body.textarea;
//   const generatedImages = req.body.generatedImages;

//   // 查询用户是否存在
//   const selectUserSql = 'SELECT * FROM user WHERE id = ?';
//   db.query(selectUserSql, [userId], (selectError, selectData) => {
//     if (selectError) {
//       console.error('Error selecting user from database:', selectError);
//       res.status(500).json({ message: 'Internal Server Error111' });
//     }else {
//         if (selectData.length > 0) {
//           // 用户存在，将用户ID、用户输入和生成的图片链接作为一条数据插入到数据库中
//           const insertDataSql = 'INSERT INTO user (id, prompts, urls) VALUES (?, ?, ?)';
//           db.query(insertDataSql, [userId, JSON.stringify([userInput]), JSON.stringify([generatedImages])], (insertError, insertResults) => {
//             if (insertError) {
//               console.error('Error inserting data into database:', insertError);
//               res.status(500).json({ message: 'Internal Server Error222' });
//             } else {
//               console.log('Data inserted successfully!');
//               res.status(200).json({ message: 'Data sent successfully' });
//             }
//           });
//         } else {
//           // 用户不存在，发送错误响应
//           res.status(401).json({ message: 'Invalid user ID' });
//         }
//       }
//     });
//   };

const db = require('../db/index');
const axios = require('axios');
const fs = require('fs');

exports.post = (req, res) => {
  const userId = req.body.userid;
  const userInput = req.body.textarea;
  const generatedImages = req.body.generatedImages;

  // 查询用户是否存在
  const selectUserSql = 'SELECT * FROM user WHERE id = ?';
  db.query(selectUserSql, [userId], (selectError, selectData) => {
    if (selectError) {
      console.error('Error selecting user from database:', selectError);
      res.status(500).json({ message: 'Internal Server Error111' });
    } else {
      if (selectData.length > 0) {
        // 用户存在，将用户ID、用户输入和生成的图片链接作为一条数据插入到数据库中
        const insertDataSql = 'INSERT INTO user (id, prompts, urls) VALUES (?, ?, ?)';
        db.query(
          insertDataSql,
          [userId, JSON.stringify([userInput]), JSON.stringify([generatedImages])],
          (insertError, insertResults) => {
            if (insertError) {
              console.error('Error inserting data into database:', insertError);
              res.status(500).json({ message: 'Internal Server Error222' });
            } else {
              console.log('Data inserted successfully!');

              // 下载用户生成的图片到本地
              downloadImages(generatedImages, userId);

              res.status(200).json({ message: 'Data sent successfully' });
            }
          }
        );
      } else {
        // 用户不存在，发送错误响应
        res.status(401).json({ message: 'Invalid user ID' });
      }
    }
  });
};

async function downloadImages(imageUrls, userId) {
  const downloadPath = `C:\\IMAGE\\user_${userId}\\`; // 修改下载路径

  // 创建用户下载目录
  if (!fs.existsSync(downloadPath)) {
    fs.mkdirSync(downloadPath, { recursive: true });
  }

  // 使用axios下载图片
  for (let i = 0; i < imageUrls.length; i++) {
    const imageUrl = imageUrls[i];
    const timestamp = Date.now(); // 使用时间戳生成唯一标识
    const imageName = `generated_image_${i + 1}_${timestamp}.png`; // 修改文件名为唯一标识
    const imagePath = `${downloadPath}${imageName}`;

    const response = await axios({
      method: 'get',
      url: imageUrl,
      responseType: 'stream',
    });

    // 将图片流保存到本地文件
    response.data.pipe(fs.createWriteStream(imagePath));
  }
}
