var ig = require('impact').ig;

ig._testRequire('game.main');

// exports['test test'] = ig.test(function (test) {
//     var game = new MyGame();
//     test.ok(game, 'Game can be created');
//     test.done();
// });
//
exports.MyGame = ig.testCase({
    setUp: function (callback) {
        this.game = new MyGame();
        callback();
    },

    tearDown: function (callback) {
        callback();
    },

    instance: function (test) {
        test.ok(this.game instanceof MyGame, 'this.game is a MyGame');
        test.done();
    },

    bindings: function (test) {
        var expected = {};
        expected[ig.KEY.MOUSE1] = 'mousedown';

        test.deepEqual(ig.input.bindings, expected, 'All bindings are set');
        test.done();
    }
});
