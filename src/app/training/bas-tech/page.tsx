import { CourseHub } from '@/components/training/CourseHub';
import { generateCourseMetadata } from '@/lib/utils/courseMetadata';

export const dynamic = 'force-dynamic';

export const metadata = generateCourseMetadata('bas-tech');

export default function Page() {
  return <CourseHub courseId="bas-tech" />;
}
