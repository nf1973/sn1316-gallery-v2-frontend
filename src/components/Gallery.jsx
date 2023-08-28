import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { IKImage } from "imagekitio-react";
import Lightbox from "./Lightbox";
import { Link } from "react-router-dom";
import back from "../images/back.svg";

import axios from "axios";

const urlEndpoint = process.env.REACT_APP_IMAGEKIT_ENDPOINT;

function getMonthName(monthNumber) {
  const date = new Date();
  date.setMonth(parseInt(monthNumber) - 1);
  return date.toLocaleString("en-US", { month: "long" });
}

function year(date) {
  return date.slice(0, 4);
}

function month(date) {
  return date.slice(5, 7);
}

export default function Gallery() {
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const [galleryId, setGalleryId] = useState("initial");
  const [gallery, setGallery] = useState([]);
  const [lightboxActive, setLightboxActive] = useState(false);
  const [lightboxImage, setLightboxImage] = useState("");
  const [galleryImages, setGalleryImages] = useState([]);
  if (galleryId === "initial") {
    setGalleryId(new URLSearchParams(location.search).get("id"));
  }

  useEffect(() => {
    const getGallery = async () => {
      let uri = `${process.env.REACT_APP_API_SERVER_URL}/get-gallery/${galleryId}`;
      const response = await axios.get(uri);
      setIsLoading(false);

      response.data.photos.sort((a, b) =>
        b.url < a.url ? 1 : b.url > a.url ? -1 : 0
      );

      setGallery(response.data);
      setGalleryImages(response.data.photos);
    };

    getGallery();
    return () => {};
  }, [galleryId]);

  if (isLoading) {
    return <div> Loading ... </div>;
  }

  return (
    <div className="content">
      <div className="backbutton">
        <Link to="/">
          <ul>
            <li>
              <img src={back} alt="next" width="40" height="40" />
            </li>
            <li>Back</li>
          </ul>
        </Link>
      </div>
      <div className="gallerytitle">{gallery.gallery_name}</div>
      <div className="gallerymonthyear">
        {getMonthName(month(gallery.gallery_date["$date"]))}{" "}
        {year(gallery.gallery_date["$date"])}
      </div>
      <div className="gallery">
        {gallery.photos.map((image, index) => (
          <div key={index}>
            <IKImage
              urlEndpoint={urlEndpoint}
              path={image.url}
              width={300}
              height={300}
              transformation={[{ quality: 80 }]}
              style={{ width: "100%", height: "auto" }}
              onClick={(e) => {
                setLightboxActive(true);
                setLightboxImage(index);
              }}
            />
          </div>
        ))}
      </div>
      <Lightbox
        setLightboxActive={setLightboxActive}
        setLightboxImage={setLightboxImage}
        lightboxActive={lightboxActive}
        lightboxImage={lightboxImage}
        galleryImages={galleryImages}
      />
    </div>
  );
}
