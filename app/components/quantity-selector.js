import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class QuantitySelectorComponent extends Component {
  @service cart;

  get quantity() {
    return this.cart.getItemQuantity(this.product.id);
  }

  incrementQuantity() {
    this.cart.incrementQuantity(this.product);
  }

  decrementQuantity() {
    this.cart.decrementQuantity(this.product);
  }
}
