# Restart Approval Process — Incoming Letter

> **Module:** ssi_letter
>
> **Model:** `incoming_letter`
>
> **Menu:** Letter ‣ Incoming Letters
>
> **Actor:** user in group `Incoming Letter - Validator`
>
> **Requires:** `04-confirm`

## Pre-Condition

- **Record:** Status is **Waiting for Approval**.
- **Config:** The shipped "Standard" `policy.template` for this model grants
  `restart_approval_ok` for state `confirm` to group `Incoming Letter - Validator`, but
  only while the record has **no** Approval Template assigned yet (see note below).
- **Access:** User is in group `Incoming Letter - Validator`.

## Flow

1. Open the **Letter ‣ Incoming Letters** menu.
2. Open the record to restart the approval process for.
3. Click the **Restart Approval Process** button.
4. Click **OK** on the confirmation dialog.

## Post-Condition

- All existing approval records for this document are removed.
- New approval records are created from the record's current **Approval Template**,
  restarting the approval process from the first level.
- Status remains **Waiting for Approval**.

> **Note:** the shipped "Standard" `policy.template` for `incoming_letter`
> (`policy_template/incoming_letter.xml`) grants `restart_approval_ok` to group
> `Incoming Letter - Validator` only when `document.approval_template_id` is **not**
> set. Once Confirm has assigned an Approval Template to the record (the normal case for
> a record confirmed with the shipped "Standard" `approval.template`), this policy
> evaluates to **False** for every user, so the **Restart Approval Process** button is
> present in the form (gate G1/G2 both pass at the code level — see the class attribute
> `_automatically_insert_restart_approval_button` and `_policy_field_order`) but not
> clickable under the default configuration. An administrator must adjust the
> `policy.template_detail` row for `restart_approval_ok` before this button becomes
> usable in that situation. This was found while writing this IK and is reported here
> rather than fixed, since changing that row is a data/behavior change out of scope for
> this Work Instruction.
