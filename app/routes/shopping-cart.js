import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';


export default class ShoppingCartRoute extends Route {
  @service cart;
  @tracked quantity;
  @tracked totalPayable;

  constructor() {
    super(...arguments);
    this.quantity = this.cart.totalItems;
    this.totalPayable = this.cart.totalAmount;
  }
  model() {
    return {
      totalItems: this.cart.totalItems,
      products: this.cart.items.map((item) => item.product),
    };
  }
}
