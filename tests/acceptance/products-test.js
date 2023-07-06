import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'kshop-app/tests/helpers';

module('Acceptance | products', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /products', async function (assert) {
    await visit('/products');

    assert.strictEqual(currentURL(), '/products');
  });
});
