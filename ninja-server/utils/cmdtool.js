const { spawn } = require('child_process');
const fs = require('fs');

async function runCmd(command, args) {
    return new Promise((resolve, reject) => {
        const cwd = process.cwd();
        if (!fs.existsSync(cwd)) {
            fs.mkdirSync(cwd, { recursive: true });
        }

        const childProcess = spawn(command, [args], { cwd: cwd });

        let output = '';

        childProcess.stdout.on('data', (data) => {
            output += data.toString();
        });

        childProcess.stderr.on('data', (data) => {
            console.error(data.toString());
        });

        childProcess.on('error', (error) => {
            reject(error);
        });

        childProcess.on('close', (code) => {
            if (code === 0) {
                resolve(output.trim());
            } else {
                reject(new Error(`Command execution failed with exit code: ${code}`));
            }
        });
    });
}

module.exports = { runCmd };

// runCmd("../pict", "../tmp.txt").then((output) => {
//     console.log(`cmd output: ${output}`);
// })