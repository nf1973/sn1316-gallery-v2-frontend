import { IKImage } from "imagekitio-react";
import arrowLeft from "../images/arrow-left.svg";
import arrowRight from "../images/arrow-right.svg";

const urlEndpoint = process.env.REACT_APP_IMAGEKIT_ENDPOINT;

export default function Lightbox({
  setLightboxActive,
  setLightboxImage,
  lightboxActive,
  lightboxImage,
  galleryImages,
}) {
  return (
    <div>
      {lightboxActive === true && (
        <div className="lightbox">
          {lightboxImage > 0 && (
            <div className="goleft">
              <img
                src={arrowLeft}
                alt="previous"
                width="64"
                height="64"
                onClick={(e) => {
                  setLightboxImage(
                    lightboxImage > 0 ? lightboxImage - 1 : lightboxImage
                  );
                }}
              />
            </div>
          )}

          <IKImage
            urlEndpoint={urlEndpoint}
            path={galleryImages[lightboxImage].url}
            width={galleryImages[lightboxImage].x}
            height={galleryImages[lightboxImage].y}
            transformation={[{ quality: 80 }]}
            style={{ width: "100%", height: "auto" }}
            onClick={(e) => {
              setLightboxActive(false);
              setLightboxImage("");
            }}
          />
          {lightboxImage < galleryImages.length - 1 && (
            <div className="goright">
              <img
                src={arrowRight}
                alt="next"
                width="64"
                height="64"
                onClick={(e) => {
                  setLightboxImage(
                    lightboxImage < galleryImages.length - 1
                      ? lightboxImage + 1
                      : lightboxImage
                  );
                }}
              />
            </div>
          )}
        </div>
      )}{" "}
    </div>
  );
}
