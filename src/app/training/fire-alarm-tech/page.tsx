import { CourseHub } from '@/components/training/CourseHub';
import { generateCourseMetadata } from '@/lib/utils/courseMetadata';

export const dynamic = 'force-dynamic';

export const metadata = generateCourseMetadata('fire-alarm-tech');

export default function Page() {
  return <CourseHub courseId="fire-alarm-tech" />;
}
