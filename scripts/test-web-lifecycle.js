// Test the Web bridge without starting Unity or touching browser saves.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const source = fs.readFileSync(path.join(__dirname, '../Assets/Game/Remaster/Plugins/WebLifecycle.jslib'), 'utf8');

function run({ restart = 0, busy = 0, error = false, throws = false } = {}) {
  const events = [], timers = [], library = {};
  let time = 0, calls = 0;
  const mount = { idbPersistState: busy ? 'idb' : 0 };
  const context = {
    LibraryManager: { library }, mergeInto: Object.assign,
    Module: { __unityIdbfsMount: { mount } },
    FS: { syncfs(populate, done) {
      assert.equal(populate, false); calls++;
      if (throws) throw new Error('Synchronous failure');
      done(error ? new Error('Write failed') : null);
    } },
    Date: { now: () => time }, console: { error() {} },
    setTimeout: (callback, delay) => timers.push({ callback, delay }),
    window: { dispatchEvent: event => events.push(event) },
    CustomEvent: function (name, options) { this.name = name; this.detail = options.detail; }
  };
  vm.runInNewContext(source, context);
  library.BallanceRemasterExit(restart);
  assert.equal(events.length, 0, 'flush is deferred until after the engine call');
  while (timers.length) {
    const timer = timers.shift(); time += timer.delay;
    if (time >= busy) mount.idbPersistState = 0;
    timer.callback();
    assert.ok(time <= 10025, 'queue has a deadline');
  }
  assert.equal(events.length, 1);
  assert.equal(events[0].name, 'ballance-remaster-exit');
  assert.equal(events[0].detail.restart, !!restart);
  assert.equal(events[0].detail.failed, error || throws || busy > 10000);
  assert.equal(calls, busy > 10000 ? 0 : 1);
}

run(); run({ restart: 1 }); run({ busy: 75 }); run({ busy: 20000 });
run({ error: true }); run({ throws: true });
console.log('Web lifecycle checks passed: exit, restart, queued saves, timeout and write failures.');

// Old bookmarks reach the root player; Quit leaves the game instead of reopening it.
const entry = fs.readFileSync(path.join(__dirname, '../site/play.html'), 'utf8');
const redirect = entry.match(/<script>([\s\S]*?)<\/script>/)[1];
let redirected;
vm.runInNewContext(redirect, { location: { search: '?test=1', hash: '#saved', replace: value => { redirected = value; } } });
assert.equal(new URL(redirected, 'https://iwonz.github.io/reballance/play/').href,
  'https://iwonz.github.io/reballance/?test=1#saved');
const template = fs.readFileSync(path.join(__dirname, '../Assets/WebGLTemplates/Remaster/index.html'), 'utf8');
const home = template.match(/id="home" href="([^"]+)"/)[1];
assert.equal(home, 'https://github.com/iwonz/reballance#readme');
const onExit = template.match(/window.addEventListener\("ballance-remaster-exit", event => \{([\s\S]*?)\n      \}\);/)[1];
for (const restart of [false, true]) {
  const actions = [];
  vm.runInNewContext('(function () {' + onExit + '})()', {
    event: { detail: { restart } }, leaving: false, failure: () => assert.fail('Unexpected save failure'),
    instance: { Quit: () => ({ then: done => { actions.push('quit'); done(); return { catch() {} }; } }) },
    location: { reload: () => actions.push('reload'), assign: url => actions.push(url) },
    document: { querySelector: selector => { assert.equal(selector, '#home'); return { href: home }; } }
  });
  assert.deepEqual(actions, ['quit', restart ? 'reload' : home]);
}
console.log('Direct entry and host exit/restart navigation checks passed.');
