## Summary

This PR delivers two things on a single feature branch (`main` is untouched):

1. **Security & correctness hardening** — fixes for **42 findings** surfaced by an adversarial, multi-agent audit (4 critical, 8 high, 16 medium, 14 low), each independently verified.
2. **A full UI redesign** — a cohesive "Voltage" design system themed to the electrical-services trade and career advancement.

Reviewable as two commits: `ui:` (presentational only) and `security:` (backend/logic). `type-check`, production `build` (23 routes) and `lint` all pass.

---

## 🔒 Security & correctness (commit `security:`)

**Critical**
- **Firestore privilege escalation** — the `users` create rule let any signed-in user write their own doc with `role:'admin'`. Because `isAdmin()` trusts that field, this granted full Firestore read of the `questionBank` **including correct answers**. Create rule now pins `role:'user'` and forbids admin-only fields.
- **Exam was non-functional** — client `fetch`es to `/api/exam/start`, `/submit` and the anti-cheat `/event` sent **no `Authorization` header**, so every call returned 401. They now send the Firebase ID token.
- **Missing route** — the results page fetched `/api/exam/result/[attemptId]`, which didn't exist. Added it (auth-guarded; never returns answers).

**High / Medium**
- **Stripe webhook**: idempotent fulfillment (transaction + deterministic doc IDs), requires `payment_status === 'paid'`, recovers from missing metadata, `set(merge)` instead of a throwing `update()`, and handles refunds/disputes.
- **exam/submit**: atomic claim transaction (`in_progress → completed`) closes the double-submit / double-certificate race; request body validation.
- **exam/start**: consumes the proctored `ready` order in a transaction (bound to the attempt) so an unlock can't be replayed into unlimited restarts; threads the server-randomized choice order to the client; removes dead code.
- **IP handling**: `getRealIp` no longer trusts the spoofable left-most `X-Forwarded-For` or the shared `0.0.0.0` fallback; `IP_HASH_SECRET` strength is validated.
- **Scoring**: scores against the frozen selection count, not the live bank count.
- **Admin**: shared `requireAdmin()` helper (consistent 401s), a client `admin/layout` guard, and disabled the admin links that 404'd.

**Ops**
- `firestore.indexes.json` + `firebase.json` (composite indexes the cooldown/IP-lock queries need on a fresh deploy).
- `.eslintrc.json` (`next/core-web-vitals`). Bumped `next` to `^14.2.30` (CVE-2025-29927).

---

## 🎨 UI redesign (commit `ui:`)

A "Voltage" design system: deep carbon backgrounds with a blueprint circuit grid, high-voltage gold + copper + arc-cyan accents, a bolt-mark brand, and industrial condensed display type. **Real `next/font` loading was added — the fonts were previously referenced but never loaded**, so the site had been silently falling back to system-ui. Reusable component classes (`btn-voltage`, `card-dark`, `kicker`, `badge-*`, `hazard-stripe`) keep it consistent.

### Screenshots

| Home | Certifications (Jr · AI · FSE) |
|---|---|
| ![Home](https://raw.githubusercontent.com/RealDealCPA-VR/ups-cert-platform/audit/hardening-and-ui/docs/ui-preview/01-home.png) | ![Jr FSE](https://raw.githubusercontent.com/RealDealCPA-VR/ups-cert-platform/audit/hardening-and-ui/docs/ui-preview/02-cert-junior.png) |

| FSE AI (proctored) | FSE (human proctored) |
|---|---|
| ![FSE AI](https://raw.githubusercontent.com/RealDealCPA-VR/ups-cert-platform/audit/hardening-and-ui/docs/ui-preview/03-cert-ai.png) | ![FSE](https://raw.githubusercontent.com/RealDealCPA-VR/ups-cert-platform/audit/hardening-and-ui/docs/ui-preview/04-cert-proctored.png) |

| Compare | Book |
|---|---|
| ![Compare](https://raw.githubusercontent.com/RealDealCPA-VR/ups-cert-platform/audit/hardening-and-ui/docs/ui-preview/05-compare.png) | ![Book](https://raw.githubusercontent.com/RealDealCPA-VR/ups-cert-platform/audit/hardening-and-ui/docs/ui-preview/06-book.png) |

| Employers | About |
|---|---|
| ![Employers](https://raw.githubusercontent.com/RealDealCPA-VR/ups-cert-platform/audit/hardening-and-ui/docs/ui-preview/07-employers.png) | ![About](https://raw.githubusercontent.com/RealDealCPA-VR/ups-cert-platform/audit/hardening-and-ui/docs/ui-preview/08-about.png) |

| Login | Verify |
|---|---|
| ![Login](https://raw.githubusercontent.com/RealDealCPA-VR/ups-cert-platform/audit/hardening-and-ui/docs/ui-preview/09-login.png) | ![Verify](https://raw.githubusercontent.com/RealDealCPA-VR/ups-cert-platform/audit/hardening-and-ui/docs/ui-preview/10-verify.png) |

> The screenshots are also committed under `docs/ui-preview/` and can be removed before merge if you'd prefer to keep them out of the repo.

---

## Notes for review
- No secrets are committed; `.env.local` stays gitignored.
- The design tokens keep a legacy `brand` color alias so nothing references undefined classes.
- New collections referenced (`boundAttemptId`, `proctorId` on attempts, etc.) are additive.

🤖 Generated with [Claude Code](https://claude.com/claude-code)
