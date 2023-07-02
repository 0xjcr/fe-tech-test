import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';



const CART_STORAGE_KEY = 'cartItems';

export default class CartService extends Service {
  @tracked items = [];

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

  logCartContents() {
    console.log('Current cart contents:', this.items);
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
        if (product.code === 'GR1') {
          // Buy 1 get 1 free for Green Tea
          this.items.push({ product: simplifiedProduct, quantity: 2 });
        } else if (product.code === 'SR1' && product.quantity >= 3) {
          // Price drop to 4.50 for 3 or more Strawberries
          simplifiedProduct.price = 4.50;
          this.items.push({ product: simplifiedProduct, quantity: 1 });
        } else if (product.code === 'CF1' && product.quantity >= 3) {
          // Price drop to 2/3 of the original price for 3 or more Coffees
          simplifiedProduct.price = (2 / 3) * simplifiedProduct.price;
          this.items.push({ product: simplifiedProduct, quantity: 1 });
        } else {
          this.items.push({ product: simplifiedProduct, quantity: 1 });
        }
      }

    // if (cartItem) {
    //   cartItem.quantity++;
    // } else {
    //   this.items.push({ product: simplifiedProduct, quantity: 1 });
    // }

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
      if (product.code === 'GR1') {
        // Increment by 2 for Green Tea
        cartItem.quantity += 2;
      } else {
        cartItem.quantity++;
      }
    }

    this.logCartContents();
    this.saveCart();
  }

  decrementQuantity(product) {
    let cartItem = this.items.find((item) => item.product.id === product.id);
    if (cartItem && cartItem.quantity > 0) {
      cartItem.quantity--;
    }

    if (cartItem.quantity === 0) {
        let index = this.items.indexOf(cartItem);
        if (index !== -1) {
          this.items.splice(index, 1);
        }
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
    
return this.items.reduce((total, item) => {
        let itemPrice = item.product.price;
    
        if (item.product.code === 'GR1') {
          // Buy 1 get 1 free for Green Tea
          itemPrice = item.quantity % 2 === 0 ? item.product.price / 2 : item.product.price;
        } else if (item.product.code === 'SR1' && item.quantity >= 3) {
          // Price drop to 4.50 for 3 or more Strawberries
          itemPrice = 4.50;
        } else if (item.product.code === 'CF1' && item.quantity >= 3) {
          // Price drop to 2/3 of the original price for 3 or more Coffees
          itemPrice = (2 / 3) * item.product.price;
        }
    
        return total + item.quantity * itemPrice;
      }, 0);

  }


}
