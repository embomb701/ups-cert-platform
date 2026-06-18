'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';

interface Props {
  attemptId: string;
  children: React.ReactNode;
}

type ProctorStatus = 'requesting' | 'loading' | 'active' | 'camera_denied' | 'error';

interface Violation {
  type: string;
  label: string;
  at: Date;
}

const MODEL_URL = 'https://cdn.jsdelivr.net/gh/justadudewhohacks/face-api.js/weights';

export function AIProctorWrapper({ attemptId, children }: Props) {
  const { user } = useAuth();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const noFaceCountRef = useRef(0);
  const faceapiRef = useRef<any>(null);

  const [status, setStatus] = useState<ProctorStatus>('requesting');
  const [violations, setViolations] = useState<Violation[]>([]);
  const [faceCount, setFaceCount] = useState<number | null>(null);

  const logViolation = useCallback(async (type: string, label: string) => {
    const v: Violation = { type, label, at: new Date() };
    setViolations((prev) => [...prev.slice(-9), v]);

    try {
      const token = user ? await (await import('@/lib/firebase/auth')).getIdToken() : null;
      await fetch('/api/exam/event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          attemptId,
          events: [{ type: `ai_${type}`, count: 1, lastOccurredAt: new Date().toISOString() }],
        }),
      });
    } catch {
      // non-blocking — best effort
    }
  }, [attemptId, user]);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      // Request camera
      let stream: MediaStream;
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'user', width: 320, height: 240 },
        });
      } catch {
        setStatus('camera_denied');
        return;
      }

      if (cancelled) { stream.getTracks().forEach((t) => t.stop()); return; }
      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play().catch(() => {});
      }

      // Load face-api.js dynamically
      setStatus('loading');
      try {
        const faceapi = await import('face-api.js');
        faceapiRef.current = faceapi;
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
          faceapi.nets.faceLandmark68TinyNet.loadFromUri(MODEL_URL),
        ]);
      } catch {
        setStatus('error');
        return;
      }

      if (cancelled) return;
      setStatus('active');

      // Detection loop — every 2.5 seconds
      intervalRef.current = setInterval(async () => {
        const faceapi = faceapiRef.current;
        const video = videoRef.current;
        if (!faceapi || !video || video.readyState < 2) return;

        try {
          const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions({ scoreThreshold: 0.4 }))
            .withFaceLandmarks(true);

          const count = detections.length;
          setFaceCount(count);

          if (count === 0) {
            noFaceCountRef.current += 1;
            if (noFaceCountRef.current === 2) {
              logViolation('no_face', 'No face detected');
            }
          } else {
            noFaceCountRef.current = 0;
          }

          if (count > 1) {
            logViolation('multiple_faces', `${count} faces detected`);
          }

          if (count === 1 && detections[0].landmarks) {
            const landmarks = detections[0].landmarks;
            const leftEye = landmarks.getLeftEye();
            const rightEye = landmarks.getRightEye();
            const nose = landmarks.getNose();

            // Rough gaze check: if eyes are far off-center relative to nose
            const eyeCenterX = (leftEye[0].x + rightEye[3].x) / 2;
            const noseX = nose[3].x;
            const offset = Math.abs(eyeCenterX - noseX);
            const faceWidth = detections[0].detection.box.width;

            if (offset / faceWidth > 0.35) {
              logViolation('looking_away', 'Looking away from screen');
            }
          }
        } catch {
          // detection failure is non-fatal
        }
      }, 2500);
    }

    init();

    return () => {
      cancelled = true;
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
    };
  }, [logViolation]);

  const statusColor =
    status === 'active' && faceCount === 1
      ? 'bg-green-500'
      : status === 'active' && faceCount === 0
      ? 'bg-red-500'
      : status === 'active'
      ? 'bg-yellow-500'
      : status === 'loading'
      ? 'bg-yellow-500'
      : 'bg-gray-500';

  const statusLabel =
    status === 'requesting' ? 'Requesting camera…'
    : status === 'loading' ? 'Loading AI models…'
    : status === 'active' && faceCount === null ? 'Monitoring…'
    : status === 'active' && faceCount === 0 ? 'No face detected!'
    : status === 'active' && (faceCount ?? 0) > 1 ? 'Multiple faces!'
    : status === 'active' ? 'AI Monitoring Active'
    : status === 'camera_denied' ? 'Camera required'
    : 'Proctor error';

  if (status === 'camera_denied') {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="card-dark p-8 max-w-sm text-center">
          <p className="text-red-400 font-semibold mb-3">Camera Access Required</p>
          <p className="text-sm text-gray-400">
            The AI Proctored exam requires webcam access. Please allow camera access and refresh the page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* AI Proctor HUD — top-right corner */}
      <div className="fixed top-4 right-4 z-50 flex flex-col items-end gap-2">
        <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden shadow-xl w-44">
          {/* Webcam preview */}
          <video
            ref={videoRef}
            muted
            playsInline
            className="w-full h-32 object-cover bg-gray-800"
          />
          {/* Status bar */}
          <div className="px-3 py-2 flex items-center gap-2">
            <span className={`w-2 h-2 rounded-full shrink-0 ${statusColor} animate-pulse`} />
            <span className="text-xs text-gray-300 truncate">{statusLabel}</span>
          </div>
        </div>

        {/* Recent violations */}
        {violations.length > 0 && (
          <div className="bg-red-950/80 border border-red-800 rounded-lg px-3 py-2 w-44">
            <p className="text-xs font-semibold text-red-400 mb-1">Violations ({violations.length})</p>
            <p className="text-xs text-red-300 truncate">{violations[violations.length - 1].label}</p>
          </div>
        )}
      </div>

      {/* Exam content */}
      {children}
    </div>
  );
}
