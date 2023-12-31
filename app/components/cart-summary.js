import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class CartSummaryComponent extends Component {
  @service cart;

  constructor() {
    super(...arguments);

    this.cartItems = this.cart.items;
    this.totalAmount = this.cart.totalAmount;
  }

  @action
  updateCart() {
    this.cartItems = this.cart.items;
    this.totalAmount = this.cart.totalAmount;
  }
}
