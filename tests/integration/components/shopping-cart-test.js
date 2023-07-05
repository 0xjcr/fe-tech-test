import { module, test } from 'qunit';
import { setupRenderingTest } from 'kshop-app/tests/helpers';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | shopping-cart', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<ShoppingCart />`);

    assert.dom('.w-6').exists();
  });

  test('it renders empty cart icon when totalItems is 0', async function (assert) {
    this.set('cart', { totalItems: 0 });

    await render(hbs`<ShoppingCart @cart={{cart}} />`);

    assert.dom('.w-[40px]').exists();
    assert.dom('.w-[auto]').doesNotExist();
  });

  test('it renders cart icon with totalItems and totalPayable', async function (assert) {
    this.set('cart', {
      totalItems: 3,
      totalPayable: 13.5,
    });

    await render(hbs`<ShoppingCart @cart={{cart}} />`);

    assert.dom('.w-[40px]').doesNotExist();
    assert.dom('.w-[auto]').exists();
    assert.dom('.w-[27px]').hasText('3');
    assert.dom('.text-base').hasText('50.00');
  });
});
