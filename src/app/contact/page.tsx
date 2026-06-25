'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (data.ok) {
        setDone(true);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Request failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="section-pad">
      <div className="container-site max-w-xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-2">Contact Us</h1>
        <p className="text-gray-400 text-sm mb-8">
          Have a question about the program, exams, or certifications? Send us a message and we'll get back to you.
        </p>

        {done ? (
          <div className="card-dark p-8 text-center">
            <div className="w-12 h-12 rounded-full bg-green-900/40 border border-green-700 flex items-center justify-center mx-auto mb-4">
              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-lg font-semibold text-white mb-2">Message Sent</h2>
            <p className="text-sm text-gray-400">
              Thanks for reaching out. We'll get back to you as soon as possible.
            </p>
          </div>
        ) : (
          <div className="card-dark p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Your full name"
                  className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-400 mb-1">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                  placeholder="How can we help?"
                  className="w-full px-3 py-2 rounded-lg bg-gray-900 border border-gray-700 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-indigo-500 resize-none"
                />
              </div>

              {error && <p className="text-sm text-red-400">{error}</p>}

              <button
                type="submit"
                disabled={submitting}
                className="w-full px-4 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium text-sm transition-colors"
              >
                {submitting ? 'Sending…' : 'Send Message'}
              </button>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
