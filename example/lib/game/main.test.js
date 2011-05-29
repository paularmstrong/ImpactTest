var ig = require('impact').ig;

ig._testRequire('game.main');

exports['test test'] = function (test) {
    var game = new MyGame();
    test.ok(game, 'Game can be created');
    test.done();
};