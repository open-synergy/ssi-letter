# Create Letter Type

> **Module:** ssi_letter
>
> **Model:** `letter_type`
>
> **Menu:** Letter ‣ Configuration ‣ Letter Types
>
> **Actor:** user in group `Letter Type`
>
> **Inline Actions:** `action_generate_code` (Generate Code)

## Pre-Condition

- **Access:** User is in group `Letter Type`.

## Flow

1. Open the **Letter ‣ Configuration ‣ Letter Types** menu.
2. Click the **New** button. **(14.0: "Create")**
3. Fill in the required fields:
   - **Name** _(required)_: Enter the name of the letter type (e.g. "Official Letter",
     "Invitation").
   - **Code** _(required)_: Enter a unique code identifying this letter type, or enter
     **/** to assign it later using **Generate Code**.
4. Click **Generate Code** in the header to automatically assign a code from the
   `sequence.template` configured for `letter_type`. This requires an active
   `sequence.template` for this model — without one, the action fails with an error. You
   may also leave the Code field as **/** or type a code manually instead.
5. Click **Save**.

## Post-Condition

- A new Letter Type record is created and active.
- The new Letter Type becomes selectable from the Type field of an Outgoing Letter or
  Incoming Letter.
