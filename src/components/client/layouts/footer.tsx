import MapEmbed from "../map-embed"

function Footer() {
    return (
        <footer className="bg-black text-gray-400">
            <div
                className=" container py-8 mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                <div>
                    <h2 className="text-white text-lg font-semibold mb-4">About Us</h2>
                    <p className="text-white mb-4">
                        Music School is a premier institution dedicated to teaching the art
                        and science of music. We nurture talent from the ground up,
                        fostering a vibrant community of musicians.
                    </p>
                </div>
                <div>
                    <h2 className="text-white text-lg font-semibold mb-4">Quick Links</h2>
                    <ul>
                        <li>
                            <a
                                href="#"
                                className="text-white hover:text-white transition-colors duration-300"
                            >
                                Home
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="text-white hover:text-white transition-colors duration-300"
                            >
                                About
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="text-white hover:text-white transition-colors duration-300"
                            >
                                Courses
                            </a>
                        </li>
                        <li>
                            <a
                                href="#"
                                className="text-white hover:text-white transition-colors duration-300"
                            >
                                Contact
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h2 className="text-white text-lg font-semibold mb-4">Follow Us</h2>
                    <div className="flex space-x-4">
                        <a
                            href="#"
                            className="text-white hover:text-white transition-colors duration-300"
                        >
                            Facebook
                        </a>
                        <a
                            href="#"
                            className="text-white hover:text-white transition-colors duration-300"
                        >
                            Twitter
                        </a>
                        <a
                            href="#"
                            className="text-white hover:text-white transition-colors duration-300"
                        >
                            Instagram
                        </a>
                    </div>
                </div>
                <div>
                    <h2 className="text-white text-lg font-semibold mb-4">Contact Us</h2>
                    <p className="text-white">New Delhi, India</p>
                    <p className="text-white">Delhi 10001</p>
                    <p className="text-white">Email: info@musicschool.com</p>
                    <p className="text-white">Phone: (123) 456-7890</p>
                </div>
            </div>
            
            <p className="text-white text-center text-xs pt-8">
                © 2024 Music School. All rights reserved.
            </p>
        </footer>
    )
}

export default Footer