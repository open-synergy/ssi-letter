# Approve Outgoing Letter

> **Module:** ssi_letter
>
> **Model:** `outgoing_letter`
>
> **Menu:** Letter ‣ Outgoing Letters
>
> **Actor:** approver on the pending approval level (drawn from group
> `Outgoing Letter - Validator`)
>
> **State:** `confirm` → `open`
>
> **Requires:** `04-confirm`

## Pre-Condition

- **Record:** Status is **Waiting for Approval**.
- **Config:** The shipped "Standard" `policy.template` grants `approve_ok` to the actor
  while they are registered as an active approver on the record.
- **Config:** An active `sequence.template` exists for this model — required for the
  document number that is generated automatically once this document reaches **On
  Progress**.
- **Access:** User is registered as an approver on the approval level that is currently
  **pending**.

## Flow

1. Open the **Letter ‣ Outgoing Letters** menu.
2. Open the record to approve.
3. Click the **Approve** button.
4. Click **OK** on the confirmation dialog.

## Post-Condition

- If there are still pending approval levels, status remains **Waiting for Approval**
  and the next level becomes pending.
- If all approval levels are fulfilled, this document is automatically opened: status
  changes straight to **On Progress**. There is no separate manual "Start" step — the
  transition happens as soon as the last approval level is fulfilled. Its document
  number is also generated automatically according to the sequence template
  configuration.
