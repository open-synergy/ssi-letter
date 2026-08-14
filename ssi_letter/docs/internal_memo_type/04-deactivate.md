# Deactivate Internal Memo Type

> **Module:** ssi_letter
>
> **Model:** `internal_memo_type`
>
> **Menu:** Letter ‣ Configuration ‣ Internal Memo Types
>
> **Actor:** user in group `Internal Memo Type`
>
> **Active:** `true` → `false`
>
> **Requires:** `01-create`

## Pre-Condition

- **Record:** The record is currently active.
- **Access:** User is in group `Internal Memo Type`.

## Flow

1. Open the **Letter ‣ Configuration ‣ Internal Memo Types** menu.
2. Select one or more records to deactivate (check the checkbox).
3. Click **Action** ‣ **Archive**.
4. Click **OK** to confirm.

## Post-Condition

- The records are archived and no longer appear in the default list view.
- Deactivated records cannot be selected as **Type** on new Internal Memos.
- Internal Memos that already use this record can still be viewed.
