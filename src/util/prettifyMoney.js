function prettifyMoney(money) {
    return (money / 100).toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
    });
  } 

  export default prettifyMoney;