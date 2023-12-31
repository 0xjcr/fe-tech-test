import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ProductComponent extends Component {
  @service cart;
  @tracked quantity;

  constructor() {
    super(...arguments);
    this.quantity = this.cart.getItemQuantity(this.args.product);
  }

  @action
  addToCart() {
    this.cart.add(this.args.product);
    this.updateQuantity();
  }

  @action
  incrementQuantity() {
    this.cart.add(this.args.product);
    this.updateQuantity();
  }

  @action
  decrementQuantity() {
    this.cart.decrementQuantity(this.args.product);
    this.updateQuantity();
  }

  updateQuantity() {
    this.quantity = this.cart.getItemQuantity(this.args.product);
  }
}
