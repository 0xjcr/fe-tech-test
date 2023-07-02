import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class CartSummaryComponent extends Component {
  @service cart;
  @tracked cartItems = this.cart.items;
  @tracked totalAmount = this.cart.totalAmount;

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
