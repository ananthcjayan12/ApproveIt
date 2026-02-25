# Marketplace Submission Runbook

## Objective
Submit ApproveIt to monday marketplace with complete metadata, assets, and review checklist coverage.

## Inputs
- Listing copy: docs/marketplace-listing.md
- Asset requirements: docs/marketplace-assets-spec.md
- Review checklist: docs/app-review-checklist.md
- Submission tracker: docs/submission-tracker.md

## Step-by-Step
1. Open monday Developer Center and select the draft app version.
2. Confirm feature deployment routes are attached for Item View, Board View, and Integration action.
3. Paste listing copy fields from docs/marketplace-listing.md.
4. Upload icon + required screenshots from finalized asset pack.
5. Confirm support email, privacy URL, and terms URL are valid and publicly reachable.
6. Run through docs/app-review-checklist.md and mark final manual checks.
7. Submit app for review.
8. Record submission timestamp and reviewer notes in docs/submission-tracker.md.

## Expected Reviewer Questions
- How is duplicate approval prevention handled?
- What happens if monday side effects fail after DB success?
- How is tenant isolation enforced?

## Prepared Answers (Short)
- Duplicate pending approvals are blocked with 409 conflict handling.
- Side-effect failures are logged and queued for retry visibility.
- Mutating calls validate account/board/item relationships and account scope.

## Post-Submission SLA
- First response to monday review comments: 1 business day
- Patch turnaround target: 2 business days for P0/P1 feedback
