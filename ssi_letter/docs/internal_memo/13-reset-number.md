# Reset Document Number — Internal Memo

> **Module:** ssi_letter
>
> **Model:** `internal_memo`
>
> **Menu:** Letter ‣ Internal Memos
>
> **Actor:** user in group `Internal Memo - Validator`
>
> **Requires:** `01-create`

## Pre-Condition

- **Record:** Status is **Draft**.
- **Config:** An active `sequence.template` exists for this model.
- **Config:** The shipped "Standard" `policy.template` grants `manual_number_ok` for
  state `draft` to group `Internal Memo - Validator`.
- **Access:** User is in group `Internal Memo - Validator`.

## Flow

1. Open the **Letter ‣ Internal Memos** menu.
2. Open the record whose document number will be reset.
3. Click the **Reset Document Number** button (or edit the number field and change it to
   **/**).
4. Click **OK** on the confirmation dialog (only when the button was used).

## Post-Condition

- Document number returns to **/**.
- The record will receive an automatic number when it transitions to **Done** status,
  according to the sequence template configuration.
