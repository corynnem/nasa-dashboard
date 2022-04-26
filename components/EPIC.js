import React, { useEffect, useState } from "react";

const EPIC = (props) => {
  const { photo, photoDate } = props;
  const [isFullScreen, setIsFullScreen] = useState(false);


  const toggleFullScreen = () => {

    let epic = document.querySelector("#epic");
    let body = document.querySelector("body");
    if (isFullScreen) {
      epic.style.height = "80vw";
      epic.style.position = "absolute";
      epic.style.top = "50%";
      epic.style.left = "50%";
      epic.style.transform = "translate(-50%, -50%)";
      body.style.backgroundColor = "rgba(0,0,0,0.7)";
      epic.style.zIndex = 1;
    } else {
      epic.style.height = "30vh";
      epic.style.position = "relative";
      epic.style.top = "0%";
      epic.style.left = "0%";
      epic.style.transform = "translate(0%, 0%)";
      body.style.backgroundColor = "white";
      epic.style.zIndex = 0;
    }

  };
 
  useEffect(() => {
      photo && toggleFullScreen()
  }, [photoDate])

  useEffect(() => {
    photo && toggleFullScreen();
  }, [isFullScreen]);
console.log(photo)
  return (
    <div style={{ textAlign: "center"}}>
      <h5>Earth&lsquo;s Polychromatic Imaging Camera (EPIC)</h5>
      {photo && photoDate ? (
        <img
          id="epic"
          alt="Todays earth polychromatic imaging camera image"
          src={`https://epic.gsfc.nasa.gov/archive/natural/${photoDate && photoDate[0]}/${
            photoDate && photoDate[1]
          }/${photoDate && photoDate[2].split(" ")[0]}/png/${photoDate && photo.image}.png`}
          style={{ height: "30vh" }}
          onClick={() => setIsFullScreen(!isFullScreen)}
        />
      ) : "Loading..."}
    </div>
  );
};

export default EPIC;
