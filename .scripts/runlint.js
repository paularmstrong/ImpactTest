var util = require('util'),
    child_process = require('child_process'),
    configFile = '../config/config-lint',
    ignore = '',
    root, i;

process.argv.forEach(function (val, index, array) {
    if (index < 2) {
        return;
    }

    if (val === '-c') {
        configFile = process.argv[~~index + 1];
    }
});

config = require(configFile).config;

function runLint(error, stdout, stderr) {
    var files = stdout.trim().replace(/\n/g, ' ');

    child_process.exec('node ' + __dirname + '/../node_modules/nodelint/nodelint ' + files + ' --config ' + __dirname + '/' + configFile, { cwd: config.root }, function (error, stdout, stderr) {
        // util.puts(stdout);
        util.puts(stderr);
    });
}

i = config.pathIgnore.length;
while (i--) {
    ignore += ' ! -path "' + config.pathIgnore[i] + '"';
}

child_process.exec('find . -name "*.js"' + ignore, { cwd: config.root }, runLint);
