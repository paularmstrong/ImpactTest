FakeAudio = function () {

};

FakeAudio.prototype = {
    canPlayType: function () {
        return true;
    },
    load: function () {},
    play: function () {},
    pause: function () {}
};

exports.FakeAudio = FakeAudio;
