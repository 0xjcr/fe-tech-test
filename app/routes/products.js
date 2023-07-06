import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ProductsRoute extends Route {
  @service store;
  @service cart;

  async model() {
    const products = await this.store.findAll('product');
    this.products = products;
    return products;
  }
}
