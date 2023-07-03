import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

const CART_STORAGE_KEY = 'cartItems';

export default class CartService extends Service {
  @tracked items = [];
  @tracked shippingCost = 0;

  constructor() {
    super(...arguments);
    this.loadCart();
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

  refreshPage() {
    window.location.reload();
  }

  updateCart() {
    this.saveCart();
    this.refreshPage();
  }

  add(product) {
    const existingCartItem = this.items.find(
      (item) => item.product.id === product.id
    );

    if (existingCartItem) {
      console.log('existingcartitem', existingCartItem)
      if (existingCartItem.product.code === 'GR1') existingCartItem.quantity+=2
      else existingCartItem.quantity++
    } else {
      const simplifiedProduct = {
        id: product.id,
        name: product.name,
        price: product.price,
        code: product.code,
        image: product.image,
        promotion: product.promotion,
      };

      if (product.code === 'GR1') {
        // Buy 1 get 1 free for Green Tea
        this.items.push({ product: simplifiedProduct, quantity: 2 });
      } else if (product.code === 'SR1' && product.quantity >= 3) {
        // Price drop to 4.50 for 3 or more Strawberries
        simplifiedProduct.price = 4.5;
        this.items.push({ product: simplifiedProduct, quantity: 1 });
      } else if (product.code === 'CF1' && product.quantity >= 3) {
        // Price drop to 2/3 of the original price for 3 or more Coffees
        simplifiedProduct.price = (2 / 3) * simplifiedProduct.price;
        this.items.push({ product: simplifiedProduct, quantity: 1 });
      } else {
        this.items.push({ product: simplifiedProduct, quantity: 1 });
      }
    }

    this.updateCart();
  }

  remove(product) {
    const cartItem = this.items.find((item) => item.product.id === product.id);

    if (cartItem) {
      if (cartItem.quantity > 1) {
        cartItem.quantity--;
      } else {
        const index = this.items.indexOf(cartItem);
        if (index !== -1) {
          this.items.splice(index, 1);
        }
      }
    }

    this.updateCart();
  }

  incrementQuantity(product) {
    const cartItem = this.items.find((item) => item.product.id === product.id);
    if (cartItem) {
      if (product.code === 'GR1') {
        // Increment by 2 for Green Tea
        cartItem.quantity += 2;
      } else {
        cartItem.quantity++;
      }
    }

    this.updateCart();
  }

  decrementQuantity(product) {
    const cartItem = this.items.find((item) => item.product.id === product.id);
    if (cartItem && cartItem.quantity >= 1) {
      if (product.code === 'GR1') {
        // Decrement by 2 for Green Tea
        cartItem.quantity -= 2;
      } else {
        cartItem.quantity--;
      }
    }

    if (cartItem.quantity === 0) {
      const index = this.items.indexOf(cartItem);
      if (index !== -1) {
        this.items.splice(index, 1);
      }
    }

    this.updateCart();
  }

  getItemQuantity(product) {
    const cartItem = this.items.find((item) => item.product.id === product.id);
    return cartItem ? cartItem.quantity : 0;
  }

  get totalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  get subtotal() {
    return this.items.reduce((total, item) => {
      const itemPrice = item.product.price;
      return total + item.quantity * itemPrice;
    }, 0);
  }

  get totalDiscount() {
    return this.items.reduce((total, item) => {
      let itemDiscount = 0;

      if (item.product.code === 'GR1') {
        // Discount for Green Tea
        const greenTeaCount = Math.floor(item.quantity / 2);
        itemDiscount = greenTeaCount * item.product.price;
      } else if (item.product.code === 'SR1' && item.quantity >= 3) {
        // Discount for Strawberries
        itemDiscount = 0.5 * item.quantity;
      } else if (item.product.code === 'CF1' && item.quantity >= 3) {
        // Discount for Coffees
        itemDiscount = 3.743 * item.quantity;
      }

      return total + itemDiscount;
    }, 0);
  }

  get totalPayable() {
    const shippingCost = 0;
    return this.subtotal - this.totalDiscount + shippingCost;
  }
}
