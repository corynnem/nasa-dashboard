import React, { useEffect, useState } from 'react'



const APOD = (props) => {
    const { date } = props
    const [ photo, setPhoto ] = useState([])
    const [ isFullScreen, setIsFullScreen ] = useState(false)


    const getPhoto = async() => {
        let response = await fetch(`https://api.nasa.gov/planetary/apod?${date !== undefined ? `date=${date}&` : ''}api_key=WNfY0ppjYOpt0B07p8TqCFAPvUGPlqYlDRrlc2Rb`, {
            method: 'GET'
        })
        let json = await response.json()
        setPhoto(json)
    }

    useEffect(() => {
        getPhoto()
    }, [])


    useEffect(() => {
        let apod = document.querySelector('#today')
        let marsRover = document.querySelector('#mars-rover')
        let body = document.querySelector('body')
        if(isFullScreen) {
            apod.style.height = '80vw'
            apod.style.position = 'absolute';
            apod.style.top = '50%'
            apod.style.left = '50%'
            apod.style.transform = 'translate(-50%, -50%)'
            body.style.backgroundColor = 'rgba(0,0,0,0.7)'
            apod.style.zIndex = 1
            // marsRover.style.zIndex = 0
        } else {
            apod.style.height = '30vh'
            apod.style.position = 'relative'
            apod.style.top = '0%'
            apod.style.left = '0%'
            apod.style.transform = 'translate(0%, 0%)'
            body.style.backgroundColor = 'white'
            apod.style.zIndex = 0
            marsRover.style.zIndex = 0
        }
        
    }, [isFullScreen])

    console.log(photo)
    return(
        <div style={{textAlign: 'center'}}>
            <h5>Today's Astronomy Picture Of the Day (APOD)</h5>
            <div className="apod">
            { photo && <img id='today' src={photo.hdurl} style={{height: '30vh'}} onClick={() => setIsFullScreen(!isFullScreen)}/>}
            <p style={{padding: '10px', fontSize: '.75em'}}>{photo.explanation}</p>
            </div>
        </div>
    )
}

export default APOD;