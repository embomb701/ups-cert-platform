'use client';

export function ExternalLinkWarning({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    const confirmed = window.confirm(
      'You are leaving Mastering Field Service and will be taken to an external website.\n\nContinue?'
    );
    if (confirmed) window.open(href, '_blank', 'noopener,noreferrer');
  }

  return (
    <a href={href} onClick={handleClick} className={className} rel="noopener noreferrer">
      {children}
    </a>
  );
}
