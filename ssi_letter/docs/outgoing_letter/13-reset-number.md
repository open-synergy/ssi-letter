# Reset Document Number — Outgoing Letter

> **Module:** ssi_letter
>
> **Model:** `outgoing_letter`
>
> **Menu:** Letter ‣ Outgoing Letters
>
> **Actor:** user in group `Outgoing Letter - Validator`
>
> **Requires:** `01-create`

## Pre-Condition

- **Record:** Status is **Draft**.
- **Config:** An active `sequence.template` exists for this model.
- **Config:** The shipped "Standard" `policy.template` grants `manual_number_ok` for
  state `draft` to group `Outgoing Letter - Validator`.
- **Access:** User is in group `Outgoing Letter - Validator`.

## Flow

1. Open the **Letter ‣ Outgoing Letters** menu.
2. Open the record whose document number will be reset.
3. Click the **Reset Document Number** button (or edit the number field and change it to
   **/**).
4. Click **OK** on the confirmation dialog (only when the button was used).

## Post-Condition

- Document number returns to **/**.
- The record will receive an automatic number when it transitions to **On Progress**
  status, according to the sequence template configuration.
