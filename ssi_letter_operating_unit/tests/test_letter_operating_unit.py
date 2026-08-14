# Copyright 2024 OpenSynergy Indonesia
# Copyright 2024 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo_yaml_test import YamlTransactionCase

from odoo.tests import tagged


@tagged("post_install", "-at_install")
class TestLetterOperatingUnit(YamlTransactionCase):
    """Test Operating Unit support on letter and memo documents.

    Covers ``outgoing_letter``, ``incoming_letter``, and
    ``internal_memo`` records created by
    ``ssi_letter_operating_unit``, asserting each carries an
    operating unit after creation.
    """

    def test_letter_operating_unit(self):
        """Run the Operating Unit scenarios for letter documents."""
        self.run_yaml_scenario("test_data_letter_operating_unit.yaml")
