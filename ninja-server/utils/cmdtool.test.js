const { spawn } = require('child_process');
const { runCmd } = require('./cmdtool');

jest.mock('child_process', () => ({
    spawn: jest.fn()
}));

describe('runCmd', () => {
    it('should successfully execute a command', async () => {
        const mockSpawn = jest.fn(() => ({
            stdout: {
                on: jest.fn((event, callback) => event === 'data' && callback('output')),
            },
            stderr: {
                on: jest.fn()
            },
            on: jest.fn((event, callback) => event === 'close' && callback(0)),
        }));

        spawn.mockImplementation(mockSpawn);

        await expect(runCmd('ls', ['-lh'])).resolves.toBe('output');
    });
});

