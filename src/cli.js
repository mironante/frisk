import * as fs from 'fs';
import * as path from 'path';
import iconv from 'iconv-lite';

var foundFiles = [];

export async function cli(args, options) {
    let [dirPath, keyword] = args;

    if (!fs.lstatSync(dirPath).isDirectory()) {
        throw new Error(dirPath + ' is not a directory!');
    }

    let exclude = null;
    if (options.exclude && options.exclude.length > 0) {
        exclude = options.exclude.map(ex => {
            let regExp = ex.replace(/\./g, '\\.').replace(/\*/g, '.*');
            return new RegExp(`^${regExp}$`, 'i');
        });
    }

    await scanDir(dirPath, keyword, options.recursively, options.encoding || null, exclude);

    return foundFiles;
}

async function scanDir(dirPath, keyword, isRecursively = false, encoding = null, exclude = null) {
    const files = fs.readdirSync(dirPath);

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
    
        // Skip excluded files and directories
        if (exclude === null || exclude.filter(ex => ex.test(file)).length === 0) {

            const filePath = path.join(dirPath, file);
            
            // Check file
            if (!fs.lstatSync(filePath).isDirectory()) {
                await scanFile(filePath, keyword, encoding)
                    .then(f => {
                        foundFiles.push(f);
                    })
                    .catch(e => {
                        if (e) {
                            console.log(e.message);
                        }
                    });
            } else {
                if (isRecursively) {
                    await scanDir(filePath, keyword, isRecursively, encoding, exclude);
                }
            }
        }
    }
}

async function scanFile(filePath, keyword, encoding = null) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                reject(err);
                return;
            }
    
            // Decode
            let decoded = null;
            if (encoding) {
                decoded = iconv.decode(data, encoding);
            } else {
                decoded = data.toString('utf8');
            }
    
            if (decoded.indexOf(keyword) !== -1) {
                resolve(filePath);
            } else {
                reject();
            }
        });
    });
}