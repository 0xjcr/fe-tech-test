import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class CartCardComponent extends Component {
  @service cart;

  get quantity() {
    return this.cart.getItemQuantity(this.args.product);
  }

  @action
  incrementQuantity() {
    this.cart.incrementQuantity(this.args.product);
  }

  @action
  decrementQuantity() {
    this.cart.decrementQuantity(this.args.product);
  }
}
