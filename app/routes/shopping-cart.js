import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ShoppingCartRoute extends Route {
  @service cart;

  get quantity() {
    return this.cart.totalItems;
  }

  get totalPayable() {
    return this.cart.totalAmount;
  }

  model() {
    return {
      cart: this.cart,
      quantity: this.quantity,
      totalPayable: this.totalPayable,
    };
  }
}
