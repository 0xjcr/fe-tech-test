import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ItemNavComponent extends Component {
  options = [
    { label: 'Groceries', route: 'products' },
    { label: 'Wine', route: 'wine' },
    { label: 'Clothes', route: 'clothes' },
    { label: 'FX', route: 'fx' },
  ];

  @tracked selectedOption = this.options[0];

  @action
  isSelected(option) {
    return option.label === this.selectedOption.label;
  }

  @action
  selectOption(option) {
    this.selectedOption = option;
  }
}
