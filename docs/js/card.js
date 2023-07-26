const stripe = Stripe('pk_live_51IsYZkGtDUzBHQSTbc8wdswNvjQGL9IM1S6FhpYYIA7zGUQ3MnGac6H8z96OTqbw4YNYHzFXFzKdFmqSiEzeN0vv00honnZXPT'); // Your Publishable Key
// const stripe = Stripe('pk_test_51IsYZkGtDUzBHQSTYHZ08FeVRuxRGxLi2jenLAQGxKaz49hRXwE4BJmqMHaMHy1oTXUW1YcFaOoz9RpVBII2IWL700LjHZS2bZ'); // Your Publishable Key
const elements = stripe.elements();

// Create our card inputs
var style = {
  base: {
    color: "#000"
  }
};

// OLD

// const card = elements.create('card', { style });
// card.mount('#card-element');
//
// const form = document.querySelector('form#water-card-form');
// const errorEl = document.querySelector('#card-errors');
//
// const stripeTokenHandler = token => {
//   const hiddenInput = document.createElement('input');
//   hiddenInput.setAttribute('type', 'hidden');
//   hiddenInput.setAttribute('name', 'stripeToken');
//   hiddenInput.setAttribute('value', token.id);
//   form.appendChild(hiddenInput);
//
//   form.submit();
// }
//
// form.addEventListener('submit', e => {
//   e.preventDefault();
//
//   stripe.createToken(card).then(res => {
//     if (res.error) errorEl.textContent = res.error.message;
//     else stripeTokenHandler(res.token);
//   })
// })

// NEW: INTEGRATING SOCKET

const card = elements.create('card', {
  style
});
card.mount('#card-element');

const form = document.querySelector('form#water-card-form');
const errorEl = document.querySelector('#card-errors');

// Give our token to our form
const stripeTokenHandler = token => {
  const hiddenInput = document.createElement('input');
  hiddenInput.setAttribute('type', 'hidden');
  hiddenInput.setAttribute('name', 'stripeToken');
  hiddenInput.setAttribute('value', token.id);
  form.appendChild(hiddenInput);

  // let waterNameFirst = document.querySelector('#water-name-first')
  // let waterNameLast = document.querySelector('#water-name-last')
  // let waterEmail = document.querySelector('#water-email')
  // let waterButtons = document.querySelectorAll('button.amount-button')
  // let waterInput = document.querySelector('#amount')
  // let data = {
  //   "name": waterNameFirst.value,
  //   "name_last": waterNameLast.value,
  //   "email": waterEmail.value,
  //   "amount": waterInput.value,
  //   "type": "water",
  //   "joined": Date.now()
  // }
  // socket.emit('water donation', data)

  form.submit();
}

// Create token from card data
form.addEventListener('submit', e => {
  e.preventDefault();

  stripe.createToken(card).then(res => {
    if (res.error) errorEl.textContent = res.error.message;
    else stripeTokenHandler(res.token);
  })
})
