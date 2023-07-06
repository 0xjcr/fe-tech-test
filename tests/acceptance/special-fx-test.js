import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'kshop-app/tests/helpers';

module('Acceptance | special fx', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /special-fx', async function (assert) {
    await visit('/special-fx');

    assert.strictEqual(currentURL(), '/special-fx');
  });
});
