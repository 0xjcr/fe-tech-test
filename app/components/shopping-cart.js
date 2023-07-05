import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ShoppingCartComponent extends Component {
  @service cart;

  @action
  updateQuantity() {
    this.quantity = this.cart.totalItems;
    this.totalPayable = this.cart.totalAmount;
  }
}
