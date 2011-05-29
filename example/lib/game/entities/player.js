/**
 *  Player
 *
 *  Created by Paul Armstrong on 2011-05-29.
 *  Copyright (c) 2011 Paul Armstrong Designs. All rights reserved.
 */

ig.module('game.entities.player')
.requires(
    'impact.entity'
)
.defines(function () {

    EntityPlayer = ig.Entity.extend({
        size: { x: 48, y: 48 },

        animSheet: new ig.AnimationSheet('media/player.png', 48, 48),

        init: function (x, y, settings) {
            this.addAnim('idle', 1, [0]);

            this.currentAnim = this.anims.idle;
            this.parent(x, y, settings);
        }

    });

});
