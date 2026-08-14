# Create Incoming Letter

> **Module:** ssi_letter
>
> **Model:** `incoming_letter`
>
> **Menu:** Letter ‣ Incoming Letters
>
> **Actor:** user in group `Incoming Letter - User`
>
> **State:** `—` → `draft`

## Pre-Condition

- **Config:** An active `policy.template` for this model grants `confirm_ok` for state
  `draft` to group `Incoming Letter - User` — required later to Confirm this record; see
  `04-confirm`.
- **Data:** The **Partner**, **Internal Partner**, and **Letter Type** records used on
  this document already exist.
- **Access:** User is in group `Incoming Letter - User`.

## Flow

1. Open the **Letter ‣ Incoming Letters** menu.
2. Click the **New** button. **(14.0: "Create")**
3. Fill in the required fields:
   - **Partner** _(required)_: Select the external partner (company) this letter was
     received from.
   - **Contact**: Select a contact belonging to the selected Partner. Optional — the
     list is filtered to contacts of the chosen Partner and is automatically cleared
     when **Partner** changes.
   - **Internal Partner** _(required)_: Select the internal person (from your own
     company) recording/receiving this letter.
   - **Date** _(required)_: Enter the letter date.
   - **Type** _(required)_: Select the **Letter Type**.
   - **Title** _(required)_: Enter the subject/title of the letter.
   - **Digital**: Check this box if the letter was received digitally. Leave unchecked
     for a physical/paper letter.
   - **Courier** _(required if **Digital** is unchecked)_: Select the courier that
     delivered the physical letter. Hidden and not required when **Digital** is checked.
4. Click **Save**.

## Post-Condition

- A new record is created in **Draft** status.
- The document number shows **/** until the record reaches **Done** status (see
  `05-approve`), when it is assigned automatically according to the sequence template
  configuration.
