import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class CartCardComponent extends Component {
  @tracked quantity;
  @service cart;

  constructor() {
    super(...arguments);
    this.quantity = this.cart.getItemQuantity(this.args.product);
  }

  get quantity() {
    if (!this.args.product) {
      return 0;
    }

    let cartItem = this.cart.items.find(
      (item) => item.product.id === this.args.product.id
    );

    return cartItem ? cartItem.quantity : 0;
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
