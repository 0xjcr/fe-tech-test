import { module, test } from 'qunit';
import { visit, currentURL, click } from '@ember/test-helpers';
import { setupApplicationTest } from 'kshop-app/tests/helpers';
import { setupMirage } from 'ember-cli-mirage/test-support';


module('Acceptance | products', function (hooks) {
  setupApplicationTest(hooks);
  setupMirage(hooks);

  hooks.beforeEach(function () {
    window.localStorage.clear();
  });
  

  test('visiting /products', async function (assert) {
    await visit('/products');
    assert.strictEqual(currentURL(), '/products');
  });


test('renders the item-nav, heading, and subheading', async function (assert) {
  await visit('/products');
  assert.dom('[data-test-item-nav]').exists();
  assert.dom('h1').hasText('Groceries');
  assert
    .dom('h3')
    .hasText('Special FX offers only the finest organic produce.');
});

  test('renders the list of product cards with correct elements', async function (assert) {
    await visit('/products');
    assert.dom('[data-test-product-card]').exists({ count: 3 });
    assert.dom('[data-test-product-name]').exists({ count: 3 });
    assert.dom('[data-test-product-image]').exists({ count: 3 });
    assert.dom('[data-test-product-price]').exists({ count: 3 });
    assert.dom('[data-test-add-to-cart-button]').exists({ count: 3 });
  });
  
  test('clicks Add to cart button and renders quantity selector which displays trashbin or (-), a quantity, and + ', async function (assert) {
    await visit('/products');
    await click('[data-test-add-to-cart-button]');
    assert.dom('[data-test-quantity-selector]').exists({ count: 1 });
    
    assert
      .dom('[data-test-quantity-selector-trashbin]' || '[data-test-quantity-selector-minus]')
      .exists();
    
    assert.dom('[data-test-quantity-selector-quantity]').exists({ count: 1 });
    assert.dom('[data-test-quantity-selector-plus]').exists({ count: 1 });
  });

});


