# Create Incoming Letter

> **Module:** ssi_letter_operating_unit
>
> **Extends:** ssi_letter — model `incoming_letter`, aksi `01-create`

## Additional Pre-Condition

- **Config:** Group `operating_unit.group_multi_operating_unit` is active — the
  **Operating Unit** field described below is only visible when this group is enabled.

## Additional Fields

When this module is installed, the create form gains one optional field:

- **Operating Unit**: The operating unit that owns this letter. Automatically filled
  from the current user's default operating unit. Change if needed. Visible only when
  group `operating_unit.group_multi_operating_unit` is active.

## Modified — Record Visibility

- The Incoming Letters list is filtered by operating unit (record rule
  `incoming_letter_rule_ou`). A user only sees letters whose **Operating Unit** is one
  of the operating units assigned to them. This is not a Flow step.
