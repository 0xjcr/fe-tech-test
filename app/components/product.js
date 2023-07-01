import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ProductComponent extends Component {
  @tracked quantity = 0;

  @action
  addToCart() {
    this.quantity++;
  }

  @action
  incrementQuantity() {
    this.quantity++;
  }

  @action
  decrementQuantity() {
    this.quantity--;
    if (this.quantity < 0) this.quantity = 0;
  }
}
