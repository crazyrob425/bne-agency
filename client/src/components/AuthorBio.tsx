/**
 * AuthorBio — Blacklisted University Professor Bio Component
 * Used in blog articles, guides, university courses, and anywhere author attribution is needed.
 */
import { motion } from "framer-motion";
import { BookOpen, ExternalLink } from "lucide-react";
import { type Professor } from "@/data/professors";

interface AuthorBioProps {
  professor: Professor;
  variant?: "full" | "inline" | "compact";
  showCourses?: boolean;
}

export default function AuthorBio({ professor, variant = "inline", showCourses = false }: AuthorBioProps) {
  if (variant === "compact") {
    return (
      <div className="flex items-center gap-3">
        <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${professor.avatarColor} flex items-center justify-center text-white text-xs font-black shrink-0`}>
          {professor.avatar}
        </div>
        <div>
          <p className="text-slate-200 text-sm font-semibold leading-tight">{professor.name}</p>
          <p className="text-slate-500 text-xs">{professor.shortTitle} · Blacklisted University</p>
        </div>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${professor.avatarColor} flex items-center justify-center text-white text-sm font-black shrink-0`}>
          {professor.avatar}
        </div>
        <div className="min-w-0">
          <p className="text-slate-100 font-semibold text-sm">{professor.name}</p>
          <p className="text-amber-400/80 text-xs mb-2">{professor.title}</p>
          <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">{professor.shortBio}</p>
          <div className="flex flex-wrap gap-1.5 mt-2">
            {professor.expertise.slice(0, 3).map(ex => (
              <span key={ex} className="text-[10px] text-slate-500 border border-slate-700 rounded-full px-2 py-0.5">{ex}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // variant === "full"
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="p-6 md:p-8 rounded-2xl bg-slate-900/70 border border-slate-800"
    >
      <div className="flex flex-col sm:flex-row gap-5 items-start">
        {/* Avatar */}
        <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${professor.avatarColor} flex items-center justify-center text-white text-2xl font-black shrink-0`}>
          {professor.avatar}
        </div>

        <div className="flex-1 min-w-0">
          {/* Name + institution */}
          <div className="flex items-start justify-between gap-3 flex-wrap mb-1">
            <div>
              <h3 className="text-white font-bold text-xl leading-tight">{professor.name}</h3>
              <p className="text-amber-400 text-sm font-medium">{professor.title}</p>
              <p className="text-slate-500 text-xs mt-0.5 flex items-center gap-1">
                <BookOpen className="h-3 w-3" />
                Blacklisted University · {professor.department}
              </p>
            </div>
          </div>

          {/* Expertise tags */}
          <div className="flex flex-wrap gap-1.5 mt-3 mb-4">
            {professor.expertise.map(ex => (
              <span key={ex} className="text-[11px] text-slate-400 border border-slate-700 bg-slate-800/50 rounded-full px-2.5 py-0.5">
                {ex}
              </span>
            ))}
          </div>

          {/* Bio */}
          <p className="text-slate-300 text-sm leading-relaxed">{professor.bio}</p>

          {/* Courses */}
          {showCourses && professor.courses.length > 0 && (
            <div className="mt-5 pt-4 border-t border-slate-800">
              <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Courses at Blacklisted University</p>
              <div className="space-y-1.5">
                {professor.courses.map(course => (
                  <div key={course} className="flex items-center gap-2">
                    <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${professor.avatarColor}`} />
                    <span className="text-slate-300 text-sm">{course}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
