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
  let instances = $('.typer'),
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
    typeText = $('.typer');

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
    assert.ok($('.typer').hasClass('typeCursor'), 'Should have cursor class after 500ms');
    done();
  }, 650);
  setTimeout(() => {
    assert.ok(!$('.typer').hasClass('typeCursor'), 'Should not have cursor class after 1000ms');
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
    assert.ok(!$('.typer').hasClass('typeCursor'), 'Should not have cursor class after typing ends');
    done();
  }, 1000);
});