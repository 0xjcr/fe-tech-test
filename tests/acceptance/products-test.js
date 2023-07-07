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

  test('renders the topbar with empty cart', async function (assert) {
    await visit('/products');
    assert.dom('[data-test-top-bar]').exists();
    assert.dom('img').hasAttribute('src', 'images/logo.png');
    assert.dom('[data-test-shopping-cart-empty]').exists();
  });

  test('renders the item-nav, heading, and subheading', async function (assert) {
    await visit('/products');
    this.server.createList('product', 3);
    assert.dom('li.product').exists({ count: 3 });
    assert.dom('[data-test-item-nav]').exists();
    assert.dom('[data-test-page-header]').exists();
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
      .dom(
        '[data-test-quantity-selector-trashbin]' ||
          '[data-test-quantity-selector-minus]'
      )
      .exists();

    assert.dom('[data-test-quantity-selector-quantity]').exists({ count: 1 });
    assert.dom('[data-test-quantity-selector-plus]').exists({ count: 1 });
  });

  test('renders the topbar with full cart', async function (assert) {
    await visit('/products');

    await click('[data-test-add-to-cart-button]');

    assert.dom('[data-test-top-bar]').exists();
    assert.dom('img').hasAttribute('src', 'images/logo.png');

    assert.dom('[data-test-shopping-cart-full]').exists();

    assert.dom('[data-test-shopping-cart-quantity]').exists();
    assert.dom('[data-test-shopping-cart-total]').exists();
  });

  test('clicks shopping cart with items and navigates to shopping cart page', async function (assert) {
    await visit('/products');
    await click('[data-test-add-to-cart-button]');
    await click('[data-test-shopping-cart-full]');

    assert.strictEqual(
      currentURL(),
      '/shopping-cart',
      'Should navigate to the shopping cart page'
    );
  });

  test('shopping-cart page contains topbar, page-header, continue-shopping nav, cart-card, cart-summary components when cart full', async function (assert) {
    await visit('/products');
    await click('[data-test-add-to-cart-button]');
    await click('[data-test-shopping-cart-full]');

    assert.strictEqual(
      currentURL(),
      '/shopping-cart',
      'Should navigate to the shopping cart page'
    );
    assert.dom('[data-test-top-bar]').exists();
    assert.dom('[data-test-continue-nav]').exists();
    assert.dom('[data-test-page-header]').exists();
    assert.dom('h1').hasText('Shopping Cart');
    assert.dom('h3').hasText('You have 1 items in your cart.');
    assert.dom('[data-test-cart-summary]').exists();
    assert.dom('[data-test-cart-card]').exists();
  });
});
