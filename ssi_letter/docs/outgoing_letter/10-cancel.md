# Cancel Outgoing Letter

> **Module:** ssi_letter
>
> **Model:** `outgoing_letter`
>
> **Menu:** Letter ‣ Outgoing Letters
>
> **Actor:** user in group `Outgoing Letter - Validator`
>
> **State:** `draft` | `confirm` | `open` | `done` → `cancel`
>
> **Requires:** `01-create`

## Pre-Condition

- **Record:** Status is **Draft**, **Waiting for Approval**, **On Progress**, or
  **Done**.
- **Config:** The shipped "Standard" `policy.template` grants `cancel_ok` for that state
  to group `Outgoing Letter - Validator`.
- **Access:** User is in group `Outgoing Letter - Validator`.

## Flow

1. Open the **Letter ‣ Outgoing Letters** menu.
2. Open the record to cancel.
3. Click the **Cancel** button.
4. In the wizard that appears, select the **Cancellation Reason**.
5. Click **Confirm**.
6. Click **OK** on the confirmation dialog.

## Post-Condition

- Status changes to **Cancelled**.
