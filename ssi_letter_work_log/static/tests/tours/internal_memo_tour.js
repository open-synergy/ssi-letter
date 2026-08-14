// Copyright 2026 OpenSynergy Indonesia
// Copyright 2026 PT. Simetri Sinergi Indonesia
// License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

odoo.define("ssi_letter_work_log.internal_memo_tour", function (require) {
    "use strict";

    var tour = require("web_tour.tour");

    // IK: docs/internal_memo/01-create.md (E2a delta -- Modified Flow)
    // Navigation (open menu -> New) is taken from the base IK
    // ssi_letter/docs/internal_memo/01-create.md Flow steps 1-2 -- see
    // skill odoo-development-ui-test, scope-and-boundaries.md §1 ("Backing
    // dua file: tour extension = base IK ∪ delta IK"). The delta assertion
    // comes from this module's own IK: the Work Log page is already
    // rendered on the unsaved create form (no field needs to be filled,
    // no state condition applies). The tour stops there; it does not
    // fill or save (delta-only, matching patterns.md §O).
    tour.register(
        "ssi_letter_work_log_internal_memo_create",
        {
            test: true,
            url: "/web",
        },
        [
            // ── Base Flow 1 — Open the Letter > Internal Memos menu.
            tour.stepUtils.showAppsMenuItem(),
            {
                content: "Open the Letter app",
                trigger: '.o_app[data-menu-xmlid="ssi_letter.menu_root_letter"]',
            },
            {
                content: "Open the Internal Memos menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_letter.internal_memo_menu"]',
            },
            {
                content: "Internal Memo list is displayed",
                trigger:
                    ".o_control_panel .breadcrumb-item.active:contains(Internal Memo)",
                extra_trigger: ".o_list_view",
                run: function () {
                    // Assertion only; do not trigger the default click.
                },
            },

            // ── Base Flow 2 — Click the New button. (14.0: "Create")
            {
                content: "Click New",
                trigger: ".o_list_button_add",
                extra_trigger: ".o_list_view",
            },
            {
                content: "Form is open in edit mode",
                trigger: ".o_form_view.o_form_editable",
                run: function () {
                    // Assertion only; do not trigger the default click.
                },
            },

            // ── Delta assertion — the Work Log page this module adds is
            // visible on the create form. The tour stops here
            // (delta-only).
            {
                content: "Work Log tab is displayed",
                trigger: ".o_notebook .nav-link:contains(Work Log)",
            },
            {
                // Anchored to the field label, not the float widget
                // itself -- a label always carries text regardless of
                // the field's value (odoo-development-ui-test skill,
                // patterns.md §O).
                content: "Work Log page shows the Estimation field",
                trigger:
                    ".o_form_view.o_form_editable .o_form_label:contains(Estimation)",
                run: function () {
                    // Assertion only; do not trigger the default click.
                },
            },
        ]
    );
});
