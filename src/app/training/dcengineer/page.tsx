import { CourseHub } from '@/components/training/CourseHub';
import { generateCourseMetadata } from '@/lib/utils/courseMetadata';

export const dynamic = 'force-dynamic';

export const metadata = generateCourseMetadata('dcengineer');

export default function Page() {
  return <CourseHub courseId="dcengineer" />;
}
