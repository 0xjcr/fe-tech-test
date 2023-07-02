import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ShoppingCartRoute extends Route {
  @service cart;


model() {
  const products = this.cart.items
    .filter(item => typeof item.product === 'object')
    .map(item => item.product);

  return {
    totalItems: this.cart.totalItems,
    products,
  };
}
}