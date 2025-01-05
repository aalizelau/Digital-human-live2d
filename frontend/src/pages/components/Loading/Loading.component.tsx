"use client";

import { motion } from "framer-motion";

const Loading = () =>{
    return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="flex items-center justify-center p-4"
        >
          <div className="flex space-x-1">
            <motion.div
              className="w-3 h-3 bg-blue-500 rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse" }}
            />
            <motion.div
              className="w-3 h-3 bg-purple-500 rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse", delay: 0.2 }}
            />
            <motion.div
              className="w-3 h-3 bg-pink-500 rounded-full"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, repeatType: "reverse", delay: 0.4 }}
            />
          </div>
        </motion.div>
    )
}
export default Loading