import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';


export default class ShoppingCartRoute extends Route {
  @service cart;

  model() {
    return {
      quantity: this.cart.quantity,
      products: this.cart.items.map((item) => item.product),
    };
  }

  
}
