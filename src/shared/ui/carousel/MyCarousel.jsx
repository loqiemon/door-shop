import React from 'react'
import Carousel from 'react-material-ui-carousel'

export function MyCarousel({
  children,
  ...props
}) {
  return (
    <Carousel {...props}>
      {children}
    </Carousel>
  )
}

export default MyCarousel
