import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class QuantitySelectorComponent extends Component {
  @service cart;

  

  get quantity() {
    return this.cart.getItemQuantity(this.product.id);
  }

  incrementQuantity() {
    this.cart.incrementQuantity(this.product);
    console.log(
      'QuantitySelectorComponent - Increment Quantity:',
      this.quantity
    );
  }

  decrementQuantity() {
    this.cart.decrementQuantity(this.product);
    console.log(
      'QuantitySelectorComponent - Decrement Quantity:',
      this.quantity
    );
  }
}
