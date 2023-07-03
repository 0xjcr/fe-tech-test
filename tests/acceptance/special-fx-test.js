import { module, test } from 'qunit';
import { click, visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'kshop-app/tests/helpers';

module('Acceptance | special fx', function (hooks) {
  setupApplicationTest(hooks);

  test('visiting /products', async function (assert) {
    await visit('/products');

    assert.strictEqual(currentURL(), '/products');
    assert.dom('h1').hasText('Groceries');
    assert
      .dom('h3')
      .hasText('Special FX offers only the finest organic produce.');
    assert.dom('.item-nav').exists();
    assert.dom('.product').exists({ count: 3 });
    await click('.product:first-child .add-to-cart-button');
    assert.dom('this.cart.quantity').hasText('1');
  });
});
