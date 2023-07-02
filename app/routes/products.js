// import Route from '@ember/routing/route';
// import { service } from '@ember/service';

// export default class ProductsRoute extends Route {
//   @service store;

//   async model() {
//     return this.store.findAll('product');
//   }
// }

import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class ProductsRoute extends Route {
  @service store;
  @service cart;

  async model() {
    const products = await this.store.findAll('product');
    this.products = products;
    return products;
  }

  @action
  updateProducts() {
    this.products = this.store.peekAll('product');
  }
}
