odoo.define("ssi_letter.letter_type_tour", function (require) {
    "use strict";

    var tour = require("web_tour.tour");

    // IK: docs/letter_type/01-create.md
    tour.register(
        "ssi_letter_letter_type_create",
        {
            test: true,
            url: "/web",
        },
        [
            // Flow 1 — Open the Letter > Configuration > Letter Types menu
            tour.stepUtils.showAppsMenuItem(),
            {
                content: "Open the Letter app",
                trigger: '.o_app[data-menu-xmlid="ssi_letter.menu_root_letter"]',
            },
            {
                content: "Open the Configuration menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_letter.menu_letter_configuration"]',
            },
            {
                content: "Open the Letter Types menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_letter.letter_type_menu"]',
            },
            {
                content: "Letter Types list is displayed",
                trigger:
                    ".o_control_panel .breadcrumb-item.active:contains(Letter Types)",
                extra_trigger: ".o_list_view",
                run: function () {
                    // Assertion only.
                },
            },

            // Flow 2 — Click the New button
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

            // Flow 3 — Fill in the required fields
            {
                content: "Fill in Name",
                trigger: ".o_field_widget[name='name']",
                extra_trigger: ".o_form_view.o_form_editable",
                run: "text TOUR Letter Type Create",
            },
            {
                content: "Fill in Code",
                trigger: ".o_field_widget[name='code']",
                extra_trigger: ".o_form_view.o_form_editable",
                run: "text /",
            },

            // Flow 5 — Click Save
            {
                content: "Save the record",
                trigger: ".o_form_button_save",
            },

            // Post-Condition — record is created and active
            {
                content: "Record is saved",
                trigger: ".o_form_view.o_form_readonly",
                run: function () {
                    // Assertion only.
                },
            },
        ]
    );

    // IK: docs/letter_type/02-edit.md
    tour.register(
        "ssi_letter_letter_type_edit",
        {
            test: true,
            url: "/web",
        },
        [
            // Flow 1 — Open the Letter > Configuration > Letter Types menu
            tour.stepUtils.showAppsMenuItem(),
            {
                content: "Open the Letter app",
                trigger: '.o_app[data-menu-xmlid="ssi_letter.menu_root_letter"]',
            },
            {
                content: "Open the Configuration menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_letter.menu_letter_configuration"]',
            },
            {
                content: "Open the Letter Types menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_letter.letter_type_menu"]',
            },
            {
                content: "Letter Types list is displayed",
                trigger:
                    ".o_control_panel .breadcrumb-item.active:contains(Letter Types)",
                extra_trigger: ".o_list_view",
                run: function () {
                    // Assertion only.
                },
            },

            // Flow 2 — Find and open the record to edit
            {
                content: "Open the record",
                trigger:
                    ".o_data_row:contains(TOUR Letter Type Edit) .o_data_cell:first",
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

            // Flow 3 — Change the required fields
            {
                content: "Change the Name",
                trigger: ".o_field_widget[name='name']",
                extra_trigger: ".o_form_view.o_form_editable",
                run: "text TOUR Letter Type Edited",
            },

            // Flow 5 — Click Save
            {
                content: "Save the record",
                trigger: ".o_form_button_save",
            },

            // Post-Condition — the record is updated with the new values
            {
                content: "Record is saved",
                trigger: ".o_form_view.o_form_readonly",
                run: function () {
                    // Assertion only.
                },
            },
        ]
    );

    // IK: docs/letter_type/03-delete.md
    tour.register(
        "ssi_letter_letter_type_delete",
        {
            test: true,
            url: "/web",
        },
        [
            // Flow 1 — Open the Letter > Configuration > Letter Types menu
            tour.stepUtils.showAppsMenuItem(),
            {
                content: "Open the Letter app",
                trigger: '.o_app[data-menu-xmlid="ssi_letter.menu_root_letter"]',
            },
            {
                content: "Open the Configuration menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_letter.menu_letter_configuration"]',
            },
            {
                content: "Open the Letter Types menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_letter.letter_type_menu"]',
            },
            {
                content: "Letter Types list is displayed",
                trigger:
                    ".o_control_panel .breadcrumb-item.active:contains(Letter Types)",
                extra_trigger: ".o_list_view",
                run: function () {
                    // Assertion only.
                },
            },

            // Flow 2 — Select the record to delete
            {
                content: "Select the record",
                trigger:
                    ".o_data_row:contains(TOUR Letter Type Delete) .o_list_record_selector input",
                extra_trigger: ".o_list_view",
            },

            // Flow 3 — Click Action > Delete
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

            // Flow 4 — Click OK to confirm
            {
                content: "Confirm deletion",
                trigger: ".modal-footer button.btn-primary",
                in_modal: true,
            },

            // Post-Condition — the record no longer appears in the list
            {
                content: "Record is removed from the list",
                trigger:
                    ".o_list_view:not(:has(.o_data_row:contains(TOUR Letter Type Delete)))",
                run: function () {
                    // Assertion only.
                },
            },
        ]
    );

    // IK: docs/letter_type/04-deactivate.md
    tour.register(
        "ssi_letter_letter_type_deactivate",
        {
            test: true,
            url: "/web",
        },
        [
            // Flow 1 — Open the Letter > Configuration > Letter Types menu
            tour.stepUtils.showAppsMenuItem(),
            {
                content: "Open the Letter app",
                trigger: '.o_app[data-menu-xmlid="ssi_letter.menu_root_letter"]',
            },
            {
                content: "Open the Configuration menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_letter.menu_letter_configuration"]',
            },
            {
                content: "Open the Letter Types menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_letter.letter_type_menu"]',
            },
            {
                content: "Letter Types list is displayed",
                trigger:
                    ".o_control_panel .breadcrumb-item.active:contains(Letter Types)",
                extra_trigger: ".o_list_view",
                run: function () {
                    // Assertion only.
                },
            },

            // Flow 2 — Select the record to deactivate
            {
                content: "Select the record",
                trigger:
                    ".o_data_row:contains(TOUR Letter Type Deactivate) .o_list_record_selector input",
                extra_trigger: ".o_list_view",
            },

            // Flow 3 — Click Action > Archive
            {
                content: "Open the Action menu",
                trigger: ".o_cp_action_menus button:contains(Action)",
            },
            {
                content: "Click Archive",
                trigger: ".o_cp_action_menus .o_menu_item a",
                run: function () {
                    var $archive = $(".o_cp_action_menus .o_menu_item a").filter(
                        function () {
                            return $(this).text().trim() === "Archive";
                        }
                    );
                    $archive[0].click();
                },
            },

            // Flow 4 — Click OK to confirm
            {
                content: "Confirm archiving",
                trigger: ".modal-footer button.btn-primary",
                in_modal: true,
            },

            // Post-Condition — the record no longer appears in the default list view
            {
                content: "Record is removed from the default list",
                trigger:
                    ".o_list_view:not(:has(.o_data_row:contains(TOUR Letter Type Deactivate)))",
                run: function () {
                    // Assertion only.
                },
            },
        ]
    );

    // IK: docs/letter_type/05-activate.md
    tour.register(
        "ssi_letter_letter_type_activate",
        {
            test: true,
            url: "/web",
        },
        [
            // Flow 1 — Open the Letter > Configuration > Letter Types menu
            tour.stepUtils.showAppsMenuItem(),
            {
                content: "Open the Letter app",
                trigger: '.o_app[data-menu-xmlid="ssi_letter.menu_root_letter"]',
            },
            {
                content: "Open the Configuration menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_letter.menu_letter_configuration"]',
            },
            {
                content: "Open the Letter Types menu",
                trigger:
                    '.o_menu_sections [data-menu-xmlid="ssi_letter.letter_type_menu"]',
            },
            {
                content: "Letter Types list is displayed",
                trigger:
                    ".o_control_panel .breadcrumb-item.active:contains(Letter Types)",
                extra_trigger: ".o_list_view",
                run: function () {
                    // Assertion only.
                },
            },

            // Flow 2 — Enable the Archived filter
            {
                content: "Open the Filters menu",
                trigger: ".o_search_options .o_filter_menu button",
                run: function () {
                    this.$anchor[0].click();
                },
            },
            {
                content: "Enable the Archived filter",
                trigger: ".o_filter_menu .dropdown-item:contains(Archived)",
                run: function () {
                    this.$anchor[0].click();
                },
            },
            {
                content: "Archived filter is active",
                trigger: ".o_facet_values:contains(Archived)",
                run: function () {
                    // Assertion only.
                },
            },

            // Flow 3 — Select the record to reactivate
            {
                content: "Select the record",
                trigger:
                    ".o_data_row:contains(TOUR Letter Type Activate) .o_list_record_selector input",
                extra_trigger: ".o_list_view",
            },

            // Flow 4 — Click Action > Unarchive
            // Unarchive has NO confirmation dialog (list_controller.js:490) — do not
            // wait for a modal after this click.
            {
                content: "Open the Action menu",
                trigger: ".o_cp_action_menus button:contains(Action)",
            },
            {
                content: "Click Unarchive",
                trigger: ".o_cp_action_menus .o_menu_item a",
                run: function () {
                    var $unarchive = $(".o_cp_action_menus .o_menu_item a").filter(
                        function () {
                            return $(this).text().trim() === "Unarchive";
                        }
                    );
                    $unarchive[0].click();
                },
            },

            // Post-Condition — the record is restored and appears in the default list
            {
                content: "Record is restored to the default list",
                trigger: ".o_list_view .o_data_row:contains(TOUR Letter Type Activate)",
                run: function () {
                    // Assertion only.
                },
            },
        ]
    );
});
