import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | product', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {});

  test('it renders', async function (assert) {
    const product = {
      name: 'Tester Product',
      price: 20.0,
      image: 'path/to/image.jpg',
    };
    this.set('product', product);
    this.set('quantity', 0);

    await render(hbs`
      <Product
        @product={{this.product}}
        @quantity={{this.quantity}}
        @addToCart={{this.addToCart}}
        @incrementQuantity={{this.incrementQuantity}}
        @decrementQuantity={{this.decrementQuantity}}
      />
    `);

    assert
      .dom('.text-xl.font-bold.leading-7.text-gray-800')
      .hasText(product.name);

    assert
      .dom('.text-xl.font-normal.leading-7.text-gray-800')
      .hasText('£20.00');
    assert.dom('img').hasAttribute('src', 'path/to/image.jpg');

    assert
      .dom('.add-to-cart-button')
      .exists('AddToCart button is initially rendered');

    await click('.add-to-cart-button');

    assert
      .dom('.quantity-selector')
      .exists(
        'QuantitySelector component is rendered after clicking AddToCart button'
      );
    assert
      .dom('.add-to-cart-button')
      .doesNotExist('AddToCart button is removed after clicking');
  });
});
