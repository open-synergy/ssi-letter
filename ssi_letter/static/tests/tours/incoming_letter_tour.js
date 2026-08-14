odoo.define("ssi_letter.incoming_letter_tour", function (require) {
    "use strict";

    var tour = require("web_tour.tour");

    // Flow 1 of every IK in this file: "Open the Letter > Incoming Letters
    // menu." "Incoming Letters" (menuitem) has no children, so it renders
    // as a plain leaf item directly in the app navbar (patterns.md "Jumlah
    // level menu di IK != jumlah step tour"). The breadcrumb gate checks
    // the ACTION title ("Incoming Letter", singular — see
    // views/incoming_letter_views.xml), not the menu label.
    var openIncomingLetterList = function () {
        return [
            tour.stepUtils.showAppsMenuItem(),
            {
                content: "Open the Letter app",
                trigger: '.o_app[data-menu-xmlid="ssi_letter.menu_root_letter"]',
            },
            {
                content: "Open the Incoming Letters menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_letter.incoming_letter_menu"]',
            },
            {
                content: "Incoming Letter list is displayed",
                trigger:
                    ".o_control_panel .breadcrumb-item.active:contains(Incoming Letter)",
                extra_trigger: ".o_list_view",
                run: function () {
                    // Assertion only; do not trigger the default click action.
                },
            },
        ];
    };

    // IK: docs/incoming_letter/01-create.md
    tour.register(
        "ssi_letter_incoming_letter_create",
        {
            test: true,
            url: "/web",
        },
        [].concat(openIncomingLetterList(), [
            // Flow 2 — Click the New button.
            {
                content: "Click New",
                trigger: ".o_list_button_add",
                extra_trigger: ".o_list_view",
            },
            {
                content: "Form is open in edit mode",
                trigger: ".o_form_view.o_form_editable",
                run: function () {
                    // Assertion only.
                },
            },

            // Flow 3 — Fill in the required fields.
            {
                content: "Select the Partner",
                trigger: ".o_field_many2one[name='partner_id'] input",
                extra_trigger: ".o_form_view.o_form_editable",
                run: "text TOUR IL Partner",
            },
            {
                content: "Pick the Partner from the dropdown",
                trigger: ".ui-autocomplete .ui-menu-item a:contains(TOUR IL Partner)",
                in_modal: false,
            },
            {
                content: "Select the Internal Partner",
                trigger: ".o_field_many2one[name='internal_partner_id'] input",
                run: "text TOUR-IL-CREATE",
            },
            {
                content: "Pick the Internal Partner from the dropdown",
                trigger: ".ui-autocomplete .ui-menu-item a:contains(TOUR-IL-CREATE)",
                in_modal: false,
            },
            {
                content: "Fill in the Date",
                trigger: ".o_field_widget[name='date'] input",
                run: "text 01/15/2026",
            },
            {
                content: "Select the Type",
                trigger: ".o_field_many2one[name='type_id'] input",
                run: "text TOUR IL Type",
            },
            {
                content: "Pick the Type from the dropdown",
                trigger: ".ui-autocomplete .ui-menu-item a:contains(TOUR IL Type)",
                in_modal: false,
            },
            {
                content: "Fill in the Title",
                trigger: ".o_field_widget[name='title']",
                run: "text TOUR Incoming Letter Create",
            },
            {
                // Checking Digital hides/un-requires Courier, so this create
                // tour does not need a Courier fixture to be able to save.
                content: "Check Digital",
                trigger: ".o_field_widget[name='digital'] input",
                run: "click",
            },

            // Flow 4 — Click Save.
            {
                content: "Save the record",
                trigger: ".o_form_button_save",
            },

            // Post-Condition — a new record is created in Draft status.
            {
                content: "Record is saved",
                trigger: ".o_form_view.o_form_readonly",
                run: function () {
                    // Assertion only.
                },
            },
            {
                content: "Status is Draft",
                trigger:
                    ".o_statusbar_status .o_arrow_button[data-value='draft'].btn-primary",
                run: function () {
                    // Assertion only.
                },
            },
        ])
    );

    // IK: docs/incoming_letter/02-edit.md
    tour.register(
        "ssi_letter_incoming_letter_edit",
        {
            test: true,
            url: "/web",
        },
        [].concat(openIncomingLetterList(), [
            // Flow 2 — Find and open the record to edit.
            {
                content: "Open the record",
                trigger: ".o_data_row:contains(TOUR-IL-EDIT) .o_data_cell:first",
                extra_trigger: ".o_list_view",
            },
            {
                content: "Record is open",
                trigger: ".o_form_view",
                run: function () {
                    // Assertion only.
                },
            },
            {
                content: "Click the Edit button",
                trigger: ".o_form_button_edit",
            },
            {
                content: "Form is now editable",
                trigger: ".o_form_view.o_form_editable",
                run: function () {
                    // Assertion only.
                },
            },

            // Flow 3 — Change the required fields.
            {
                content: "Change the Title",
                trigger: ".o_field_widget[name='title']",
                extra_trigger: ".o_form_view.o_form_editable",
                run: "text TOUR Incoming Letter Edited",
            },

            // Flow 4 — Click Save.
            {
                content: "Save the record",
                trigger: ".o_form_button_save",
            },

            // Post-Condition — the record is updated with the new values.
            {
                content: "Record is saved",
                trigger: ".o_form_view.o_form_readonly",
                run: function () {
                    // Assertion only.
                },
            },
        ])
    );

    // IK: docs/incoming_letter/03-delete.md
    tour.register(
        "ssi_letter_incoming_letter_delete",
        {
            test: true,
            url: "/web",
        },
        [].concat(openIncomingLetterList(), [
            // Flow 2 — Select the record to delete.
            {
                content: "Select the record's checkbox",
                trigger:
                    ".o_data_row:contains(TOUR-IL-DELETE) .o_list_record_selector input",
                run: "click",
            },

            // Flow 3 — Click Action > Delete.
            {
                content: "Open the Action menu",
                trigger: ".o_cp_action_menus button:contains(Action)",
            },
            {
                content: "Click Delete",
                trigger: ".o_cp_action_menus .o_menu_item a",
                run: function () {
                    var $delete = $(".o_cp_action_menus .o_menu_item a").filter(
                        function () {
                            return $(this).text().trim() === "Delete";
                        }
                    );
                    $delete[0].click();
                },
            },

            // Flow 4 — Click OK to confirm.
            {
                content: "Confirm deletion",
                trigger: ".modal-footer button.btn-primary",
                in_modal: true,
            },

            // Post-Condition — the record is permanently removed.
            {
                content: "Record is removed from the list",
                trigger: ".o_list_view:not(:has(.o_data_row:contains(TOUR-IL-DELETE)))",
                run: function () {
                    // Assertion only.
                },
            },
        ])
    );

    // IK: docs/incoming_letter/04-confirm.md
    tour.register(
        "ssi_letter_incoming_letter_confirm",
        {
            test: true,
            url: "/web",
        },
        [].concat(openIncomingLetterList(), [
            // Flow 2 — Open the record to confirm.
            {
                content: "Open the record",
                trigger: ".o_data_row:contains(TOUR-IL-CONFIRM) .o_data_cell:first",
                extra_trigger: ".o_list_view",
            },
            {
                trigger: ".o_form_view",
                run: function () {
                    // Assertion only.
                },
            },

            // Flow 3 — Click the Confirm button.
            {
                content: "Click the Confirm button",
                trigger: ".o_statusbar_buttons button[name='action_confirm']",
                extra_trigger: ".o_form_view",
            },

            // Flow 4 — Click OK on the confirmation dialog.
            {
                content: "Confirm the dialog",
                trigger: ".modal-footer button.btn-primary",
                in_modal: true,
            },

            // Post-Condition — status changes to Waiting for Approval.
            {
                content: "Status is Waiting for Approval",
                trigger:
                    ".o_statusbar_status .o_arrow_button[data-value='confirm'].btn-primary",
                run: function () {
                    // Assertion only.
                },
            },
        ])
    );

    // IK: docs/incoming_letter/05-approve.md
    tour.register(
        "ssi_letter_incoming_letter_approve",
        {
            test: true,
            url: "/web",
        },
        [].concat(openIncomingLetterList(), [
            // Flow 2 — Open the record to approve.
            {
                content: "Open the record",
                trigger: ".o_data_row:contains(TOUR-IL-APPROVE) .o_data_cell:first",
                extra_trigger: ".o_list_view",
            },
            {
                trigger: ".o_form_view",
                run: function () {
                    // Assertion only.
                },
            },

            // Flow 3 — Click the Approve button.
            {
                content: "Click the Approve button",
                trigger: ".o_statusbar_buttons button[name='action_approve_approval']",
                extra_trigger: ".o_form_view",
            },

            // Flow 4 — Click OK on the confirmation dialog.
            {
                content: "Confirm the dialog",
                trigger: ".modal-footer button.btn-primary",
                in_modal: true,
            },

            // Post-Condition — all approval levels fulfilled: the document
            // is automatically finished, status jumps straight to Done.
            // This model has no Done button (_automatically_insert_done_
            // button = False) — the transition only happens this way.
            {
                content: "Status is Done",
                trigger:
                    ".o_statusbar_status .o_arrow_button[data-value='done'].btn-primary",
                run: function () {
                    // Assertion only.
                },
            },
        ])
    );

    // IK: docs/incoming_letter/06-reject.md
    tour.register(
        "ssi_letter_incoming_letter_reject",
        {
            test: true,
            url: "/web",
        },
        [].concat(openIncomingLetterList(), [
            // Flow 2 — Open the record to reject.
            {
                content: "Open the record",
                trigger: ".o_data_row:contains(TOUR-IL-REJECT) .o_data_cell:first",
                extra_trigger: ".o_list_view",
            },
            {
                trigger: ".o_form_view",
                run: function () {
                    // Assertion only.
                },
            },

            // Flow 3 — Click the Reject button.
            {
                content: "Click the Reject button",
                trigger: ".o_statusbar_buttons button[name='action_reject_approval']",
                extra_trigger: ".o_form_view",
            },

            // Flow 4 — Click OK on the confirmation dialog.
            {
                content: "Confirm the dialog",
                trigger: ".modal-footer button.btn-primary",
                in_modal: true,
            },

            // Post-Condition — status changes to Rejected.
            {
                content: "Status is Rejected",
                trigger:
                    ".o_statusbar_status .o_arrow_button[data-value='reject'].btn-primary",
                run: function () {
                    // Assertion only.
                },
            },
        ])
    );

    // IK: docs/incoming_letter/10-cancel.md
    tour.register(
        "ssi_letter_incoming_letter_cancel",
        {
            test: true,
            url: "/web",
        },
        [].concat(openIncomingLetterList(), [
            // Flow 2 — Open the record to cancel.
            {
                content: "Open the record",
                trigger: ".o_data_row:contains(TOUR-IL-CANCEL) .o_data_cell:first",
                extra_trigger: ".o_list_view",
            },
            {
                trigger: ".o_form_view",
                run: function () {
                    // Assertion only.
                },
            },

            // Flow 3 — Click the Cancel button.
            // type="action" (opens base_select_cancel_reason_action) — the
            // rendered `name` is a resolved numeric action id, so this
            // targets the button by its label instead (selectors.md §4).
            {
                content: "Click the Cancel button",
                trigger: ".o_statusbar_buttons button:enabled:contains('Cancel')",
                extra_trigger: ".o_form_view",
            },

            // Flow 4 — In the wizard, select the Cancellation Reason.
            // cancel_reason_id uses widget="radio" here, not an
            // autocomplete — click the matching radio label directly.
            {
                content: "Wizard is open",
                trigger: ".o_form_view",
                run: function () {
                    // Assertion only.
                },
            },
            {
                content: "Select the cancellation reason",
                trigger:
                    ".o_field_widget[name='cancel_reason_id'] .o_radio_item label:contains(TOUR IL Cancel Reason)",
            },

            // Flow 5 — Click Confirm. The wizard's own Confirm button
            // carries confirm="Are you sure?" — a SECOND dialog stacks on
            // top of the wizard (overview.md, "confirm= di dalam wizard").
            {
                content: "Confirm the wizard",
                trigger: ".modal-footer button[name='action_confirm']",
            },

            // Flow 6 — Click OK on the confirmation dialog.
            {
                content: "Confirm the dialog",
                trigger: ".modal-footer button.btn-primary",
                in_modal: true,
            },

            // Post-Condition — status changes to Cancelled.
            {
                content: "Status is Cancelled",
                trigger:
                    ".o_statusbar_status .o_arrow_button[data-value='cancel'].btn-primary",
                run: function () {
                    // Assertion only.
                },
            },
        ])
    );

    // IK: docs/incoming_letter/12-restart.md
    tour.register(
        "ssi_letter_incoming_letter_restart",
        {
            test: true,
            url: "/web",
        },
        [].concat(openIncomingLetterList(), [
            // Flow 2/3 — The default list has no active state filter, so
            // the Cancelled fixture is already visible here — open it
            // directly.
            {
                content: "Open the record",
                trigger: ".o_data_row:contains(TOUR-IL-RESTART) .o_data_cell:first",
                extra_trigger: ".o_list_view",
            },
            {
                trigger: ".o_form_view",
                run: function () {
                    // Assertion only.
                },
            },

            // Flow 4 — Click the Restart button.
            {
                content: "Click the Restart button",
                trigger: ".o_statusbar_buttons button[name='action_restart']",
                extra_trigger: ".o_form_view",
            },

            // Flow 5 — Click OK on the confirmation dialog.
            {
                content: "Confirm the dialog",
                trigger: ".modal-footer button.btn-primary",
                in_modal: true,
            },

            // Post-Condition — status returns to Draft.
            {
                content: "Status is Draft",
                trigger:
                    ".o_statusbar_status .o_arrow_button[data-value='draft'].btn-primary",
                run: function () {
                    // Assertion only.
                },
            },
        ])
    );

    // IK: docs/incoming_letter/13-reset-number.md
    tour.register(
        "ssi_letter_incoming_letter_reset_number",
        {
            test: true,
            url: "/web",
        },
        [].concat(openIncomingLetterList(), [
            // Flow 2 — Open the record whose document number will be reset.
            {
                content: "Open the record",
                trigger: ".o_data_row:contains(TOUR-IL-RESET) .o_data_cell:first",
                extra_trigger: ".o_list_view",
            },
            {
                trigger: ".o_form_view",
                run: function () {
                    // Assertion only.
                },
            },

            // Flow 3 — Click the Reset Document Number button.
            {
                content: "Click the Reset Document Number button",
                trigger:
                    ".o_statusbar_buttons button[name='action_reset_document_number']",
                extra_trigger: ".o_form_view",
            },

            // Flow 4 — Click OK on the confirmation dialog.
            {
                content: "Confirm the dialog",
                trigger: ".modal-footer button.btn-primary",
                in_modal: true,
            },

            // Post-Condition — document number returns to "/". The fixture
            // was created with the manual number "TOUR-IL-RESET-NUM"
            // (litmus test: this selector cannot match before Reset runs).
            {
                content: "Document number returns to /",
                trigger:
                    ".o_form_view .o_field_widget[name='display_name']:not(:contains(TOUR-IL-RESET-NUM))",
                run: function () {
                    // Assertion only.
                },
            },
        ])
    );

    // IK: docs/incoming_letter/14-restart-approval.md
    tour.register(
        "ssi_letter_incoming_letter_restart_approval",
        {
            test: true,
            url: "/web",
        },
        [].concat(openIncomingLetterList(), [
            // Flow 2 — Open the record to restart the approval process for.
            {
                content: "Open the record",
                trigger: ".o_data_row:contains(TOUR-IL-REAPPROVAL) .o_data_cell:first",
                extra_trigger: ".o_list_view",
            },
            {
                trigger: ".o_form_view",
                run: function () {
                    // Assertion only.
                },
            },

            // Flow 3 — Click the Restart Approval Process button.
            {
                content: "Click the Restart Approval Process button",
                trigger:
                    ".o_statusbar_buttons button[name='action_reload_approval_template']",
                extra_trigger: ".o_form_view",
            },

            // Flow 4 — Click OK on the confirmation dialog.
            {
                content: "Confirm the dialog",
                trigger: ".modal-footer button.btn-primary",
                in_modal: true,
            },

            // Post-Condition — status remains Waiting for Approval.
            {
                content: "Status is still Waiting for Approval",
                trigger:
                    ".o_statusbar_status .o_arrow_button[data-value='confirm'].btn-primary",
                run: function () {
                    // Assertion only.
                },
            },
        ])
    );
});
