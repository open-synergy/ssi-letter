# Create Internal Memo Type

> **Module:** ssi_letter
>
> **Model:** `internal_memo_type`
>
> **Menu:** Letter ‣ Configuration ‣ Internal Memo Types
>
> **Actor:** user in group `Internal Memo Type`
>
> **Inline Actions:** `action_generate_code` (Generate Code)

## Pre-Condition

- **Access:** User is in group `Internal Memo Type`.

## Flow

1. Open the **Letter ‣ Configuration ‣ Internal Memo Types** menu.
2. Click the **New** button. **(14.0: "Create")**
3. Fill in the required fields:
   - **Name** _(required)_: Enter the name of the internal memo type (e.g.
     "Announcement", "Policy Update").
   - **Code** _(required)_: Enter a unique code identifying this internal memo type, or
     enter **/** to assign it later using **Generate Code**.
4. Click **Generate Code** in the header to automatically assign a code from the
   `sequence.template` configured for `internal_memo_type`. This requires an active
   `sequence.template` for this model — without one, the action fails with an error. You
   may also leave the Code field as **/** or type a code manually instead.
5. Click **Save**.

## Post-Condition

- A new Internal Memo Type record is created and active.
- The new Internal Memo Type becomes selectable from the Type field of an Internal Memo.
