import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import { findComponent } from '@ember/test-helpers';

module('Integration | Component | product', function (hooks) {
  setupRenderingTest(hooks);

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
    
    const addToCartComponent = findComponent(this.element, 'AddToCart');
    assert.ok(addToCartComponent, 'AddToCart component exists');

    assert.dom('.quantity-selector').doesNotExist();

    await render(hbs`
      <Product @product={{this.product}} @quantity={{this.quantity}}>
        template block text
      </Product>
    `);

    assert.dom(this.element).hasText('template block text');
  });
});
