import calculatePizzaPrice from './calculatePizzaPrice';
import formatMoney from './formatMoney';

export default function calculateOrderTotal(order, pizzas) {
  // loop over each item in the order
  // calc the total for that pizza
  // add that total to running total
  return order.reduce((runningTotal, singleOrder) => {
    const pizza = pizzas.find(
      (singlePizza) => singlePizza.id === singleOrder.id
    );
    return runningTotal + calculatePizzaPrice(pizza.price, singleOrder.size);
  }, 0);
}
