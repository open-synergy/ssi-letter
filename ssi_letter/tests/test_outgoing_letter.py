# Copyright 2023 OpenSynergy Indonesia
# Copyright 2023 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo_yaml_test import YamlTransactionCase

from odoo.tests import tagged


@tagged("post_install", "-at_install")
class TestOutgoingLetter(YamlTransactionCase):
    """Test the ``outgoing_letter`` confirm/approve/open/done workflow."""

    def test_outgoing_letter(self):
        """Run the full workflow and restart-from-confirm scenarios."""
        self.run_yaml_scenario("test_data_outgoing_letter.yaml")
