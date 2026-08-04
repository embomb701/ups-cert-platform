'use client';

interface Props {
  name: string;
  courseTitle: string;
  issuedDate: string;
}

export function CertificateActions({ name, courseTitle, issuedDate }: Props) {
  function handlePrint() {
    window.print();
  }

  const liText = encodeURIComponent(
    `I just earned my ${courseTitle} certificate from Mastering Field Service Training Portal. ${issuedDate}.`
  );
  const liUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent('https://masteringfieldservice.com/training/critical-environment')}`;

  return (
    <div className="flex flex-wrap gap-3 justify-center print:hidden">
      <button
        onClick={handlePrint}
        className="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold rounded-lg text-sm transition-colors"
      >
        Print / Save as PDF
      </button>
      <a
        href={liUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="px-5 py-2.5 bg-[#0A66C2] hover:bg-[#0958a8] text-white font-semibold rounded-lg text-sm transition-colors"
      >
        Share on LinkedIn
      </a>
    </div>
  );
}
