import React from 'react'
import { Typography, Button, Divider } from '@material-ui/core'
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import Review from './Review'

const stripePromise = loadStripe('...')

const PaymentForm = ({checkoutToken, backStep}) => {
  return (
    <>
      <Review checkoutToken={checkoutToken}/>
      <Divider/>
      <Typography variant='h6' gutterBottom style={{margin: '20px 0'}}>Payment Methods</Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
            {({elements, stripe}) => (
                <form>
                    <CardElement/>
                    <br/>
                    <div style={{display : 'flex', justifyContent: 'space-between'}}>
                        <Button variant='outlined'
                        onClick={backStep}>Back</Button>
                        <Button type='submit' variant='contained' disabled={!stripe} color='primary'>
                            Pay {checkoutToken.subtotal_formatted_with_symbol}
                        </Button>
                    </div>
                </form>
            )}
        </ElementsConsumer>
      </Elements>
    </>
  )
}

export default PaymentForm
