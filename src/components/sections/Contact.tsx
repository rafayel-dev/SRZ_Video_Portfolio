import React, { useRef, useState, useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";
const contactBg = "/assets/contactBg.jpg";
import { motion } from "framer-motion";
import {
  usePostContactMutation,
  useGetFooterQuery,
} from "../../store/api/appApi";

const Contact: React.FC = () => {
  const ref = useRef(null);

  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const [postContact, { isLoading, isSuccess, isError, error }] =
    usePostContactMutation();

  const { data, isLoading: isContactLoading } = useGetFooterQuery();
  const contact = data?.data;

  // Reset success message after 4 seconds
  useEffect(() => {
    if (isSuccess) {
      setShowSuccessMessage(true);
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation (Optional but good practice)
    if (!formData.email || !formData.firstName) {
      alert("Please fill all required fields");
      return;
    }

    try {
      await postContact(formData).unwrap();

      // Clear form
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      console.error("Failed:", err);
    }
  };

  if (isContactLoading) {
    return <div>Loading...</div>;
  }

  if (!contact) {
    return <div>No contact data found</div>;
  }

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      id="contact"
      className="relative min-h-screen bg-cover bg-center flex items-center justify-center p-4 md:p-12 "
      style={{ backgroundImage: `url(${contactBg})` }}
    >
      <div className="bg-black/60 backdrop-blur-sm flex flex-col lg:flex-row gap-8 lg:gap-12 p-6 md:p-10 rounded-lg w-full max-w-5xl">
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-white w-full lg:w-1/2"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8">Our Office</h2>

          <div className="mb-6">
            <h3 className="text-red-400 text-lg font-semibold mb-2">
              Location
            </h3>
            <div
              className="text-gray-300"
              dangerouslySetInnerHTML={{ __html: contact.address.fullAddress }}
            />
          </div>

          <div className="mb-6">
            <h3 className="text-red-400 text-lg font-semibold mb-2">Contact</h3>

            {/* Phone */}
            <span>
              <a href={`tel:${contact.phone}`} className="text-gray-300 block">
                Phone:{" "}
                <span className="hover:text-gray-200 transition duration-300">
                  {contact.phone}
                </span>
              </a>
            </span>

            {/* Email */}
            <span>
              <a
                href={`mailto:${contact.email}`}
                className="text-gray-300 block"
              >
                Email:{" "}
                <span className="hover:text-gray-200 transition duration-300">
                  {contact.email}
                </span>
              </a>
            </span>
          </div>

          <div className="w-full h-64 md:h-80 rounded overflow-hidden">
            <iframe
              title="office-map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6141.159191655605!2d90.3658645694148!3d23.76323951408316!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755bf56264ad891%3A0xe6cc7f8568f9c9a6!2sSir%20Syed%20Rd%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1766220507696!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              className="border-0"
              loading="lazy"
            ></iframe>
          </div>
        </motion.div>

        {/* RIGHT SIDE (FORM) */}

        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="w-full lg:w-1/2"
        >
          {/* <p className="text-red-400 text-sm uppercase mb-2 font-semibold">
            Contact Us
          </p> */}
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-8 md:mb-14">
            Have questions? <br /> Get in touch!
          </h2>

          <form
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="firstName"
              placeholder="First Name *"
              value={formData.firstName}
              onChange={handleChange}
              className="bg-transparent border-b border-gray-400 text-white pb-2 focus:border-red-400 focus:outline-none"
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="bg-transparent border-b border-gray-400 text-white pb-2 focus:border-red-400 focus:outline-none"
            />

            <input
              type="email"
              name="email"
              placeholder="Email *"
              value={formData.email}
              onChange={handleChange}
              className="bg-transparent border-b border-gray-400 text-white pb-2 focus:border-red-400 focus:outline-none"
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="bg-transparent border-b border-gray-400 text-white pb-2 focus:border-red-400 focus:outline-none"
            />

            <textarea
              name="message"
              placeholder="Message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="md:col-span-2 bg-transparent border-b border-gray-400 text-white pb-2 focus:border-red-400 focus:outline-none"
            />

            {/* Submit Button */}
            <div className="md:col-span-2 flex justify-center mt-4">
              <button
                type="submit"
                disabled={isLoading}
                className="bg-red-500 hover:bg-red-600 transition duration-300 text-white rounded font-semibold py-3 px-4 flex items-center gap-2 cursor-pointer"
              >
                <FaPaperPlane size={20}/>
                {isLoading ? "Sending..." : "Submit"}
              </button>
            </div>

            {/* Success/Error */}
            {showSuccessMessage && (
              <p className="md:col-span-2 text-center text-green-400">
                Message sent successfully!
              </p>
            )}

            {isError && (
              <p className="md:col-span-2 text-center text-red-400">
                Failed: {(error as any)?.data?.message || "Unknown error"}
              </p>
            )}
          </form>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Contact;
