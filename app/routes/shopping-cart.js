import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ShoppingCartRoute extends Route {
  @service cart;

  model() {
    return {
      totalItems: this.cart.totalItems,
      products: this.cart.items.map(item => item.product)
    };
  }
}

