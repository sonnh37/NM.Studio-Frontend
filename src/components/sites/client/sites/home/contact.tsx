import React from "react";
import MapEmbed from "../../common/map-embed";

const Contact = () => {
    return (
        <section className="text-gray-700 h-screen body-font relative">
            <div className="absolute inset-0 bg-gray-300">
                <MapEmbed/>
            </div>
            {/* <div className="container px-5 py-24 mx-auto flex">
        <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10">
          <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">Feedback</h2>
          <p className="leading-relaxed mb-5 text-gray-600">
            Post-ironic portland shabby chic echo park, banjo fashion axe
          </p>
          <input
            className="bg-white rounded border border-gray-400 focus:outline-hidden focus:border-indigo-500 text-base px-4 py-2 mb-4"
            placeholder="Email"
            type="email"
          />
          <textarea
            className="bg-white rounded border border-gray-400 focus:outline-hidden h-32 focus:border-indigo-500 text-base px-4 py-2 mb-4 resize-none"
            placeholder="Message"
          ></textarea>
          <button className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-hidden hover:bg-indigo-600 rounded text-lg">
            Button
          </button>
          <p className="text-xs text-gray-500 mt-3">
            Chicharrones blog helvetica normcore iceland tousled brook viral artisan.
          </p>
        </div>
      </div> */}
        </section>
    );
};

export default Contact;
