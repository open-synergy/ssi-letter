# Restart Outgoing Letter

> **Module:** ssi_letter
>
> **Model:** `outgoing_letter`
>
> **Menu:** Letter ‣ Outgoing Letters
>
> **Actor:** user in group `Outgoing Letter - Validator`
>
> **State:** `cancel` | `reject` → `draft`
>
> **Requires:** `10-cancel`

## Pre-Condition

- **Record:** Status is **Cancelled** or **Rejected**.
- **Config:** The shipped "Standard" `policy.template` grants `restart_ok` for that
  state to group `Outgoing Letter - Validator`.
- **Access:** User is in group `Outgoing Letter - Validator`.

## Flow

1. Open the **Letter ‣ Outgoing Letters** menu.
2. Remove the default state filter from the search bar, if the document does not appear
   in the default list.
3. Open the record to restart.
4. Click the **Restart** button.
5. Click **OK** on the confirmation dialog.

## Post-Condition

- Status returns to **Draft**.
- If this document had already been confirmed, all its approval records are removed and
  its Approval Template is cleared. A later Confirm starts the approval process from the
  beginning.
