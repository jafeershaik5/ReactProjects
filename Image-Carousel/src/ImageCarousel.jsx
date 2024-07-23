import React, { useEffect, useState, useRef } from "react";
import "./ImageCarousel.css";

export default function ImageCarousel() {
    const [photos, setPhotos] = useState([]);
    const [currentImg, setCurrentImg] = useState(0);
    const intervalRef = useRef(null);

    const prevImg = () => {
        setCurrentImg((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
    };

    const nextImg = () => {
        setCurrentImg((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
    };

    useEffect(() => {
        const getPhotos = async () => {
            try {
                const response = await fetch(
                    "https://api.slingacademy.com/v1/sample-data/photos"
                );
                const images = await response.json();
                setPhotos(images.photos);
            } catch (err) {
                console.log(err);
            }
        };

        getPhotos();

        intervalRef.current = setInterval(nextImg, 1000); // Start auto-slide

        return () => {
            clearInterval(intervalRef.current); // Cleanup on unmount
        };
    }, [photos.length]);

    const handleMouseEnter = () => {
        clearInterval(intervalRef.current); // Stop auto-slide on mouse enter
    };

    const handleMouseLeave = () => {
        intervalRef.current = setInterval(nextImg, 1000); // Resume auto-slide on mouse leave
    };

    if (photos.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container">
            <button onClick={prevImg}>{"<"}</button>
            <div className="images">
                {/* <img
                    src={photos[currentImg].url}
                    alt={photos[currentImg].title}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                /> */}
                {photos.map((image, index) => {
                    return <img key={image.id} src={image.url} alt="" className={index === currentImg ? "active" : "hidden"} />
                })}
            </div>
            <button onClick={nextImg}>{">"}</button>
        </div>
    );
}
