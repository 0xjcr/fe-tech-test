import { helper } from '@ember/component/helper';

export function formatSubheading([template, quantity]) {
  return template.replace('{quantity}', quantity);
}

export default helper(formatSubheading);
