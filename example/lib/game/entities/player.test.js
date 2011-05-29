var ig = require('impact').ig;

ig._testRequire('game.entities.player');

exports.Player = ig.testCase({
    setUp: function (callback) {
        this.player = new EntityPlayer();
        callback();
    },

    anims: function (test) {
        test.deepEqual(this.player.anims.idle.sequence, [0], 'Idle animation has only 1 frame.');

        test.strictEqual(this.player.currentAnim, this.player.anims.idle, 'Idle is the current default animation.');
        test.done();
    }
});
