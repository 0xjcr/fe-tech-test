export default function () {
  this.namespace = '/api';

  this.get('/products', function () {
    return {
      data: [
        {
          type: 'product',
          id: 'GR1',
          attributes: {
            name: 'Green Tea',
            price: 3.11,
            code: 'GR1',
            image: 'images/green-tea.png',
          },
        },
        {
          type: 'product',
          id: 'SR1',
          attributes: {
            name: 'Strawberries',
            price: 5.00,
            code: 'SR1',
            image: 'images/strawberries.png',
          },
        },
        {
          type: 'product',
          id: 'CF1',
          attributes: {
            name: 'Coffee',
            price: 11.23,
            code: 'CF1',
            image: 'images/coffee.png',
          },
        },
      ],
    };
  });
}
