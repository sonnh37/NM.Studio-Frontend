import React from 'react';

const MapEmbed: React.FC = () => {
    return (
        <iframe
            width="100%"
            height="100%"
            frameBorder="0"
            title="map"
            scrolling="no"
            src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1806/66%20huy%CC%80nh%20t%C3%A2%CC%81n%20pha%CC%81t+(Nhu%20My%20Studio)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            //   style={{ filter: "grayscale(1) contrast(1.2) opacity(0.4)" }}
        ></iframe>
    );
};

export default MapEmbed;
