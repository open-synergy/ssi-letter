# Copyright 2023 OpenSynergy Indonesia
# Copyright 2023 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl).

from odoo_yaml_test import YamlTransactionCase

from odoo.tests import tagged


@tagged("post_install", "-at_install")
class TestInternalMemo(YamlTransactionCase):
    def test_internal_memo(self):
        self.run_yaml_scenario("test_data_internal_memo.yaml")
