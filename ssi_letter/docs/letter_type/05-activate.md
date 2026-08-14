# Activate Letter Type

> **Module:** ssi_letter
>
> **Model:** `letter_type`
>
> **Menu:** Letter ‣ Configuration ‣ Letter Types
>
> **Actor:** user in group `Letter Type`
>
> **Active:** `false` → `true`
>
> **Requires:** `04-deactivate`

## Pre-Condition

- **Record:** The record is currently archived.
- **Access:** User is in group `Letter Type`.

## Flow

1. Open the **Letter ‣ Configuration ‣ Letter Types** menu.
2. Enable the **Archived** filter in the search bar.
3. Select one or more records to reactivate (check the checkbox).
4. Click **Action** ‣ **Unarchive**.

## Post-Condition

- The records are restored and appear again in the default list view.
- The records can be selected as **Type** on new Outgoing/Incoming Letters.
