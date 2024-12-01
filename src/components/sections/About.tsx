"use client";

import { motion } from 'framer-motion';
import Image from 'next/image';

const About = () => {
  return (
    <section id="about" className="py-20 relative z-10">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
            About Me
          </h2>
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-4 order-2 md:order-1">
              <p className="text-gray-300">
                I'm a Computer Science student at CMR College of Engineering & Technology,
                passionate about creating innovative solutions through code. My journey in
                tech has been marked by continuous learning and practical application.
              </p>
              <p className="text-gray-300">
                With expertise in full-stack development and a keen interest in emerging
                technologies, I've worked on various projects that solve real-world problems.
              </p>
              <div className="pt-4">
              <h3 className="text-xl md:text-2xl font-semibold mb-6 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text">
                  Technical Skills
                </h3>

                <div className="flex flex-wrap gap-2">
                  {['Python', 'Java', 'JavaScript', 'React', 'Node.js', 'SQL', 'Docker'].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-purple-600/20 rounded-full text-purple-400 text-sm hover:bg-purple-600/30 transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="relative order-1 md:order-2 mx-auto md:mx-0">
              <div className="aspect-square rounded-full overflow-hidden relative max-w-[280px] md:max-w-[400px]">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 opacity-50 animate-pulse" />
                {/* Add your profile image here */}
                <div className="relative z-10 p-1">
                  <div className="bg-black rounded-full overflow-hidden">
                    <Image
                      src="/profile.jpg"
                      alt="Bhargav"
                      width={400}
                      height={400}
                      className="rounded-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
