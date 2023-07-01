import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ProductComponent extends Component {
  @tracked quantity = 0;
  @service cart;

  @action
  addToCart() {
    this.cart.add(this.args.product);
    this.quantity++;
  }

  @action
  incrementQuantity() {
    this.cart.add(this.args.product);
    this.quantity++;
  }

  @action
  decrementQuantity() {
    this.quantity--;
    if (this.quantity < 0) this.quantity = 0;
    if (this.quantity === 0) this.cart.remove(this.args.product);
  }
}
