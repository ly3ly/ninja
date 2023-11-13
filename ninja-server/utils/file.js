const fs = require('fs');
async function writeFile(filePath, data) {
    return new Promise((resolve, reject) => {
        fs.access(filePath, fs.constants.F_OK, (err) => {
            if (!err) {
                // 文件存在，先删除
                fs.unlink(filePath, async (err) => {
                    if (err) {
                        reject('error deleting old file: ' + err);
                    } else {
                        try {
                            await createFile(filePath, data);
                            resolve('success create file');
                        } catch (error) {
                            reject('error create file: ' + error);
                        }
                    }
                });
            } else {
                // 文件不存在，直接创建
                createFile(filePath, data)
                    .then(() => resolve('success create file'))
                    .catch(error => reject('error create file: ' + error));
            }
        });
    });
}

function createFile(filePath, data) {
    return new Promise((resolve, reject) => {
        fs.writeFile(filePath, data, (err) => {
            if (err) {
                reject('error creating file: ' + err);
            } else {
                resolve();
            }
        });
    });
}


// async function writeFile(filePath, data) {
//     return new Promise((resolve, reject) => {
//         fs.access(filePath, fs.constants.F_OK, (err) => {
//             if (!err) {
//                 // 删除旧文件
//                 fs.unlink(filePath, (err) => {
//                     if (err) {
//                         const errorMessage = 'error deleting old file: ' + err;
//                         reject(errorMessage);
//                     } else {
//                         createFile(filePath, data)
//                             .then(() => {
//                                 resolve('success create file');
//                             })
//                             .catch((error) => {
//                                 reject('error create file: ' + error);
//                             });
//                     }
//                 });
//             } else {
//                 // 文件不存在，直接创建文件
//                 createFile(filePath, data)
//                     .then(() => {
//                         resolve('sussess create file');
//                     })
//                     .catch((error) => {
//                         reject('error create file: ' + error);
//                     });
//             }
//         });
//     });
// }

// function createFile(filePath, data, callback) {
//     fs.writeFile(filePath, data, (err) => {
//         if (err) {
//             const errorMessage = 'error creating file' + err;
//             callback(errorMessage);
//         } else {
//             callback(null); // 没有错误，返回 null
//         }
//     });
// }

// async function createFile(filePath, data) {
//     return new Promise((resolve, reject) => {
//         fs.writeFile(filePath, data, (err) => {
//             if (err) {
//                 const errorMessage = 'error creating file' + err;
//                 reject(errorMessage);
//             } else {
//                 resolve(null); // 没有错误，返回 null
//             }
//         });
//     })

// }

module.exports = {
    writeFile
}