import React, { useEffect, useState } from 'react'
import isNil from 'lodash'



const Photo = () => {
    const [ photo, setPhoto ] = useState([])
    const [ isFullScreen, setIsFullScreen ] = useState(false)
    let date = new Date()
    // let start_date = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate() - 1}`
    let end_date =  `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`


    const getPhotos = async() => {
        let response = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000?camera=rhaz?earth_date=${end_date}&api_key=JTfR8HeFYXa1mNFjcZN9GfBgRHDXgBYF5mlGn5dV`, {
            method: 'GET'
        })
        let json = await response.json()
        setPhoto(json.photos[0].img_src)
    }

    useEffect(() => {
        getPhotos()
    }, [])

    useEffect(() => {
        let apod = document.querySelector('#today')
        let marsRover = document.querySelector('#mars-rover')
        let body = document.querySelector('body')
        if(isFullScreen) {
            marsRover.style.height = '80vw'
            marsRover.style.position = 'absolute';
            marsRover.style.top = '50%'
            marsRover.style.left = '50%'
            marsRover.style.transform = 'translate(-50%, -50%)'
            body.style.backgroundColor = 'rgba(0,0,0,0.7)'
            apod.style.zIndex = 0
            marsRover.style.zIndex = 1
        } else {
            marsRover.style.height = '30vh'
            marsRover.style.position = 'relative'
            marsRover.style.top = '0%'
            marsRover.style.left = '0%'
            marsRover.style.transform = 'translate(0%, 0%)'
            body.style.backgroundColor = 'white'
            apod.style.zIndex = 0
            marsRover.style.zIndex = 0
        }
        
    }, [isFullScreen])

    return(
        <div  style={{textAlign: 'center'}}>
            <h5>Curiosity Rover</h5>
         { photo && <img id="mars-rover" alt="Todays mars curiosity rovers photo" src={photo} style={{height: '30vh'}} onClick={() => setIsFullScreen(!isFullScreen)}/>}
        </div>
    )
}

export default Photo;