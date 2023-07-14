import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Slider from '../components/Slider'
import { getLatest } from "../features/pizza/pizzaSlice"

function HomePage() {
  const {pizzas} = useSelector((state) => state.pizzas)
  const dispatch = useDispatch()
  const [bestPizzas, setBestPizzas] = useState([])

  const getBest  = async () => {

    const response = await axios.get("/pizza/best")

    setBestPizzas(response.data.pizzas)

  }

  useEffect(() => {
    dispatch(getLatest())
    getBest()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-[#272629] py-10 lg:px-20 px-5">
      <Header />
     <div className='mb-20'>
     <Slider title={"Latest Pizzas"} pizzas={pizzas} />
      <Slider  title={"Our Recommendations"} pizzas={bestPizzas} />
     </div>
    <Footer />
    </div>
  )
}

export default HomePage