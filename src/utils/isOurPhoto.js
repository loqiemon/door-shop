export default function isOurPhoto (imageStrList) {
    const imageList = imageStrList.split(' ');
    const response = imageList
      .filter(image => image.length > 0)
      .map(image => {
      if (image.match('base64') === null) {
        return `https://${image}`
      } else {
        return image
      }
    })
    // console.log(response)
    return response
  }