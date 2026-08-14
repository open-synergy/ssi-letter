# Create Outgoing Letter

> **Module:** ssi_letter
>
> **Model:** `outgoing_letter`
>
> **Menu:** Letter ‣ Outgoing Letters
>
> **Actor:** user in group `Outgoing Letter - User`
>
> **State:** `—` → `draft`

## Pre-Condition

- **Config:** An active `policy.template` for this model grants `confirm_ok` for state
  `draft` to group `Outgoing Letter - User` — required later to Confirm this record; see
  `04-confirm`.
- **Data:** The **Partner**, **Internal Partner**, and **Letter Type** records used on
  this document already exist.
- **Access:** User is in group `Outgoing Letter - User`.

## Flow

1. Open the **Letter ‣ Outgoing Letters** menu.
2. Click the **New** button. **(14.0: "Create")**
3. Fill in the required fields:
   - **Partner** _(required)_: Select the external partner (company) this letter is
     addressed to.
   - **Contact**: Select a contact belonging to the selected Partner. Optional — the
     list is filtered to contacts of the chosen Partner and is automatically cleared
     when **Partner** changes.
   - **Internal Partner** _(required)_: Select the internal person (from your own
     company) issuing this letter.
   - **Date** _(required)_: Enter the letter date.
   - **Type** _(required)_: Select the **Letter Type**.
   - **Title** _(required)_: Enter the subject/title of the letter.
   - **Digital**: Check this box if the letter is delivered digitally. Leave unchecked
     for a physical/paper letter.
   - **Courier** _(required if **Digital** is unchecked)_: Select the courier that
     delivers the physical letter. Hidden and not required when **Digital** is checked.
4. Click **Save**.

## Post-Condition

- A new record is created in **Draft** status.
- The document number shows **/** until the record reaches **On Progress** status (see
  `05-approve`), when it is assigned automatically according to the sequence template
  configuration.
