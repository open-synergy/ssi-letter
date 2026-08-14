# Deactivate Letter Type

> **Module:** ssi_letter
>
> **Model:** `letter_type`
>
> **Menu:** Letter ‣ Configuration ‣ Letter Types
>
> **Actor:** user in group `Letter Type`
>
> **Active:** `true` → `false`
>
> **Requires:** `01-create`

## Pre-Condition

- **Record:** The record is currently active.
- **Access:** User is in group `Letter Type`.

## Flow

1. Open the **Letter ‣ Configuration ‣ Letter Types** menu.
2. Select one or more records to deactivate (check the checkbox).
3. Click **Action** ‣ **Archive**.
4. Click **OK** to confirm.

## Post-Condition

- The records are archived and no longer appear in the default list view.
- Deactivated records cannot be selected as **Type** on new Outgoing/Incoming Letters.
- Outgoing/Incoming Letters that already use this record can still be viewed.
