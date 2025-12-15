import React, { useRef, useState } from "react";
import { FaPaperPlane } from "react-icons/fa";
import contactBg from "../../assets/contactBg.jpg";
import { motion, useInView } from "framer-motion";
import { usePostContactMutation } from "../../store/api/appApi";

const Contact: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  // State for form fields
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  // RTK Query mutation hook
  const [postContact, { isLoading, isSuccess, isError, error }] =
    usePostContactMutation();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await postContact(formData).unwrap();
      // Optionally clear form or show success message
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (err) {
      console.error("Failed to post contact:", err);
    }
  };

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      id="contact"
      className="relative min-h-screen bg-cover bg-center flex items-center justify-end p-12"
      style={{ backgroundImage: `url(${contactBg})` }}
    >
      {/* Contact Form Container */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 100 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="relative z-10 bg-black/70 backdrop-blur-sm p-10 max-w-2xl w-full mr-20"
      >
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
          className="text-red-400 text-sm font-semibold uppercase mb-2 tracking-wide"
        >
          Contact Us
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
          className="text-4xl font-bold text-white mb-8 leading-tight"
        >
          Have questions? <br /> Get in touch!
        </motion.h2>

        <form className="grid grid-cols-2 gap-6" onSubmit={handleSubmit}>
          <motion.input
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="bg-transparent border-b border-gray-400 text-white pb-2 focus:outline-none focus:border-red-400 placeholder:text-gray-300"
          />
          <motion.input
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 1.0 }}
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="bg-transparent border-b border-gray-400 text-white pb-2 focus:outline-none focus:border-red-400 placeholder:text-gray-300"
          />
          <motion.input
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 1.2 }}
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="bg-transparent border-b border-gray-400 text-white pb-2 focus:outline-none focus:border-red-400 placeholder:text-gray-300"
          />
          <motion.input
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 1.4 }}
            type="tel"
            placeholder="Phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="bg-transparent border-b border-gray-400 text-white pb-2 focus:outline-none focus:border-red-400 placeholder:text-gray-300"
          />
          <motion.textarea
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 1.6 }}
            placeholder="Message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="col-span-2 bg-transparent border-b border-gray-400 text-white pb-2 focus:outline-none focus:border-red-400 placeholder:text-gray-300"
            rows={4}
          ></motion.textarea>

          {/* Centered Submit Button */}
          <div className="col-span-2 flex justify-center mt-6">
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.6, ease: "easeOut", delay: 1.8 }}
              type="submit"
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-4 px-4 flex items-center gap-2 transition-all duration-300 cursor-pointer"
              disabled={isLoading} // Disable button while loading
            >
              <FaPaperPlane className="w-5 h-5" />
              {isLoading ? "Sending..." : "Get In Touch"}
            </motion.button>
          </div>

          {/* Success/Error Messages */}
          {isSuccess && (
            <p className="col-span-2 text-center text-green-500 mt-4">
              Message sent successfully!
            </p>
          )}
          {isError && (
            <p className="col-span-2 text-center text-red-500 mt-4">
              Failed to send message: {(error as any)?.data?.message || "Unknown error"}
            </p>
          )}
        </form>
      </motion.div>
    </motion.section>
  );
};

export default Contact;