import { AnimatedSection } from '@/components/common/AnimatedSection'

interface ProjectCardProps {
  title: string
  description: string
  className?: string
}

export const ProjectCard = ({ title, description, className = '' }: ProjectCardProps) => {
  return (
    <AnimatedSection className={`bg-white/10 backdrop-blur-[19px] rounded-3xl p-8 ${className}`}>
      <h3 className="text-xl font-bold text-white tracking-[-1px] mb-4">
        {title}
      </h3>
      <p className="text-white/80 tracking-[-1px] leading-tight">
        {description}
      </p>
    </AnimatedSection>
  )
} 