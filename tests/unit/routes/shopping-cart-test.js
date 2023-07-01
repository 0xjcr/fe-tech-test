import { module, test } from 'qunit';
import { setupTest } from 'kshop-app/tests/helpers';

module('Unit | Route | shopping-cart', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:shopping-cart');
    assert.ok(route);
  });
});
