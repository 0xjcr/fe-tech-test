import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class CartSummaryComponent extends Component {
  @service cart;

  constructor() {
    super(...arguments);

    console.log('Total Amount By Product:', this.totalAmountByProduct);
  }

}
