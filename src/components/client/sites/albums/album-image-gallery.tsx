import {Lightbox} from "yet-another-react-lightbox";
import {MasonryPhotoAlbum, RenderImageContext, RenderImageProps} from "react-photo-album";
import {Slide} from "@/types/slide";
import React, {useEffect, useState} from "react";
import {Counter, Download, Fullscreen, Thumbnails,} from "yet-another-react-lightbox/plugins";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "react-photo-album/masonry.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/counter.css";
import {Photo} from "@/types/photo";
import Image from "next/image";

interface AlbumImageGalleryProps {
    photos: Photo[];
}

const AlbumImageGallery = ({photos}: AlbumImageGalleryProps) => {
    const [index, setIndex] = useState(-1);
    const [open, setOpen] = React.useState(false);
    const [position, setPosition] = React.useState<
        "top" | "bottom" | "start" | "end"
    >("bottom");
    const [width, setWidth] = React.useState(120);
    const [height, setHeight] = React.useState(80);
    const [border, setBorder] = React.useState(1);
    const [borderRadius, setBorderRadius] = React.useState(4);
    const [padding, setPadding] = React.useState(4);
    const [gap, setGap] = React.useState(16);
    const [preload, setPreload] = React.useState(2);
    const [showToggle, setShowToggle] = React.useState(false);
    const [animationDuration, setAnimationDuration] = React.useState(500);
    const [maxZoomPixelRatio, setMaxZoomPixelRatio] = React.useState(1);
    const [zoomInMultiplier, setZoomInMultiplier] = React.useState(2);
    const [doubleTapDelay, setDoubleTapDelay] = React.useState(300);
    const [doubleClickDelay, setDoubleClickDelay] = React.useState(300);
    const [doubleClickMaxStops, setDoubleClickMaxStops] = React.useState(2);
    const [keyboardMoveDistance, setKeyboardMoveDistance] = React.useState(50);
    const [wheelZoomDistanceFactor, setWheelZoomDistanceFactor] =
        React.useState(100);
    const [pinchZoomDistanceFactor, setPinchZoomDistanceFactor] =
        React.useState(100);
    const [scrollToZoom, setScrollToZoom] = React.useState(false);

    const [slides_, setSlides_] = useState<Slide[]>([]);

    useEffect(() => {
        const validateImagesAndCreateSlides = async () => {
            const slidesData: Slide[] = [];

            // Loop through the photos and process each image asynchronously.
            for (const photo of photos) {
                const imageSrc = photo.src ?? "/image-notfound.jpg";

                const img = new window.Image();
                img.src = imageSrc;

                img.onload = () => {
                    const width = img.naturalWidth;
                    const height = img.naturalHeight;

                    const slide: Slide = {
                        src: imageSrc,
                        width,
                        height,
                        srcSet: [
                            {
                                src: imageSrc,
                                width,
                                height,
                            },
                        ],
                    };

                    slidesData.push(slide);
                    setSlides_(slidesData);
                };
            }
        };

        validateImagesAndCreateSlides();
    }, [photos]);

    function renderNextImage(
        {alt = "", title, sizes}: RenderImageProps,
        {photo, width, height}: RenderImageContext,
    ) {
        return (
            <div
                style={{
                    width: "100%",
                    position: "relative",
                    aspectRatio: `${width} / ${height}`,
                }}

            >
                <Image
                    // fill
                    src={photo}
                    className="rounded-xl"
                    alt={alt}
                    title={title}
                    width={9999}
                    height={9999}
                    // sizes={sizes}
                    placeholder={"blurDataURL" in photo ? "blur" : undefined}
                />
            </div>
        );
    }

    return (
        <div>
            <MasonryPhotoAlbum
                photos={slides_}
                render={{image: renderNextImage}}
                //targetRowHeight={350}
                columns={3}
                padding={0}
                spacing={12}
                defaultContainerWidth={1200}
                sizes={{
                    size: "1168px",
                    sizes: [
                        {viewport: "(max-width: 1200px)", size: "calc(100vw - 32px)"},
                    ],
                }}
                onClick={({index: current}) => setIndex(current)}
            />

            <Lightbox
                styles={{root: {"--yarl__color_backdrop": "rgba(0, 0, 0, .8)"}}}
                index={index}
                slides={slides_}
                open={index >= 0}
                carousel={{preload}}
                plugins={[Counter, Download, Fullscreen, Thumbnails, Zoom]}
                animation={{zoom: animationDuration}}
                thumbnails={{
                    position,
                    width,
                    height,
                    border,
                    borderRadius,
                    padding,
                    gap,
                    showToggle,
                }}
                zoom={{
                    maxZoomPixelRatio,
                    zoomInMultiplier,
                    doubleTapDelay,
                    doubleClickDelay,
                    doubleClickMaxStops,
                    keyboardMoveDistance,
                    wheelZoomDistanceFactor,
                    pinchZoomDistanceFactor,
                    scrollToZoom,
                }}
                close={() => setIndex(-1)}
            />
        </div>
    );
};

export default AlbumImageGallery;
