import { motion } from "framer-motion";

export default function Home() {
  return (
    <motion.div className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}>
      <h1>Build a Strong Resume & LinkedIn Profile</h1>
      <p>Analyze. Improve. Get Hired.</p>
    </motion.div>
  );
}
