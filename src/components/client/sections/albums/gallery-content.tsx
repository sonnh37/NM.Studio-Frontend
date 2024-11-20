import {Lightbox} from "yet-another-react-lightbox";
import {RowsPhotoAlbum} from "react-photo-album";
import {Slide} from "@/types/slide";
import React, {useState} from "react";
import {Counter, Download, Fullscreen, Thumbnails} from "yet-another-react-lightbox/plugins";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "react-photo-album/rows.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import "yet-another-react-lightbox/plugins/counter.css";

interface GalleryContentProps {
    slides: Slide[];
}

const GalleryContent = ({slides}: GalleryContentProps) => {
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
    return (
        <div>
            <RowsPhotoAlbum
                photos={slides}
                targetRowHeight={150}
                onClick={({index: current}) => setIndex(current)}
            />

            <Lightbox
                index={index}
                slides={slides}
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

export default GalleryContent;
