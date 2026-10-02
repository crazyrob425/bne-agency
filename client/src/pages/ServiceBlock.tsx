import { motion } from "framer-motion";
import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { Link } from "wouter";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.5, ease: "easeOut" as const }
  })
};

export function ServiceBlock({
  icon: Icon,
  title,
  description,
  features,
  iconBg = "bg-violet-500/10 border-violet-500/20",
  iconText = "text-violet-400",
  checkText = "text-violet-400",
  border = "border-violet-500/20",
  link,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  features: string[];
  iconBg?: string;
  iconText?: string;
  checkText?: string;
  border?: string;
  link?: string;
}) {
  const content = (
    <>
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${iconBg}`}>
        <Icon className={`h-6 w-6 ${iconText}`} />
      </div>
      <h3 className="text-xl font-bold text-zinc-100 mb-3" style={{ fontFamily: 'Space Grotesk' }}>{title}</h3>
      <p className="text-zinc-400 text-sm leading-relaxed mb-4" style={{ fontFamily: 'DM Sans' }}>{description}</p>
      <ul className="space-y-2 mb-4 flex-grow">
        {features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-zinc-300">
            <CheckCircle className={`h-4 w-4 mt-0.5 shrink-0 ${checkText}`} />
            <span style={{ fontFamily: 'DM Sans' }}>{f}</span>
          </li>
        ))}
      </ul>
      {link && (
        <div className="mt-4 pt-3 border-t border-white/5 flex items-center gap-1.5 text-xs font-semibold text-amber-400 group-hover:text-amber-300 transition-colors uppercase tracking-widest mono-stat">
          Explore Service Details <span className="transform translate-x-0 group-hover:translate-x-1 transition-transform duration-200">→</span>
        </div>
      )}
    </>
  );

  if (link) {
    return (
      <Link href={link}>
        <motion.div
          variants={fadeUp}
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className={`glass-card p-6 border transition-all duration-300 hover:-translate-y-1 cursor-pointer group flex flex-col h-full ${border}`}
        >
          {content}
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.div
      variants={fadeUp}
      custom={0}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-40px" }}
      className={`glass-card p-6 border transition-all duration-300 hover:-translate-y-1 flex flex-col h-full ${border}`}
    >
      {content}
    </motion.div>
  );
}
