exports.config = {
    root: __dirname + '/../',
    pathIgnore: ['*node_modules*']
};

var options = {
    adsafe: false,
    bitwise: false,
    browser: true,
    cap: false,
    css: false,
    debug: false,
    devel: true,
    eqeqeq: true,
    evil: false,
    forin: false,
    fragment: false,
    immed: false,
    indent: 4,
    laxbreak: true,
    maxerr: 300,
    maxlen: 600,
    nomen: false,
    newcap: true,
    node: true, // jslint.com has an option for node, but the node module is not up to date yet
    on: true,
    onevar: true,
    passfail: false,
    plusplus: false,
    predef: [
        // Impact
        'ig',
        // Node
        'util', 'require', 'process', 'exports', 'escape', '__dirname', 'setTimeout'
    ],
    regexp: false,
    rhino: false,
    safe: false,
    strict: false,
    sub: false,
    undef: false, // this is undesireable, but keeps from reporting any object you define as being undefined
    white: true,
    widget: false,
    windows: false
};
