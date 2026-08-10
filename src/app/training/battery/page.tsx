import { OutlinePortal } from '@/components/training/OutlinePortal';
import { generateCourseMetadata } from '@/lib/utils/courseMetadata';

export const dynamic = 'force-dynamic';

export const metadata = generateCourseMetadata('battery');

export default function Page() {
  return <OutlinePortal courseId="battery" />;
}
