'use client';

export default function VerifyForm() {
  return (
    <form
      action=""
      method="get"
      onSubmit={(e) => {
        e.preventDefault();
        const val = (document.getElementById('cert-number') as HTMLInputElement)?.value?.trim();
        if (val) window.location.href = `/verify/${encodeURIComponent(val)}`;
      }}
    >
      <label htmlFor="cert-number" className="block text-xs uppercase tracking-wider text-gray-400 mb-2">
        Certificate Number
      </label>
      <input
        id="cert-number"
        type="text"
        placeholder="e.g. JR-2025-A1B2C3"
        className="w-full px-4 py-3 rounded-xl bg-carbon-950/60 border border-white/10 text-white placeholder-gray-600 focus:outline-none focus:border-voltage-500 focus:ring-1 focus:ring-voltage-500/40 mb-5 font-mono tracking-wider transition-colors"
      />
      <button type="submit" className="btn-voltage w-full">
        Verify Certificate
      </button>
    </form>
  );
}
