import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class CartCardComponent extends Component {
  @service cart;
  @tracked quantity;

  constructor() {
    super(...arguments);
    this.quantity = this.cart.getItemQuantity(this.args.product);
  }

  @action
  incrementQuantity() {
    this.cart.incrementQuantity(this.args.product);
    this.quantity = this.cart.getItemQuantity(this.args.product);
  }

  @action
  decrementQuantity() {
    this.cart.decrementQuantity(this.args.product);
    this.quantity = this.cart.getItemQuantity(this.args.product);
  }
}
