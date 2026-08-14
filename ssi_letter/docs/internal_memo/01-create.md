# Create Internal Memo

> **Module:** ssi_letter
>
> **Model:** `internal_memo`
>
> **Menu:** Letter ‣ Internal Memos
>
> **Actor:** user in group `Internal Memo - User`
>
> **State:** `—` → `draft`

## Pre-Condition

- **Config:** An active `policy.template` for this model grants `confirm_ok` for state
  `draft` to group `Internal Memo - User` — required later to Confirm this record; see
  `04-confirm`.
- **Data:** The **Internal Memo Type** record used on this document already exists.
- **Access:** User is in group `Internal Memo - User`.

## Flow

1. Open the **Letter ‣ Internal Memos** menu.
2. Click the **New** button. **(14.0: "Create")**
3. Fill in the required fields:
   - **Type** _(required)_: Select the **Internal Memo Type**.
   - **Recipients**: Select the users this memo is addressed to. Optional.
   - **Date** _(required)_: Enter the memo date.
   - **Title** _(required)_: Enter the subject/title of the memo.
4. Open the **Memo** tab and fill in:
   - **Memo** _(required)_: Enter the memo content.
5. Click **Save**.

## Post-Condition

- A new record is created in **Draft** status.
- The document number shows **/** until the record reaches **Done** status (see
  `05-approve`), when it is assigned automatically according to the sequence template
  configuration.
