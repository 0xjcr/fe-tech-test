import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class CartService extends Service {
  @tracked items = [];

  logCartContents() {
    console.log('Current cart contents:', this.items);
  }

  add(product) {
    let cartItem = this.items.find(item => item.product.id === product.id);

    if (cartItem) {
      cartItem.quantity++;
    } else {
      this.items.push({ product: product, quantity: 1 });
    }

    this.logCartContents();
  }

  remove(product) {
    let cartItem = this.items.find(item => item.product.id === product.id);

    if (cartItem) {
      if (cartItem.quantity > 1) {
        cartItem.quantity--;
      } else {
        let index = this.items.indexOf(cartItem);
        if (index !== -1) {
          this.items.splice(index, 1);
        }
      }
    }

    this.logCartContents();
  }

  incrementQuantity(product) {
    let cartItem = this.items.find(item => item.product.id === product.id);
    if (cartItem) {
      cartItem.quantity++;
    }

    this.logCartContents();
  }

  decrementQuantity(product) {
    let cartItem = this.items.find(item => item.product.id === product.id);
    if (cartItem && cartItem.quantity > 1) {
      cartItem.quantity--;
    }

    this.logCartContents();
  }

  get totalAmount() {
    return this.items.reduce((total, item) => total + (item.quantity * item.product.price), 0);
  }
}
