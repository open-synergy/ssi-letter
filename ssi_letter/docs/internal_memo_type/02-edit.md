# Edit Internal Memo Type

> **Module:** ssi_letter
>
> **Model:** `internal_memo_type`
>
> **Menu:** Letter ‣ Configuration ‣ Internal Memo Types
>
> **Actor:** user in group `Internal Memo Type`
>
> **Requires:** `01-create`
>
> **Inline Actions:** `action_generate_code` (Generate Code), `action_reset_code` (Reset
> code)

## Pre-Condition

- **Access:** User is in group `Internal Memo Type`.

## Flow

1. Open the **Letter ‣ Configuration ‣ Internal Memo Types** menu.
2. Find and open the record to edit.
3. Change the required fields (Name, Code).
4. Click **Generate Code** in the header to assign a code from the configured
   `sequence.template`, if the Code field is still **/**. This requires an active
   `sequence.template` for `internal_memo_type` — without one, the action fails with an
   error. You may also type the code manually instead.
5. Click **Save**.
6. To make the record eligible for **Generate Code** again, go back to the **Internal
   Memo Types** list, select the record's checkbox, click **Reset code** in the header,
   then click **OK** to confirm. This resets the Code field back to **/**.

## Post-Condition

- The record is updated with the new values.
