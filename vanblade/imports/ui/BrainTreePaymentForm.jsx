import React, { Component } from 'react';
import braintree from 'braintree-web';

// App component - represents the whole app
export default class BrainTreePaymentForm extends Component {
  // var submitBtn = document.getElementById('my-submit');
  // var form = document.getElementById('my-sample-form');



  componentDidMount() {
    braintree.client.create({
      authorization: CLIENT_AUTHORIZATION
    }, clientDidCreate);
  }
  clientDidCreate(err, client) {
    braintree.hostedFields.create({
      client: client,
      styles: {
        'input': {
          'font-size': '16pt',
          'color': '#3A3A3A'
        },

        '.number': {
          'font-family': 'monospace'
        },

        '.valid': {
          'color': 'green'
        }
      },
      fields: {
        number: {
          selector: '#card-number'
        },
        cvv: {
          selector: '#cvv'
        },
        expirationDate: {
          selector: '#expiration-date'
        }
      }
    }, hostedFieldsDidCreate);
  }

  hostedFieldsDidCreate(err, hostedFields) {
    // submitBtn.addEventListener('click', submitHandler.bind(null, hostedFields));
    // submitBtn.removeAttribute('disabled');
  }

  submitHandler(hostedFields, event) {
    event.preventDefault();
    submitBtn.setAttribute('disabled', 'disabled');

    hostedFields.tokenize(function (err, payload) {
      if (err) {
        submitBtn.removeAttribute('disabled');
        console.error(err);
      } else {
        form['payment_method_nonce'].value = payload.nonce;
        form.submit();
      }
    });
  }

  render() {
    return (
      <form id="checkout-form" action="" method="post">
        <div id="error-message"></div>

        <label for="card-number">Card Number</label>
        <div class="hosted-field" id="card-number"></div>

        <label for="cvv">CVV</label>
        <div class="hosted-field" id="cvv"></div>

        <label for="expiration-date">Expiration Date</label>
        <div class="hosted-field" id="expiration-date"></div>

        <input type="hidden" name="payment_method_nonce"></input>
        <input type="submit" value="Pay $10" disabled></input>
      </form>
    );
  }
}
