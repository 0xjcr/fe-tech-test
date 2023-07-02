import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

const CART_STORAGE_KEY = 'cartItems';

export default class CartService extends Service {
  @tracked items = [];

  constructor() {
    super(...arguments);
    this.loadCart();
  }

  logCartContents() {
    console.log('Current cart contents:', this.items);
  }

  loadCart() {
    const cartItems = localStorage.getItem(CART_STORAGE_KEY);

    if (cartItems) {
      this.items = JSON.parse(cartItems);
    }
  }

  saveCart() {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(this.items));
  }

  add(product) {
    let simplifiedProduct = {
      id: product.id,
      name: product.name,
      price: product.price,
      code: product.code,
      image: product.image,
      promotion: product.promotion,
    };

    let cartItem = this.items.find((item) => item.product.id === product.id);

    if (cartItem) {
      cartItem.quantity++;
    } else {
      this.items.push({ product: simplifiedProduct, quantity: 1 });
    }

    this.logCartContents();
    this.saveCart();
  }

  remove(product) {
    let cartItem = this.items.find((item) => item.product.id === product.id);

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
    this.saveCart();
  }

  incrementQuantity(product) {
    let cartItem = this.items.find((item) => item.product.id === product.id);
    if (cartItem) {
      cartItem.quantity++;
    }

    this.logCartContents();
    this.saveCart();
  }

  decrementQuantity(product) {
    let cartItem = this.items.find((item) => item.product.id === product.id);
    if (cartItem && cartItem.quantity > 1) {
      cartItem.quantity--;
    }

    this.logCartContents();
    this.saveCart();
  }

  getItemQuantity(product) {
    let cartItem = this.items.find((item) => item.product.id === product.id);
    return cartItem ? cartItem.quantity : 0;
  }

  get totalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  get totalAmount() {
    return this.items.reduce(
      (total, item) => total + item.quantity * item.product.price,
      0
    );
  }
}
