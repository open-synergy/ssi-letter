# Delete Internal Memo

> **Module:** ssi_letter
>
> **Model:** `internal_memo`
>
> **Menu:** Letter ‣ Internal Memos
>
> **Actor:** user in group `Internal Memo - User`
>
> **Requires:** `01-create`

## Pre-Condition

- **Record:** Status is **Draft**.
- **Record:** Document number is still **/** (not yet generated).
- **Access:** User is in group `Internal Memo - User`.

## Flow

1. Open the **Letter ‣ Internal Memos** menu.
2. Select one or more records to delete (check the checkbox).
3. Click **Action** ‣ **Delete**.
4. Click **OK** to confirm.

## Post-Condition

- The selected records are permanently removed from the system.
