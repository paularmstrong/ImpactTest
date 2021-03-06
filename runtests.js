require.paths.unshift(__dirname + '/node_modules/');
require.paths.unshift(__dirname + '/lib/');

var util = require('util'),
    child_process = require('child_process'),
    nodeunit = require('nodeunit'),
    configFile = './config/config-test',
    ignore = '',
    config, test_runner, i;

process.argv.forEach(function (val, index, array) {
    if (index < 2) {
        return;
    }

    if (val === '-c') {
        configFile = process.argv[~~index + 1];
    }
});

config = require(configFile).config;
global.config = config;
test_runner = nodeunit.reporters[config.test_runner];

function runTests(error, stdout, stderr) {
    var tests = stdout.trim().split("\n");
    test_runner.run(tests);
}

i = config.pathIgnore.length;
while (i--) {
    ignore += ' ! -path "' + config.pathIgnore[i] + '"';
}

child_process.exec('find . -name "*.test.js" ' + ignore, { cwd: config.root }, runTests);
