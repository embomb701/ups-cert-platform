// ============================================================
// Core shared types for UPS Certification Platform
// ============================================================

export type ExamLevel = 'jr_fse' | 'fse_ai' | 'fse';
export type UserRole = 'user' | 'admin' | 'proctor';
export type CertificateStatus = 'valid' | 'expired' | 'revoked' | 'under_review';
export type PurchaseStatus = 'pending' | 'complete' | 'refunded' | 'failed';
export type ExamAttemptStatus =
  | 'not_started'
  | 'rules_accepted'
  | 'in_progress'
  | 'completed'
  | 'abandoned'
  | 'timed_out'
  | 'invalidated';

export type ProctoredOrderStatus =
  | 'purchased'
  | 'scheduling_pending'
  | 'scheduled'
  | 'proctor_assigned'
  | 'ready'
  | 'in_progress'
  | 'completed'
  | 'passed'
  | 'failed'
  | 'certificate_issued';

export type SuspiciousRiskLevel = 'low' | 'medium' | 'high' | 'critical';

// ---------------------------------------------------------------
// Users
// ---------------------------------------------------------------
export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  createdAt: Date;
  accountCreationIpHash?: string;
  role: UserRole;
  blockedReason?: string;
  adminNotes?: string;
}

// ---------------------------------------------------------------
// Products
// ---------------------------------------------------------------
export interface Product {
  id: string;
  name: string;
  shortName: string;
  type: 'exam' | 'training_module' | 'package';
  price: number; // cents
  currency: string;
  requiresProctor: boolean;
  requiresScheduling: boolean;
  attemptCooldownDays: number;
  active: boolean;
  stripePriceId?: string;
  stripeProductId?: string;
}

export const PRODUCTS = {
  JR_FSE_EXAM: 'jr_fse_exam',
  FSE_AI_EXAM: 'fse_ai_exam',
  FSE_PROCTORED_EXAM: 'fse_proctored_exam',
  TRAINING_PORTAL: 'training_portal',
  JR_FSE_BUNDLE: 'jr_fse_bundle',
  FSE_AI_BUNDLE: 'fse_ai_bundle',
  FSE_HUMAN_BUNDLE: 'fse_human_bundle',
  EMPLOYER_5PACK: 'employer_5pack',
  EMPLOYER_10PACK: 'employer_10pack',
  SIGNED_BOOK: 'signed_book',
} as const;

export type ProductId = (typeof PRODUCTS)[keyof typeof PRODUCTS];

// ---------------------------------------------------------------
// Purchases
// ---------------------------------------------------------------
export interface Purchase {
  id: string;
  userId: string;
  productId: string;
  stripeCheckoutSessionId: string;
  stripePaymentIntentId?: string;
  amount: number; // cents
  currency: string;
  status: PurchaseStatus;
  createdAt: Date;
  purchaseIpHash?: string;
}

// ---------------------------------------------------------------
// Questions
// ---------------------------------------------------------------
export type QuestionDifficulty = 'easy' | 'medium' | 'hard' | 'expert';

export interface AnswerChoice {
  id: string; // 'A' | 'B' | 'C' | 'D'
  text: string;
}

export interface Question {
  id: string;
  examLevel: ExamLevel;
  category: string;
  subcategory: string;
  difficulty: QuestionDifficulty;
  questionText: string;
  choices: AnswerChoice[];
  correctAnswerId: string;
  explanation: string;
  referenceBookSection: string;
  safetyCritical: boolean;
  reviewRequired: boolean;
  active: boolean;
  estimatedTimeSeconds: number;
  tags: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

// Question without correct answer — safe to send to client during exam
export type QuestionForExam = Omit<Question, 'correctAnswerId' | 'explanation'>;

// ---------------------------------------------------------------
// Exam Attempts
// ---------------------------------------------------------------
export interface ExamAnswer {
  questionId: string;
  selectedChoiceId: string | null;
  answeredAt: Date;
  timeSpentSeconds: number;
}

export interface SuspiciousEvent {
  type:
    | 'tab_switch'
    | 'blur'
    | 'visibility_change'
    | 'fullscreen_exit'
    | 'copy_attempt'
    | 'paste_attempt'
    | 'cut_attempt'
    | 'right_click'
    | 'text_selection'
    | 'devtools_detected';
  count: number;
  lastOccurredAt: Date;
}

export interface ExamAttempt {
  id: string;
  userId: string;
  email: string;
  productId: string;
  examLevel: ExamLevel;
  status: ExamAttemptStatus;
  startedAt?: Date;
  completedAt?: Date;
  startIpHash?: string;
  completionIpHash?: string;
  selectedQuestionIds: string[];
  randomizedQuestionOrder: string[];
  randomizedChoiceOrder: Record<string, string[]>; // questionId -> shuffled choice ids
  answers: ExamAnswer[];
  score?: number; // 0-100
  passed?: boolean;
  passingScore: number; // default 80
  suspiciousEvents: SuspiciousEvent[];
  suspiciousEventsCount: number;
  suspiciousRiskLevel: SuspiciousRiskLevel;
  flaggedForReview: boolean;
  cooldownUntil?: Date;
  proctored: boolean;
  proctorId?: string;
  proctorName?: string;
  proctorNotes?: string;
  invalidatedByAdmin?: boolean;
  invalidationReason?: string;
  certificateId?: string;
}

// ---------------------------------------------------------------
// IP / Network Locks
// ---------------------------------------------------------------
export interface IpExamLock {
  id: string;
  ipHash: string;
  examLevel: ExamLevel;
  productId: string;
  userId: string;
  email: string;
  attemptId: string;
  createdAt: Date;
  cooldownUntil: Date;
  clearedByAdmin: boolean;
  adminNotes?: string;
}

// ---------------------------------------------------------------
// Certificates
// ---------------------------------------------------------------
export interface Certificate {
  id: string;
  certificateNumber: string;
  userId: string;
  candidateName: string;
  productId: string;
  examLevel: ExamLevel;
  certificationTitle: string;
  issuedAt: Date;
  score: number;
  status: CertificateStatus;
  publicVerificationSlug: string;
  pdfStoragePath?: string;
  publicScoreEnabled: boolean;
}

// Public-safe certificate data (no userId, no internal fields)
export interface PublicCertificate {
  certificateNumber: string;
  candidateName: string;
  certificationTitle: string;
  examLevel: ExamLevel;
  issuedAt: Date;
  status: CertificateStatus;
  score?: number; // only if publicScoreEnabled
  disclaimer: string;
}

// ---------------------------------------------------------------
// Audit Logs
// ---------------------------------------------------------------
export type AuditEventType =
  | 'exam_started'
  | 'exam_completed'
  | 'exam_abandoned'
  | 'suspicious_event'
  | 'certificate_generated'
  | 'certificate_revoked'
  | 'purchase_completed'
  | 'cooldown_enforced'
  | 'ip_lock_cleared'
  | 'admin_action'
  | 'proctor_unlock';

export interface AuditLog {
  id: string;
  userId?: string;
  attemptId?: string;
  eventType: AuditEventType;
  eventDetails: Record<string, unknown>;
  createdAt: Date;
  ipHash?: string;
  severity: 'info' | 'warning' | 'critical';
}

// ---------------------------------------------------------------
// Proctored Exam Orders (FSE only)
// ---------------------------------------------------------------
export interface ProctoredExamOrder {
  id: string;
  userId: string;
  email: string;
  purchaseId: string;
  productId: string;
  status: ProctoredOrderStatus;
  schedulingStatus: string;
  scheduledDate?: Date;
  proctorId?: string;
  proctorName?: string;
  meetingLink?: string;
  result?: 'passed' | 'failed' | 'invalidated';
  certificateId?: string;
  adminNotes?: string;
  createdAt: Date;
  updatedAt: Date;
}

// ---------------------------------------------------------------
// Training Modules (future)
// ---------------------------------------------------------------
export interface TrainingLesson {
  id: string;
  title: string;
  type: 'video' | 'text' | 'quiz';
  durationMinutes?: number;
}

export interface TrainingModule {
  id: string;
  title: string;
  description: string;
  status: 'coming_soon' | 'active' | 'archived';
  price: number; // cents, 0 = free
  lessons: TrainingLesson[];
  active: boolean;
}

// ---------------------------------------------------------------
// Client-side Exam Session State
// ---------------------------------------------------------------
export interface ExamSessionState {
  attemptId: string;
  examLevel: ExamLevel;
  questions: QuestionForExam[];
  currentIndex: number;
  answers: Record<string, string | null>; // questionId -> selectedChoiceId
  startedAt: Date;
  questionStartedAt: Date;
  timePerQuestion: number; // seconds
  totalQuestions: number;
  proctored: boolean;
  choiceOrder: Record<string, string[]>; // questionId -> randomized choice ids
}
