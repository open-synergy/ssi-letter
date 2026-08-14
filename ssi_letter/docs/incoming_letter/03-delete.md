# Delete Incoming Letter

> **Module:** ssi_letter
>
> **Model:** `incoming_letter`
>
> **Menu:** Letter ‣ Incoming Letters
>
> **Actor:** user in group `Incoming Letter - User`
>
> **Requires:** `01-create`

## Pre-Condition

- **Record:** Status is **Draft**.
- **Record:** Document number is still **/** (not yet generated).
- **Access:** User is in group `Incoming Letter - User`.

## Flow

1. Open the **Letter ‣ Incoming Letters** menu.
2. Select one or more records to delete (check the checkbox).
3. Click **Action** ‣ **Delete**.
4. Click **OK** to confirm.

## Post-Condition

- The selected records are permanently removed from the system.
