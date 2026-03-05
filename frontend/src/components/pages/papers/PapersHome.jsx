// import { useEffect, useState } from "react";
// import api from "../../../services/api";
// import { Link } from "react-router-dom";

// const PapersHome = () => {
//   const [papers, setPapers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const fetchPapers = async (page = 1) => {
//     try {
//       setLoading(true);
//       const res = await api.get(
//         `/api/paper/getAllPaper?page=${page}&limit=6`
//       );

//       setPapers(res.data.papers);
//       setCurrentPage(res.data.page);
//       setTotalPages(res.data.totalPages);
//     } catch (error) {
//       console.log("Error fetching papers", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchPapers(currentPage);
//   }, [currentPage]);

//   const handlePageChange = (page) => {
//     if (page !== currentPage) {
//       setCurrentPage(page);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };

//   if (loading) {
//     return (
//       <div className="text-center mt-20">
//         <span className="loading loading-spinner loading-lg"></span>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-base-200 p-8">
//       <h1 className="text-3xl font-bold mb-8 text-center">
//         Previous Year Questions
//       </h1>

//       {/* Papers Grid */}
//       <div className="grid md:grid-cols-3 gap-6">
//         {papers.map((paper) => (
//           <div
//             key={paper._id}
//             className="card bg-base-100 shadow-lg p-6 hover:shadow-xl transition"
//           >
//             <h2 className="text-xl font-semibold">{paper.title}</h2>
//             <p className="opacity-70">{paper.subject}</p>
//             <p className="mt-2">Year: {paper.year}</p>

//             <Link
//               to={`/pyqs/${paper._id}`}
//               className="btn btn-primary mt-4"
//             >
//               View Details
//             </Link>
//           </div>
//         ))}
//       </div>

//       {/* Pagination */}
//       {totalPages > 1 && (
//         <div className="flex justify-center mt-10">
//           <div className="join">
//             {[...Array(totalPages)].map((_, index) => {
//               const pageNumber = index + 1;
//               return (
//                 <button
//                   key={pageNumber}
//                   onClick={() => handlePageChange(pageNumber)}
//                   className={`join-item btn ${
//                     currentPage === pageNumber
//                       ? "btn-primary"
//                       : "btn-outline"
//                   }`}
//                 >
//                   {pageNumber}
//                 </button>
//               );
//             })}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PapersHome;

import { useEffect, useState } from "react";
import api from "../../../services/api";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

/* ── Floating blob (same as rest of app) ── */
const Blob = ({
  className,
  duration = 9,
  xRange = 60,
  yRange = 40,
  delay = 0,
}) => (
  <motion.div
    className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
    animate={{
      x: [0, xRange, xRange / 2, -xRange / 2, 0],
      y: [0, -yRange, yRange, -yRange / 2, 0],
      scale: [1, 1.1, 0.95, 1.05, 1],
    }}
    transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
  />
);

const CARD_ACCENTS = [
  "from-violet-500/20 to-indigo-500/10 border-violet-500/30",
  "from-sky-500/20 to-cyan-500/10 border-sky-500/30",
  "from-emerald-500/20 to-teal-500/10 border-emerald-500/30",
  "from-amber-500/20 to-orange-400/10 border-amber-500/30",
  "from-rose-500/20 to-pink-500/10 border-rose-500/30",
  "from-fuchsia-500/20 to-purple-500/10 border-fuchsia-500/30",
];

const Skeleton = () => (
  <div className="rounded-2xl border border-base-300 p-6 animate-pulse bg-base-100/60">
    <div className="h-5 bg-base-300 rounded w-3/4 mb-3" />
    <div className="h-3 bg-base-300 rounded w-1/2 mb-2" />
    <div className="h-3 bg-base-300 rounded w-1/3 mb-6" />
    <div className="h-9 bg-base-300 rounded-xl w-full" />
  </div>
);

const PapersHome = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPapers = async (page = 1) => {
    try {
      setLoading(true);
      const res = await api.get(`/api/paper/getAllPaper?page=${page}&limit=6`);
      setPapers(res.data.papers);
      setCurrentPage(res.data.page);
      setTotalPages(res.data.totalPages);
    } catch (error) {
      console.log("Error fetching papers", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPapers(currentPage);
  }, [currentPage]);

  const handlePageChange = (page) => {
    if (page !== currentPage) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-base-200 to-base-300 relative overflow-hidden p-8">
      {/* ── Blobs ── */}
      <Blob
        className="w-[420px] h-[420px] bg-primary/15 -top-24 -left-24"
        duration={11}
        xRange={60}
        yRange={50}
        delay={0}
      />
      <Blob
        className="w-[320px] h-[320px] bg-secondary/15 bottom-10 right-0"
        duration={9}
        xRange={-50}
        yRange={-40}
        delay={2}
      />
      <Blob
        className="w-[240px] h-[240px] bg-accent/10 top-1/2 right-1/4"
        duration={13}
        xRange={40}
        yRange={60}
        delay={3.5}
      />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4 border border-primary/20">
            📄 Study Resources
          </span>
          <h1 className="text-4xl font-bold tracking-tight">
            Previous Year Questions
          </h1>
          <p className="text-sm opacity-50 mt-2">
            Browse and download available PYQs
          </p>
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className="grid md:grid-cols-3 gap-6">
            {Array(6)
              .fill(0)
              .map((_, i) => (
                <Skeleton key={i} />
              ))}
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            <div className="grid md:grid-cols-3 gap-6">
              {papers.map((paper, idx) => {
                const accent = CARD_ACCENTS[idx % CARD_ACCENTS.length];
                return (
                  <motion.div
                    key={paper._id}
                    layout
                    initial={{ opacity: 0, y: 20, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.92 }}
                    transition={{ delay: idx * 0.05, duration: 0.35 }}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
                    }}
                    className={`bg-gradient-to-br ${accent} border rounded-2xl p-6 relative overflow-hidden`}
                  >
                    {/* micro blob */}
                    <Blob
                      className="w-20 h-20 bg-white/10 -bottom-3 -right-3"
                      duration={6 + (idx % 3)}
                      xRange={8}
                      yRange={8}
                      delay={idx * 0.4}
                    />

                    <h2 className="text-lg font-semibold leading-snug">
                      {paper.title}
                    </h2>
                    <p className="text-sm opacity-60 mt-1">{paper.subject}</p>
                    <p className="text-xs opacity-40 mt-1 font-mono">
                      Year: {paper.year}
                    </p>

                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="mt-5"
                    >
                      <Link
                        to={`/pyqs/${paper._id}`}
                        className="btn btn-primary w-full rounded-xl btn-sm"
                      >
                        View Details →
                      </Link>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </AnimatePresence>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center mt-12 gap-2"
          >
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              return (
                <motion.button
                  key={page}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.93 }}
                  onClick={() => handlePageChange(page)}
                  className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all
                    ${
                      currentPage === page
                        ? "bg-primary text-primary-content shadow-lg shadow-primary/30"
                        : "bg-base-100/70 border border-base-300 hover:border-primary/50"
                    }`}
                >
                  {page}
                </motion.button>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PapersHome;
