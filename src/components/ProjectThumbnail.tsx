import { useReducedMotion } from 'framer-motion';
import type { Project } from '../data/projects';
import styles from './ProjectThumbnail.module.css';

export function ProjectThumbnail({ project, eager = false }: { project: Project; eager?: boolean }) {
  const reducedMotion = useReducedMotion();
  if (project.animatedCover) return <video className={styles.capture} src={project.animatedCover} onLoadedMetadata={event => { event.currentTarget.defaultPlaybackRate = project.playbackRate ?? 1; event.currentTarget.playbackRate = project.playbackRate ?? 1; }} autoPlay={!reducedMotion} loop muted playsInline controls={!!reducedMotion} preload={eager ? 'auto' : 'metadata'} aria-label={project.name} />;
  if (project.thumbnail) return <img className={styles.capture} src={project.thumbnail} alt="" loading={eager ? 'eager' : 'lazy'} decoding="async" />;
  return <div className={styles.cover} aria-hidden="true"><span>{project.category}</span><strong>{project.name}</strong><span>Camila Gómez · UX/UI &amp; Design</span></div>;
}


