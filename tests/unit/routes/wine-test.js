import { module, test } from 'qunit';
import { setupTest } from 'kshop-app/tests/helpers';

module('Unit | Route | wine', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:wine');
    assert.ok(route);
  });
});
