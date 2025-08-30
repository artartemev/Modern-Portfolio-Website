import { motion } from 'motion/react';

export function LoadingState() {
  return (
    <motion.div
      className="text-center py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <div className="absolute -inset-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10" />
        <div className="relative p-8">
          <div className="animate-spin w-8 h-8 border-2 border-[#323232] border-t-transparent rounded-full mx-auto mb-4" />
          <h3 className="font-['Anonymous_Pro'] text-2xl text-[#323232] uppercase tracking-wider mb-4">
            Loading Projects
          </h3>
          <p className="font-['Anonymous_Pro'] text-[#323232] opacity-60 uppercase">
            Please wait while we fetch your portfolio
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function ErrorState({ error, onRetry }: { error: string; onRetry?: () => void }) {
  return (
    <motion.div
      className="text-center py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <div className="absolute -inset-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10" />
        <div className="relative p-8">
          <h3 className="font-['Anonymous_Pro'] text-2xl text-[#323232] uppercase tracking-wider mb-4">
            Error Loading Projects
          </h3>
          <p className="font-['Anonymous_Pro'] text-[#323232] opacity-60 uppercase mb-6">
            {error}
          </p>
          {onRetry && (
            <button
              onClick={onRetry}
              className="px-6 py-3 bg-[#323232] text-white font-['Anonymous_Pro'] uppercase tracking-wider rounded-lg hover:bg-[#454545] transition-colors"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function EmptyState() {
  return (
    <motion.div
      className="text-center py-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative">
        <div className="absolute -inset-8 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10" />
        <div className="relative p-8">
          <h3 className="font-['Anonymous_Pro'] text-2xl text-[#323232] uppercase tracking-wider mb-4">
            No Projects Found
          </h3>
          <p className="font-['Anonymous_Pro'] text-[#323232] opacity-60 uppercase">
            Try adjusting your filters to see more projects
          </p>
        </div>
      </div>
    </motion.div>
  );
}