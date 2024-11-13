"use client";

import { motion } from "framer-motion";

import Link from "next/link";

import { fadeInUp } from "@/utils/motionVariants.utils";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-6">
      <motion.h1
        className="mb-6 text-center text-4xl font-bold text-blue-700"
        variants={fadeInUp}
        initial="hidden"
        animate="visible">
        About Codie-Buddy
      </motion.h1>

      <motion.p
        className="mb-4 text-center text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}>
        Welcome to Codie-Buddy, your ultimate coding companion! We are dedicated
        to making programming fun, collaborative, and accessible for everyone.
      </motion.p>

      <motion.p
        className="mb-4 text-center text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}>
        At Codie-Buddy, we believe in real-time collaboration, allowing
        developers to work together seamlessly and enhance their coding skills
        through shared learning experiences.
      </motion.p>

      <motion.p
        className="text-center text-lg"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}>
        Join us as we create a vibrant community of coders, providing tools for
        effective learning, friendly competition, and a place to grow together!
      </motion.p>

      <motion.div className="mt-8 flex space-x-4">
        <Link href="/learn-more" passHref>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="rounded-lg bg-blue-700 px-6 py-3 font-semibold text-white shadow-lg hover:bg-blue-600"
            whileHover={{ scale: 1.1 }}>
            Learn More
          </motion.div>
        </Link>

        <Link href="/contact-us" passHref>
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
            className="rounded-lg bg-gray-700 px-6 py-3 font-semibold text-white shadow-lg hover:bg-gray-600"
            whileHover={{ scale: 1.1 }}>
            Contact Us
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
}
