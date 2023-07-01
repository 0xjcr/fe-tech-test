import { A } from '@ember/array';
import Service from '@ember/service';

export default class CartService extends Service {
  products = A([]);

  add(product) {
    this.products.pushObject(product);
  }

  remove(product) {
    this.products.removeObject(product);
  }

}
