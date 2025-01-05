import { supabase } from '../supabaseClient'

// Bank of Georgia API integration
const processBankOfGeorgiaPayment = async (paymentData) => {
  try {
    const response = await fetch('https://api.bog.ge/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.VITE_BOG_API_KEY}`
      },
      body: JSON.stringify(paymentData)
    })
    
    if (!response.ok) throw new Error('Bank of Georgia payment failed')
    return await response.json()
  } catch (error) {
    console.error('Bank of Georgia payment error:', error)
    throw error
  }
}

// TBC Bank API integration
const processTBCPayment = async (paymentData) => {
  try {
    const response = await fetch('https://api.tbcbank.ge/payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.VITE_TBC_API_KEY}`
      },
      body: JSON.stringify(paymentData)
    })
    
    if (!response.ok) throw new Error('TBC payment failed')
    return await response.json()
  } catch (error) {
    console.error('TBC payment error:', error)
    throw error
  }
}

// Apple Pay integration
const processApplePay = async (paymentData) => {
  try {
    if (!window.ApplePaySession) {
      throw new Error('Apple Pay not supported')
    }

    const session = new ApplePaySession(3, {
      countryCode: 'GE',
      currencyCode: 'GEL',
      supportedNetworks: ['visa', 'masterCard'],
      merchantCapabilities: ['supports3DS'],
      total: {
        label: 'Football Gear',
        amount: paymentData.amount
      }
    })

    session.onvalidatemerchant = async (event) => {
      const validationURL = event.validationURL
      const merchantSession = await fetch('/api/apple-pay-validate', {
        method: 'POST',
        body: JSON.stringify({ validationURL })
      })
      session.completeMerchantValidation(await merchantSession.json())
    }

    session.onpaymentauthorized = async (event) => {
      const payment = event.payment
      // Process payment with your backend
      const result = await processPayment(payment)
      session.completePayment(result.status === 'success' ? 'success' : 'failure')
      return result
    }

    session.begin()
  } catch (error) {
    console.error('Apple Pay error:', error)
    throw error
  }
}

// Google Pay integration
const processGooglePay = async (paymentData) => {
  try {
    if (!window.PaymentRequest) {
      throw new Error('Google Pay not supported')
    }

    const paymentRequest = new PaymentRequest(
      {
        supportedMethods: 'https://google.com/pay',
        data: {
          environment: 'TEST',
          apiVersion: 2,
          apiVersionMinor: 0,
          merchantInfo: {
            merchantId: process.env.VITE_GOOGLE_MERCHANT_ID,
            merchantName: 'Football Gear'
          },
          allowedPaymentMethods: [
            {
              type: 'CARD',
              parameters: {
                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                allowedCardNetworks: ['VISA', 'MASTERCARD']
              }
            }
          ]
        }
      },
      {
        total: {
          label: 'Total',
          amount: {
            currency: 'GEL',
            value: paymentData.amount
          }
        }
      }
    )

    const paymentResponse = await paymentRequest.show()
    const result = await processPayment(paymentResponse)
    await paymentResponse.complete(result.status === 'success' ? 'success' : 'failure')
    return result
  } catch (error) {
    console.error('Google Pay error:', error)
    throw error
  }
}

// Unified payment processor
export const processPayment = async (paymentData, method) => {
  try {
    let result
    switch (method) {
      case 'bog':
        result = await processBankOfGeorgiaPayment(paymentData)
        break
      case 'tbc':
        result = await processTBCPayment(paymentData)
        break
      case 'apple':
        result = await processApplePay(paymentData)
        break
      case 'google':
        result = await processGooglePay(paymentData)
        break
      default:
        throw new Error('Invalid payment method')
    }

    // Save payment to Supabase
    await supabase.from('payments').insert([{
      payment_id: result.id,
      amount: paymentData.amount,
      currency: paymentData.currency || 'GEL',
      method,
      status: 'success',
      order_id: paymentData.order_id
    }])

    return { status: 'success', data: result }
  } catch (error) {
    await supabase.from('payments').insert([{
      payment_id: null,
      amount: paymentData.amount,
      currency: paymentData.currency || 'GEL',
      method,
      status: 'failed',
      error: error.message,
      order_id: paymentData.order_id
    }])
    return { status: 'error', error: error.message }
  }
}
