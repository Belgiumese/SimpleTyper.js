'use strict';

QUnit.test('Global api object exists', function(assert) {
  assert.ok(typer, 'typer object exists');
});

QUnit.test('Finds elements and adds unique ID', function(assert) {
  let fixture = $('#qunit-fixture'),
    iterations = 3;
  for (let i = 0; i < iterations; i++) {
    fixture.append('<p class="typer"></p>');
  }
  typer.init();
  let instances = $('.simpleTyper'),
    ids = [];
  assert.deepEqual(instances.length, iterations, `There should be ${iterations} instances of typer`);
  for (let i = 0; i < iterations; i++) {
    let id = parseInt(instances.eq(i).attr('data-typer-id'), 10);
    assert.ok(id < iterations, `ID should be exist and be between 0 and ${iterations - 1}`);
    assert.ok(!ids.includes(id), 'No duplicate IDs');
    ids.push(id);
  }
});

QUnit.test('Text is correctly typed', (assert) => {
  let fixture = $('#qunit-fixture'),
    toType = 'abcd',
    speed = 500;
  fixture.append(`<p class="typer" data-typer-text="${toType}"></p>`);
  typer.settings({
    delay: 0,
    random: 0,
    speed: speed
  });
  let done = assert.async(),
    done2 = assert.async(),
    typeText = $('.simpleTyper');

  typer.init();
  assert.deepEqual(typeText.text(), '', 'Text should be empty at the start');
  typer.startAll();

  setTimeout(() => {
    assert.ok(typeText.text().length > 0, 'Text should be typing');
    done();
  }, speed * (toType.length / 2));

  setTimeout(() => {
    assert.deepEqual(typeText.text(), toType, 'Text should be full & correct at the end');
    done2();
  }, speed * toType.length);
});

QUnit.test('Setting delay works', (assert) => {
  let fixture = $('#qunit-fixture'),
    toType = 'a';
  fixture.append(`<p class="typer" data-typer-text="${toType}"></p>`);
  typer.settings({
    delay: 0
  });
  let done = assert.async();
  typer.init().startAll();

  setTimeout(() => {
    assert.deepEqual($('.simpleTyper').text(), toType, 'should type with delay of 0 when set.');
    done();
  }, 200);
});

QUnit.test('Setting speed works', (assert) => {
  let fixture = $('#qunit-fixture'),
    toType = 'abcdef';
  fixture.append(`<p class="typer" data-typer-text="${toType}"></p>`);
  typer.settings({
    delay: 0,
    speed: 1000
  });
  let done = assert.async();
  typer.init().startAll();

  setTimeout(() => {
    assert.ok($('.simpleTyper').text().length < toType.length, 'Should type based on speed');
    done();
  }, 3000);
});

QUnit.test('Cursor class is added and removed', (assert) => {
  let fixture = $('#qunit-fixture');
  fixture.append('<p class="typer" data-typer-text="a"></p>');
  typer.settings({
    cursorSpeed: 500,
    delay: 0,
    random: 0,
    speed: 0
  });
  let done = assert.async(),
    done2 = assert.async();

  typer.init().startAll();

  setTimeout(() => {
    assert.ok($('.simpleTyper').hasClass('simpleTyperCursor'), 'Should have cursor class after 500ms');
    done();
  }, 650);
  setTimeout(() => {
    assert.ok(!$('.simpleTyper').hasClass('simpleTyperCursor'), 'Should not have cursor class after 1000ms');
    done2();
  }, 1150);
});

QUnit.test('Cursor class is removed after delay', (assert) => {
  let fixture = $('#qunit-fixture');
  fixture.append('<p class="typer" data-typer-text="a"></p>');
  typer.settings({
    cursorSpeed: 500,
    delay: 0,
    random: 0,
    speed: 0,
    cursorStopDelay: 0
  });
  let done = assert.async();
  typer.init().startAll();

  setTimeout(() => {
    assert.ok(!$('.simpleTyper').hasClass('simpleTyperCursor'), 'Should not have cursor class after typing ends');
    done();
  }, 1000);
});

QUnit.test('Setting speed works through data-typer-speed', (assert) => {
  let fixture = $('#qunit-fixture'),
    toType = 'aaa',
    speed = 5000;
  fixture.append(`<p class="typer" data-typer-text="${toType}" data-typer-speed="${speed}"></p>`);
  typer.settings({
    delay: 0
  });
  let done = assert.async();
  typer.init().startAll();

  setTimeout(() => {
    assert.ok($('.simpleTyper').text().length < toType.length, 'Should type based on speed');
    done();
  }, 300);
});

QUnit.test('Setting high delay works', (assert) => {
  let fixture = $('#qunit-fixture'),
    toType = 'a';
  fixture.append(`<p class="typer" data-typer-text="${toType}"></p>`);
  typer.settings({
    delay: 5000
  });
  let done = assert.async();
  typer.init().startAll();

  setTimeout(() => {
    assert.deepEqual($('.simpleTyper').text(), '', 'should type with delay when set.');
    done();
  }, 200);
});

QUnit.test('start and stop functions work', (assert) => {
  let fixture = $('#qunit-fixture'),
    toType = 'abcdefghij';
  fixture.append(`<p class="typer" data-typer-text="${toType}"></p>`);
  typer.settings({
    delay: 0,
    speed: 100
  });
  let done = assert.async(),
    elem = $('.simpleTyper')[0];
  typer.init().start(elem);

  setTimeout(() => {
    assert.ok($('.simpleTyper').text().length > 0, 'Should start with .start()');
    typer.stop(elem);
    let length = $('.simpleTyper').text().length;
    setTimeout(() => {
      assert.deepEqual($('.simpleTyper').text().length, length, 'Should stop typing with .stop()');
      done();
    }, 200);
  }, 200);
});