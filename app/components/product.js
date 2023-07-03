import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ProductComponent extends Component {
  @tracked quantity;
  @service cart;

  constructor() {
    super(...arguments);
    this.quantity = this.cart.getItemQuantity(this.args.product);
  }

  @action
  addToCart() {
    this.cart.add(this.args.product);
    // this.quantity++;
  }

  @action
  incrementQuantity() {
    this.cart.add(this.args.product);
    // this.quantity++;
  }

  @action
  decrementQuantity() {
    this.cart.decrementQuantity(this.args.product);
    // this.quantity = this.cart.getItemQuantity(this.args.product);
  }
}