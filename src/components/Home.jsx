import React, { useState, useEffect } from "react";
import { IKImage } from "imagekitio-react";
import { Link } from "react-router-dom";

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

export default function Home() {
  const [apiGalleries, setApiGalleries] = useState([]);

  useEffect(() => {
    const getGalleries = async () => {
      let uri = `${process.env.REACT_APP_API_SERVER_URL}/list-galleries/`;
      const response = await axios.get(uri);

      response.data.sort(
        (a, b) =>
          parseInt(b.gallery_date["$date"]) - parseInt(a.gallery_date["$date"])
      );

      setApiGalleries(response.data);
    };

    getGalleries();

    return () => {};
  }, []);

  return (
    <>
      <main className="content">
        <div className="galleryList">
          <div className="photos">
            {apiGalleries.map((gallery, _id) => (
              <div key={_id}>
                <Link
                  to={{
                    pathname: "/gallery",
                    search: `?id=${gallery._id["$oid"]}`,
                  }}
                >
                  <IKImage
                    urlEndpoint={urlEndpoint}
                    path={gallery.thumbnail}
                    width={gallery.thumbnail_x}
                    height={gallery.thumbnail_y}
                    transformation={[{ quality: 80 }]}
                    alt={gallery.gallery_name}
                  />
                  <div className="caption">
                    <div className="p1">{gallery.gallery_name}</div>
                    <div className="p2">
                      {getMonthName(month(gallery.gallery_date["$date"]))}{" "}
                      {year(gallery.gallery_date["$date"])}
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
