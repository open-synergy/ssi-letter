# Delete Outgoing Letter

> **Module:** ssi_letter
>
> **Model:** `outgoing_letter`
>
> **Menu:** Letter ‣ Outgoing Letters
>
> **Actor:** user in group `Outgoing Letter - User`
>
> **Requires:** `01-create`

## Pre-Condition

- **Record:** Status is **Draft**.
- **Record:** Document number is still **/** (not yet generated).
- **Access:** User is in group `Outgoing Letter - User`.

## Flow

1. Open the **Letter ‣ Outgoing Letters** menu.
2. Open the record to delete.
3. Click **Action** ‣ **Delete**.
4. Click **OK** to confirm.

## Post-Condition

- The record is permanently removed from the system.
