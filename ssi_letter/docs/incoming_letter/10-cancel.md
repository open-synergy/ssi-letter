# Cancel Incoming Letter

> **Module:** ssi_letter
>
> **Model:** `incoming_letter`
>
> **Menu:** Letter ‣ Incoming Letters
>
> **Actor:** user in group `Incoming Letter - Validator`
>
> **State:** `draft` | `confirm` | `done` → `cancel`
>
> **Requires:** `01-create`

## Pre-Condition

- **Record:** Status is **Draft**, **Waiting for Approval**, or **Done**.
- **Config:** The shipped "Standard" `policy.template` grants `cancel_ok` for that state
  to group `Incoming Letter - Validator`.
- **Access:** User is in group `Incoming Letter - Validator`.

## Flow

1. Open the **Letter ‣ Incoming Letters** menu.
2. Open the record to cancel.
3. Click the **Cancel** button.
4. In the wizard that appears, select the **Cancellation Reason**.
5. Click **Confirm**.
6. Click **OK** on the confirmation dialog.

## Post-Condition

- Status changes to **Cancelled**.
