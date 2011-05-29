require.paths.push(__dirname + '/../config/');

var fs = require('fs'),
    config = require('config-impact').config,
    HTMLElement = require('fakes/html-element').FakeHTMLElement,
    ig,
    empty = function () {};

global.window = new HTMLElement();
global.document = new HTMLElement();

function _testRequire(file, execute) {
    var resolvedFile = fs.readFileSync(config.root + file.replace(/\./g, '/') + '.js', 'utf8'),
        defined;

    eval(resolvedFile);

    if (execute === false) {
        return;
    }

    defined = ig.modules[file].body;

    if (typeof defined === 'function') {
        try {
            defined();
        } catch (e) {
            throw 'Unable to execute file "' + file + '"';
        }
    }
}

_testRequire('impact.impact', false);
_testRequire('impact.system');

ig.merge(ig, {
    module: function (name) {
		ig._current = { name: name, requires: [], loaded: true, body: null };
		ig.modules[name] = ig._current;
        return ig;
    },
    requires: function () {
        var i = arguments.length,
            module;

        while (i--) {
            module = arguments[i];
            ig._current.requires.push(module);
            if (!ig.modules.hasOwnProperty(module)) {
                // _testRequire(arguments[i]);
            }
        }

        return ig;
    },
    main: function (id, class, fps, width, height, scale, loader) {
        ig.system = new ig.System(id, fps, width, height, scale);
        ig.ready = true;
    },

    _loadScript: function (name, requiredFrom) {
        console.log(name, requiredFrom);
    },
    _testRequire: _testRequire
});

_testRequire('impact.timer');
_testRequire('impact.map');
_testRequire('impact.collision-map');
_testRequire('impact.background-map');
_testRequire('impact.image');
_testRequire('impact.font');
_testRequire('impact.game');
_testRequire('impact.entity');
_testRequire('impact.animation');

exports.ig = ig;
