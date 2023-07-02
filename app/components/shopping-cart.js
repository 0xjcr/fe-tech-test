import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ShoppingCartComponent extends Component {
  @service cart;
  @tracked quantity;

  constructor() {
    super(...arguments);
    this.quantity = this.cart.totalItems;
  }

  @action
  updateQuantity() {
    this.quantity = this.cart.totalItems;
  }
}


