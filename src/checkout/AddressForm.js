import React, {useState, useEffect} from 'react'
import { InputLabel, Select, MenuItem, Button, Grid, Typography } from '@material-ui/core'
import {useForm , FormProvider} from 'react-hook-form'
import FormInput from './customeTextField'
import {Link} from 'react-router-dom'

import { commerce } from '../lib/commerce'

const AddressForm = ({checkoutToken, next}) => {
  const [ShippingCountries, setShippingCountries] = useState([])
  const [ShippingCountry, setShippingCountry] = useState('')
  const [ShippingSubdivisions, setShippingSubdivisions] = useState([])
  const [ShippingSubdivision, setShippingSubdivision] = useState('')
  const [ShippingOptions, setShippingOptions] = useState([])
  const [ShippingOption , setShippingOption] = useState('')
  const methods = useForm()

  const countries = Object.entries(ShippingCountries).map(([code, name]) => ({id: code, label : name}))
  const subdivisions = Object.entries(ShippingSubdivisions).map(([code, name]) => ({id: code, label: name}))
  const options = ShippingOptions.map((sO) => ({id: sO, label: `${sO.description} - (${sO.price.formatted_with_symbol})`}))

  const fetchShippingCountries = async (checkoutTokenId) => {
    const {countries} = await commerce.services.localeListShippingCountries(checkoutTokenId)
    
    setShippingCountries(countries)
    setShippingCountry(Object.keys(countries)[0])
  }

  const fetchSubdivisions = async (countryCode) => {
    const {subdivisions} = await commerce.services.localeListSubdivisions(countryCode)
    setShippingSubdivisions(subdivisions)
    setShippingSubdivision(Object.keys(subdivisions)[0])
  }

  const fetchShippingOptions = async (checkoutTokenId, country, region = null) => {
    const options = await commerce.checkout.getShippingOptions(checkoutTokenId, {country, region})
    setShippingOptions(options)
    setShippingOption(options[0].id)
  }

  useEffect(() => {
    fetchShippingCountries(checkoutToken.id)
  }, [])

  useEffect(() => {
    if(ShippingCountry) fetchSubdivisions(ShippingCountry)
  }, [ShippingCountry])

  useEffect(() => {
    if (ShippingSubdivision) fetchShippingOptions(checkoutToken.id, ShippingCountry, ShippingSubdivision)
  }, [ShippingSubdivision])

  return (
    <>
       <Typography variant='h6' gutterBottom>Shipping Address</Typography>
       <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit((data) => next({...data, ShippingCountry, ShippingSubdivision, ShippingOption}))}>
            <Grid container spacing={3}>
                <FormInput required name='firstname' label='First name'/>
                <FormInput required name='lastname' label='Last name'/>
                <FormInput required name='address1' label='Address'/>
                <FormInput required name='email' label='Email'/>
                <FormInput required name='City' label='City'/>
                <FormInput required name='ZIP' label='ZIP / Postal Code'/>
                <Grid item xs={12} sm={6}>
                    <InputLabel>Shipping Country</InputLabel>
                    <Select value={ShippingCountry} fullWidth onChange={(e) => setShippingCountry(e.target.value)}>
                        {countries.map((country) => (
                            <MenuItem key={country.id} value={country.id}>
                                {country.label}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputLabel>Shipping Subdivisions</InputLabel>
                    <Select value={ShippingSubdivision} fullWidth onChange={(e) => setShippingSubdivision(e.target.value)}> 
                        {subdivisions.map((subdivision) => (
                            <MenuItem key={subdivision.id} value={subdivision.id}>
                                {subdivision.label}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <InputLabel>Shipping Options</InputLabel>
                    <Select value={ShippingOption} fullWidth onChange={(e) => setShippingOption(e.target.value)}>
                        {options.map((option) => (
                            <MenuItem key={option.id} value={option.id}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </Select>
                </Grid>
            </Grid>
            <br />
            <div style={{display: 'flex', justifyContent : 'space-between'}}>
                <Button component={Link} to='/cart' variant='outlined'>Back to Cart</Button>
                <Button type='submit' variant='outlined' color='primary'>Next</Button>
            </div>
        </form>
       </FormProvider>
    </>
  )
}

export default AddressForm
