"use client";
import { motion } from "framer-motion";
import Link from "next/link";
export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800/70 p-6">
      <motion.h1
        className="text-4xl font-bold text-center text-blue-700 mb-6"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}>
        About Us
      </motion.h1>

      <motion.p
        className="text-lg text-gray-700 dark:text-gray-300 text-center max-w-2xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}>
        We are a team of dedicated professionals driven by innovation and
        committed to delivering high-quality software solutions. With expertise
        in various technologies, we focus on creating seamless and impactful
        experiences for our clients.
      </motion.p>

      <motion.div
        className="mt-8 flex space-x-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}>
        <Link href="/" passHref>
          <motion.a
            className="bg-blue-700 text-white px-6 py-3 rounded-lg shadow-lg font-semibold hover:bg-blue-600"
            whileHover={{ scale: 1.1 }}>
            Learn More
          </motion.a>
        </Link>

        <Link href="/contact-us" passHref>
          <motion.a
            className="bg-gray-700 text-white px-6 py-3 rounded-lg shadow-lg font-semibold hover:bg-gray-600"
            whileHover={{ scale: 1.1 }}>
            Contact Us
          </motion.a>
        </Link>
      </motion.div>
    </div>
  );
}
