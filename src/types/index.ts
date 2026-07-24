// ============================================================
// Core shared types for UPS Certification Platform
// ============================================================

export type ExamLevel = 'jr_fse' | 'fse' | 'jr_kitchen_fse' | 'jr_hvac_fse' | 'jr_gen_fse' | 'jr_dc_cft' | 'jr_solar_fse' | 'jr_ev_tech' | 'jr_dcp_tech' | 'jr_battery_tech' | 'jr_dc_engineer' | 'jr_marine_tech' | 'jr_pool_tech';
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
  TRAINING_COURSE: 'training_course',
  PRACTICE_TEST: 'practice_test',
  JR_FSE_TEST_HUMAN: 'jr_fse_test_human',
  FSE_PROCTORED_EXAM: 'fse_proctored_exam',
  PKG_TRAINING_JR_HUMAN: 'pkg_training_jr_human',
  PKG_TRAINING_FSE: 'pkg_training_fse',
  EMPLOYER_5PACK: 'employer_5pack',
  EMPLOYER_10PACK: 'employer_10pack',
  SIGNED_BOOK: 'signed_book',
  TRAINING_KITCHEN: 'training_kitchen',
  JR_KITCHEN_FSE_TEST_HUMAN: 'jr_kitchen_fse_test_human',
  PKG_TRAINING_KITCHEN_TESTOUT: 'pkg_training_kitchen_testout',
  TRAINING_HVAC: 'training_hvac',
  JR_HVAC_FSE_TEST_HUMAN: 'jr_hvac_fse_test_human',
  PKG_TRAINING_HVAC_TESTOUT: 'pkg_training_hvac_testout',
  TRAINING_GENERATOR: 'training_generator',
  JR_GEN_FSE_TEST_HUMAN: 'jr_gen_fse_test_human',
  PKG_TRAINING_GENERATOR_TESTOUT: 'pkg_training_generator_testout',
  TRAINING_DATACENTER: 'training_datacenter',
  JR_DC_CFT_TEST_HUMAN: 'jr_dc_cft_test_human',
  PKG_TRAINING_DATACENTER_TESTOUT: 'pkg_training_datacenter_testout',
  TRAINING_SOLAR: 'training_solar',
  JR_SOLAR_FSE_TEST_HUMAN: 'jr_solar_fse_test_human',
  PKG_TRAINING_SOLAR_TESTOUT: 'pkg_training_solar_testout',
  TRAINING_EVCHARGING: 'training_evcharging',
  JR_EV_TECH_TEST_HUMAN: 'jr_ev_tech_test_human',
  PKG_TRAINING_EVCHARGING_TESTOUT: 'pkg_training_evcharging_testout',
  TRAINING_DCPLANTS: 'training_dcplants',
  JR_DCP_TECH_TEST_HUMAN: 'jr_dcp_tech_test_human',
  PKG_TRAINING_DCPLANTS_TESTOUT: 'pkg_training_dcplants_testout',
  TRAINING_BATTERY: 'training_battery',
  JR_BATTERY_TECH_TEST_HUMAN: 'jr_battery_tech_test_human',
  PKG_TRAINING_BATTERY_TESTOUT: 'pkg_training_battery_testout',
  TRAINING_DCENGINEER: 'training_dcengineer',
  JR_DC_ENGINEER_TEST_HUMAN: 'jr_dc_engineer_test_human',
  PKG_TRAINING_DCENGINEER_TESTOUT: 'pkg_training_dcengineer_testout',
  TRAINING_MARINE: 'training_marine',
  JR_MARINE_TECH_TEST_HUMAN: 'jr_marine_tech_test_human',
  PKG_TRAINING_MARINE_TESTOUT: 'pkg_training_marine_testout',
  TRAINING_POOL: 'training_pool',
  JR_POOL_TECH_TEST_HUMAN: 'jr_pool_tech_test_human',
  PKG_TRAINING_POOL_TESTOUT: 'pkg_training_pool_testout',
} as const;

// Keep ProductId in sync with STRIPE_PRODUCTS keys in src/lib/stripe/client.ts
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
