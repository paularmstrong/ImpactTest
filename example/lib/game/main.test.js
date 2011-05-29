var ig = require('impact').ig;

ig._testRequire('game.main');

exports['test test'] = ig.test(function (test) {
    var game = new MyGame();
    test.ok(game, 'Game can be created');
    test.done();
});

exports['SetUp and TearDown'] = ig.testCase({
    setUp: function (callback) {
        this.game = new MyGame();
        callback();
    },
    tearDown: function (callback) {
        callback();
    },
    test1: function (test) {
        test.ok(this.game instanceof MyGame, 'this.game is a MyGame');
        test.done();
    }
});
