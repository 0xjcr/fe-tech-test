import EmberRouter from '@ember/routing/router';
import config from 'kshop-app/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('products', { path: '/' });
  this.route('products');
  this.route('shopping-cart');
  this.route('not-found', { path: '/*path' });
});
