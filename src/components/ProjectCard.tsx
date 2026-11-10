import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { Project } from '../data/projects';
import { useLanguage } from '../i18n/LanguageContext';

type ProjectCardProps = {
  project: Project;
  index: number;
};

type FrameClassMap = Record<Project['frame'], string>;

const frameClassMap: FrameClassMap = {
  rect: 'rounded-[2rem] border border-[rgba(69,16,29,0.14)] before:rounded-[2rem]',
  arch: 'rounded-[2.5rem_2.5rem_1.4rem_1.4rem] border border-[rgba(69,16,29,0.14)] before:rounded-[2.5rem_2.5rem_1.4rem_1.4rem]',
  oval: 'rounded-[50%_50%_46%_54%/56%_56%_44%_44%] border border-[rgba(69,16,29,0.14)] before:rounded-[50%_50%_46%_54%/56%_56%_44%_44%]',
  organic: 'rounded-[40%_60%_58%_42%/48%_36%_64%_52%] border border-[rgba(69,16,29,0.14)] before:rounded-[40%_60%_58%_42%/48%_36%_64%_52%]',
};

export function ProjectCard({ project, index }: ProjectCardProps) {
  const { copy } = useLanguage();
  const cardDelay = index * 0.12;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: 'easeOut', delay: cardDelay }}
      whileHover={{ y: -12, rotate: 0.1 }}
      className="project-card"
    >
      <Link to={`/projects/${project.id}`} className="project-link" data-cursor-label="VIEW" aria-label={`View project: ${project.name}`}>
        <div className={`project-media ${frameClassMap[project.frame]}`}>
          <div className="project-frame" aria-hidden="true" />
          <img
            src={project.image}
            alt={project.name}
            loading="lazy"
            onError={(event) => {
              const target = event.currentTarget;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.classList.add('is-placeholder');
              }
            }}
          />
        </div>
        <div className="project-meta">
          <div className="project-meta-top">
            <p className="project-category">{project.category}</p>
            <span className="project-year">{project.year}</span>
          </div>
          <div className="project-title-row">
            <h3>{project.name}</h3>
            <span className="project-arrow" aria-hidden="true">
              <ArrowUpRight size={18} />
            </span>
          </div>
          <p className="project-description">{project.description}</p>
          <div className="project-role-wrap">
            <span className="project-role-label">{copy.role}</span>
            <span className="project-role">{project.role}</span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
