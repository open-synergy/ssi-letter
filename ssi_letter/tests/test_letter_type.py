# Copyright 2023 OpenSynergy Indonesia
# Copyright 2023 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo_yaml_test import YamlTransactionCase

from odoo.tests import tagged


@tagged("post_install", "-at_install")
class TestLetterType(YamlTransactionCase):
    """Test creation of ``letter_type`` and ``internal_memo_type``."""

    def test_letter_type(self):
        """Run the letter type and internal memo type creation scenario."""
        self.run_yaml_scenario("test_data_letter_type.yaml")
