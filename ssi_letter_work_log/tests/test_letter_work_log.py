# Copyright 2024 OpenSynergy Indonesia
# Copyright 2024 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo_yaml_test import YamlTransactionCase

from odoo.tests import tagged


@tagged("post_install", "-at_install")
class TestLetterWorkLog(YamlTransactionCase):
    """
    Test work log field exposure on incoming/outgoing letter and memo.

    Covers ``outgoing_letter``, ``incoming_letter``, and
    ``internal_memo``, asserting each exposes an empty
    ``work_log_ids`` field by default after creation.
    """

    def test_letter_work_log(self):
        """Run the work log scenarios for letter and memo documents."""
        self.run_yaml_scenario("test_data_letter_work_log.yaml")
