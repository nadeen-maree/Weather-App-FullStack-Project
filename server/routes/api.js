const express = require('express')
const router = express.Router()
const moment = require('moment')
const axios = require('axios')
const configs = require('../../configs')

const City = require('../model/City')


router.get('/weather/:cityName', async (req, res) => {
  try {
      const cityName = req.params.cityName;
      const url = configs.apiUrl+`${cityName}`

      const response = await axios.get(url)
      const { name, main, weather } = response.data;
      const newCityData = {
          name: name,
          temperature: Math.round(main.temp),
          condition: weather[0].main,
          conditionPic: configs.iconUrl+`${weather[0].icon}`+configs.png,
      }

      res.json(newCityData)
  } catch (error) {
      res.status(500).json({ message: error.message })
  }
})

router.get('/cities', async (req, res) => {
  try {
      const cities = await City.find({})
      res.json(cities)
  } catch (error) {
      res.status(500).json({ message: error.message })
  }
})

router.post('/cities', async (req, res) => {
  try {
      const newCity = new City(req.body)
      await newCity.save()
      res.status(201).json(newCity)
  } catch (error) {
      res.status(400).json({ message: error.message })
  }
})

router.delete('/cities/:cityName', async (req, res) => {
  try {
      const cityName = req.params.cityName
      const deletedCity = await City.findOneAndDelete({ name: cityName })

      res.json({ message: 'City deleted successfully', deletedCity })
  } catch (error) {
      res.status(500).json({ message: error.message })
  }
})


module.exports = router