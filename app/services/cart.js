import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class CartService extends Service {
  
  @tracked items = JSON.parse(localStorage.getItem('cartItems')) || [];
  @tracked shippingCost = JSON.parse(localStorage.getItem('shippingCost')) || 0;
  @tracked quantity = JSON.parse(localStorage.getItem('quantity')) || 0;
  @tracked subtotal = JSON.parse(localStorage.getItem('subtotal')) || 0;
  @tracked totalDiscount =
    JSON.parse(localStorage.getItem('totalDiscount')) || 0;
  @tracked totalPayable = JSON.parse(localStorage.getItem('totalPayable')) || 0;

  @action
  updateCart() {
    this.subtotal = this.calculateSubtotal();
    this.totalDiscount = this.calculateTotalDiscount();
    this.totalPayable = this.calculateTotalPayable();
    this.quantity = this.calculateTotalQuantity();
    this.items = [...this.items];
    this.saveToLocalStorage();
  }

  calculateSubtotal() {
    return this.items.reduce((total, item) => {
      const itemPrice = item.product.price;
      return total + item.quantity * itemPrice;
    }, 0);
  }

  calculateTotalDiscount() {
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
        // Discount for Coffee
        itemDiscount = 3.743 * item.quantity;
      }

      return total + itemDiscount;
    }, 0);
  }

  calculateTotalPayable() {
    const shippingCost = 0;
    return this.subtotal - this.totalDiscount + shippingCost;
  }

  calculateTotalQuantity() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  @action
  add(product) {
    const existingCartItem = this.items.find(
      (item) => item.product.id === product.id
    );

    if (existingCartItem) {
      if (existingCartItem.product.code === 'GR1') {
        existingCartItem.quantity += 2;
      } else {
        existingCartItem.quantity++;
      }
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
    this.saveToLocalStorage();
  }

  @action
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

  @action
  incrementQuantity(product) {
    const cartItem = this.items.find((item) => item.product.id === product.id);
    if (cartItem) {
      // Green Tea 2 for 1
      if (product.code === 'GR1') {
        cartItem.quantity += 2;
      } else {
        cartItem.quantity++;
      }
    }

    this.updateCart();
    this.saveToLocalStorage();
  }

  @action
  decrementQuantity(product) {
    const cartItem = this.items.find((item) => item.product.id === product.id);
    if (cartItem && cartItem.quantity >= 1) {
      // Green Tea 2 for 1
      if (product.code === 'GR1') {
        cartItem.quantity -= 2;
      } else {
        cartItem.quantity--;
      }
    }

    if (cartItem.quantity === 0) {
      this.items = this.items.filter((item) => item.product.id !== product.id);
    }

    this.updateCart();
    this.saveToLocalStorage();
  }

  getItemQuantity(product) {
    const cartItem = this.items.find((item) => item.product.id === product.id);
    return cartItem ? cartItem.quantity : 0;
  }

  saveToLocalStorage() {
    localStorage.setItem('cartItems', JSON.stringify(this.items));
    localStorage.setItem('shippingCost', JSON.stringify(this.shippingCost));
    localStorage.setItem('quantity', JSON.stringify(this.quantity));
    localStorage.setItem('subtotal', JSON.stringify(this.subtotal));
    localStorage.setItem('totalDiscount', JSON.stringify(this.totalDiscount));
    localStorage.setItem('totalPayable', JSON.stringify(this.totalPayable));
  }
}
