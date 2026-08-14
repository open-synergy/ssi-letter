// Copyright 2026 OpenSynergy Indonesia
// Copyright 2026 PT. Simetri Sinergi Indonesia
// License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

odoo.define("ssi_letter_work_log.outgoing_letter_tour", function (require) {
    "use strict";

    var tour = require("web_tour.tour");

    // IK: docs/outgoing_letter/05-approve.md (E2a delta -- Modified Flow)
    // Navigation (open menu -> open record -> click Approve -> confirm the
    // dialog) is retraced from the base IK
    // ssi_letter/docs/outgoing_letter/05-approve.md Flow steps 1-4 -- see
    // skill odoo-development-ui-test, scope-and-boundaries.md §3 ("Backing
    // dua file: tour extension = base IK ∪ delta IK"). The delta assertion,
    // inserted right before the base's Flow step 3, proves the additional
    // "Work Log" page is visible on the form -- it has been present since
    // record creation, but this is the anchor documented in the delta IK.
    // A second delta assertion after the base action completes proves the
    // page keeps being reachable once the document reaches On Progress
    // (Additional Post-Condition).
    tour.register(
        "ssi_letter_work_log_outgoing_letter_approve",
        {
            test: true,
            url: "/web",
        },
        [
            // ── Base Flow 1 — Open the Letter > Outgoing Letters menu.
            tour.stepUtils.showAppsMenuItem(),
            {
                content: "Open the Letter app",
                trigger: '.o_app[data-menu-xmlid="ssi_letter.menu_root_letter"]',
            },
            {
                content: "Open the Outgoing Letters menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_letter.outgoing_letter_menu"]',
            },
            {
                content: "Outgoing Letter list is displayed",
                trigger:
                    ".o_control_panel .breadcrumb-item.active:contains(Outgoing Letter)",
                extra_trigger: ".o_list_view",
                run: function () {
                    // Assertion only; do not trigger the default click.
                },
            },

            // ── Base Flow 2 — Open the record to approve.
            {
                content: "Open the record",
                trigger: ".o_data_row:contains(TOUR-WL-OL-APPROVE) .o_data_cell:first",
                extra_trigger: ".o_list_view",
            },
            {
                trigger: ".o_form_view",
                run: function () {
                    // Assertion only.
                },
            },

            // ── Delta anchor — before clicking Approve (base Flow step 3),
            // open the Work Log page this module adds and prove it is
            // rendered.
            {
                content: "Open the Work Log tab",
                trigger: ".o_notebook .nav-link:contains(Work Log)",
            },
            {
                // Anchored to the field label, not the float widget itself
                // -- a label always carries text regardless of the
                // field's value (odoo-development-ui-test skill,
                // patterns.md §O).
                content: "Work Log page shows the Estimation field",
                trigger: ".o_form_label:contains(Estimation)",
                run: function () {
                    // Assertion only.
                },
            },

            // ── Base Flow 3 — Click the Approve button.
            {
                content: "Click the Approve button",
                trigger: ".o_statusbar_buttons button[name='action_approve_approval']",
                extra_trigger: ".o_form_view",
            },

            // ── Base Flow 4 — Click OK on the confirmation dialog.
            {
                content: "Confirm the dialog",
                trigger: ".modal-footer button.btn-primary",
                in_modal: true,
            },

            // ── Base Post-Condition — the action still completes: status
            // jumps straight to On Progress.
            {
                content: "Status is On Progress",
                trigger:
                    ".o_statusbar_status .o_arrow_button[data-value='open'].btn-primary",
                run: function () {
                    // Assertion only.
                },
            },

            // ── Additional Post-Condition — the Work Log page keeps being
            // reachable now that the document is On Progress, the period
            // during which staff typically record their hours before
            // Finish (see docs/outgoing_letter/09-finish.md, base module).
            {
                content: "Work Log tab is still reachable while On Progress",
                trigger: ".o_notebook .nav-link:contains(Work Log)",
            },
            {
                content: "Work Log page still shows the Estimation field",
                trigger: ".o_form_label:contains(Estimation)",
                run: function () {
                    // Assertion only.
                },
            },
        ]
    );
});
