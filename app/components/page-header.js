import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class PageHeaderComponent extends Component {
  @service cart;

  get quantity() {
    return this.cart.quantity;
  }
}
