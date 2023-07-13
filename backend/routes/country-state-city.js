import express from "express";
import logger from "../logger.js";

const router = express.Router();

import { Country, City }  from 'country-state-city';


router.get("/getAllCountries", async (req, res, next) => {
  logger.info(`Accessing route for getting all countries - ${req.ip}`);
  let countries = Country.getAllCountries();
  let countryArray = [];
  countries.forEach((country) => {
    countryArray.push({
      countryCode: country.isoCode,
      countryName: country.name,
    });
  });
  res.json(countryArray);
});


router.get("/getAllCities", async (req, res, next) => {
  logger.info(`Accessing route for getting all cities - ${req.ip}`);
  let countryCode = req.query.country;
  let cities = City.getCitiesOfCountry(countryCode);
  let citiesArray = [];
  cities.forEach((city) => {
    citiesArray.push(city.name);
  });
  res.json(citiesArray);
});

export default router;
