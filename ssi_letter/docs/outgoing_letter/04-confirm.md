# Confirm Outgoing Letter

> **Module:** ssi_letter
>
> **Model:** `outgoing_letter`
>
> **Menu:** Letter ‣ Outgoing Letters
>
> **Actor:** user in group `Outgoing Letter - User`
>
> **State:** `draft` → `confirm`
>
> **Requires:** `01-create`

## Pre-Condition

- **Record:** Status is **Draft**.
- **Config:** The shipped "Standard" `policy.template` for this model grants
  `confirm_ok` for state `draft` to group `Outgoing Letter - User`.
- **Config:** The shipped "Standard" `approval.template` for this model matches this
  record, with a single approval level whose approvers are drawn from group
  `Outgoing Letter - Validator`.
- **Access:** User is in group `Outgoing Letter - User`.

## Flow

1. Open the **Letter ‣ Outgoing Letters** menu.
2. Open the record to confirm.
3. Click the **Confirm** button.
4. Click **OK** on the confirmation dialog.

## Post-Condition

- Status changes to **Waiting for Approval**.
- An approval record is created for the pending approval level, drawn from the matching
  approval template.
