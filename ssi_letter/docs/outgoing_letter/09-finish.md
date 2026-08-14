# Finish Outgoing Letter

> **Module:** ssi_letter
>
> **Model:** `outgoing_letter`
>
> **Menu:** Letter ‣ Outgoing Letters
>
> **Actor:** user in group `Outgoing Letter - User`
>
> **State:** `open` → `done`
>
> **Requires:** `05-approve`

## Pre-Condition

- **Record:** Status is **On Progress**.
- **Config:** The shipped "Standard" `policy.template` for this model grants `done_ok`
  for state `open` to group `Outgoing Letter - User`.
- **Access:** User is in group `Outgoing Letter - User`.

## Flow

1. Open the **Letter ‣ Outgoing Letters** menu.
2. Open the record to finish.
3. Click the **Done** button.
4. Click **OK** on the confirmation dialog.

## Post-Condition

- Status changes to **Done**.
