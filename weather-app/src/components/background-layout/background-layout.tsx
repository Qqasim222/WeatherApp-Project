/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, useEffect, useState } from 'react'
import Clear from '../../assets/images/Clear.jpg'
import Fog from '../../assets/images/fog.jpg'
import Cloudy from '../../assets/images/Cloudy.jpg'
import Rainy from '../../assets/images/Rainy.jpg'
import Snow from '../../assets/images/snow.jpg'
import Stormy from '../../assets/images/Stormy.jpg'
import Haze from '../../assets/images/haze.jpg'



interface BackgroundLayoutProps {
  iconString: string;
}
const BackgroundLayout: FC<BackgroundLayoutProps> = ({iconString}) => {
  const [image, setImage] = useState(Clear)

  useEffect(() => {
    if (iconString) {
      const imageString = iconString
      if (imageString?.toLowerCase().includes('clear')) {
        setImage(Clear)
      } else if (imageString?.toLowerCase().includes('cloud')) {
        setImage(Cloudy)
      } else if (imageString?.toLowerCase().includes('rain') || imageString?.toLowerCase().includes('shower')) {
        setImage(Rainy)
      } else if (imageString?.toLowerCase().includes('snow')) {
        setImage(Snow)
      } else if (imageString?.toLowerCase().includes('fog')) {
        setImage(Fog)
      } else if (imageString?.toLowerCase().includes('thunder') || imageString?.toLowerCase().includes('storm')) {
        setImage(Stormy)
      } else if (imageString?.toLowerCase().includes('haze')) {
        setImage(Haze)
      }
    }
  }, [iconString])

  return (
    <img src={image} alt="weather_image" className='blur-sm	h-full w-full fixed left-0 top-0 -z-[10]' />
  )
}

export default BackgroundLayout