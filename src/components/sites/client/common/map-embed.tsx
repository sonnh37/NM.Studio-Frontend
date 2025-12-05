import React from "react";

const MapEmbed: React.FC = () => {
  return (
    <div className="relative w-full h-full">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.631653619489!2d106.7023657!3d10.7622622!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529b9d82c5b1b%3A0x5c5f3b4f6a2f5a5!2sNh%C6%B0%20My%20Studio!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="absolute inset-0"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/10 pointer-events-none"></div>
    </div>
  );
};

export default MapEmbed;
