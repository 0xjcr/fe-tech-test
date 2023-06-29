import Model, { attr } from '@ember-data/model';

export default class ProductModel extends Model {
  @attr('string') name;
  @attr('number', { precision: 2 }) price;
  @attr('string') code;

}
