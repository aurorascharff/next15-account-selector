import { BookmarkCheck } from 'lucide-react';
import React from 'react';
import { getProjects } from '@/data/services/project';
import Skeleton from './ui/Skeleton';
import Tile from './ui/Tile';

export default async function FocusedProject() {
  const projects = await getProjects();
  const hasProjects = projects.length > 0;

  return hasProjects ? (
    <Tile icon={<BookmarkCheck width={30} height={30} />} heading={projects[0].name} href="#">
      <span className="text-xl font-semibold">{projects[0].progress}% complete</span>
    </Tile>
  ) : (
    <span className="text-lg">No projects</span>
  );
}

export function FocusedProjectSkeleton() {
  return <Skeleton className="p-6" />;
}
