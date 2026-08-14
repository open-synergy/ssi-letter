# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

# HttpSavepointCase — BUKAN HttpCase. 14.0's HttpCase has no cls.env in
# setUpClass (see odoo-development-ui-test skill, structure-and-runner.md).
from odoo.tests import HttpSavepointCase, tagged


@tagged("post_install", "-at_install")
class TestUiInternalMemoType(HttpSavepointCase):
    """Tour tests for the ``internal_memo_type`` work instructions."""

    @classmethod
    def setUpClass(cls):
        """Create the ``internal_memo_type`` records the tours edit/toggle.

        The ``internal_memo_type_group`` group already grants
        ``base.user_admin`` membership by default (see
        ``security/res_groups/internal_memo_type.xml``), so no extra group
        setup is required for the ``admin`` user running these tours.
        """
        super().setUpClass()
        Type = cls.env["internal_memo_type"]
        cls.type_edit = Type.create(
            {"name": "TOUR Internal Memo Type Edit", "code": "/"}
        )
        cls.type_delete = Type.create(
            {"name": "TOUR Internal Memo Type Delete", "code": "/"}
        )
        cls.type_deactivate = Type.create(
            {"name": "TOUR Internal Memo Type Deactivate", "code": "/"}
        )
        cls.type_activate = Type.create(
            {
                "name": "TOUR Internal Memo Type Activate",
                "code": "/",
                "active": False,
            }
        )

    def test_create(self):
        """Run the create tour for ``internal_memo_type``.

        IK: docs/internal_memo_type/01-create.md
        """
        self.start_tour("/web", "ssi_letter_internal_memo_type_create", login="admin")

    def test_edit(self):
        """Run the edit tour for ``internal_memo_type``.

        IK: docs/internal_memo_type/02-edit.md
        """
        self.start_tour("/web", "ssi_letter_internal_memo_type_edit", login="admin")

    def test_delete(self):
        """Run the delete tour for ``internal_memo_type``.

        IK: docs/internal_memo_type/03-delete.md
        """
        self.start_tour("/web", "ssi_letter_internal_memo_type_delete", login="admin")

    def test_deactivate(self):
        """Run the deactivate tour for ``internal_memo_type``.

        IK: docs/internal_memo_type/04-deactivate.md
        """
        self.start_tour(
            "/web", "ssi_letter_internal_memo_type_deactivate", login="admin"
        )

    def test_activate(self):
        """Run the activate tour for ``internal_memo_type``.

        IK: docs/internal_memo_type/05-activate.md
        """
        self.start_tour("/web", "ssi_letter_internal_memo_type_activate", login="admin")
