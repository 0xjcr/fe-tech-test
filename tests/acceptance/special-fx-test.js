import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'kshop-app/tests/helpers';

module('Acceptance | special fx', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /', async function (assert) {
    await visit('/');

    assert.strictEqual(currentURL(), '/');
    assert.dom('h1').hasText('Groceries');
    assert
      .dom('h3')
      .hasText('Special FX offers only the finest organic produce.');
  });
});
