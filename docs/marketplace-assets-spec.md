# Marketplace Asset Pack Spec

## Required Files
- app-icon.png
- screenshot-item-view.png
- screenshot-board-view.png
- screenshot-board-settings-integration.png

## Optional Files
- screenshot-audit-trail.png

## Capture Guidelines
- Use production-like sample board/item data (no placeholder lorem text)
- Keep all screenshots in the same theme and zoom level
- Ensure key UI labels are visible and readable
- Crop to the relevant app surface only (avoid browser chrome where possible)

## Shot List
1) Item View Approval
- Show status card with requester/approver metadata
- Show action buttons: Approve, Reject, Request Changes
- Show request note if present

2) Board View Dashboard
- Show Pending / Recently Approved / Recently Rejected sections
- Show My Approvals toggle and at least one overdue indicator

3) Board Settings + Integration Context
- Show board config section with status column/default approver/reminder values
- Include visible save success state

4) (Optional) Audit Timeline
- Show ordered lifecycle events (requested, resolved/reminded)

## Export Naming Convention
- approveit-icon-v1.png
- approveit-item-view-v1.png
- approveit-board-view-v1.png
- approveit-board-settings-v1.png
- approveit-audit-trail-v1.png

## Quality Gate
- [ ] No blurred text
- [ ] No personal/customer data
- [ ] Consistent visual style across all screenshots
- [ ] All screenshots reflect implemented functionality
