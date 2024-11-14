import React from 'react';

const MapEmbed: React.FC = () => {
    return (
        <div style={{ width: '100%' }}>
            <iframe
                width="100%"
                height="600"
                frameBorder="0"
                scrolling="no"
                style={{ border: 0 }}
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=1806/66%20huy%CC%80nh%20t%C3%A2%CC%81n%20pha%CC%81t+(Nhu%20My%20Studio)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                title="Google Map Embed"
            ></iframe>
        </div>
    );
};

export default MapEmbed;
