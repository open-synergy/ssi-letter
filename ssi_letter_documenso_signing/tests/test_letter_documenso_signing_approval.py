# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl-3.0-standalone.html).

from odoo_yaml_test import YamlTransactionCase

from odoo.tests import tagged


@tagged("post_install", "-at_install")
class TestLetterDocumensoSigningApproval(YamlTransactionCase):
    """Test the Documenso signing approval glue for ssi_letter models.

    Covers ``outgoing_letter``, ``incoming_letter``, and
    ``internal_memo``: each exposes ``approval_signature_request_id``
    (falsy without an active signature request), and no signature
    request is created when the approval template has no Documenso
    signing template configured.
    """

    def test_letter_documenso_signing_approval(self):
        """Run the Documenso signing approval scenario for all three models."""
        self.run_yaml_scenario("test_data_letter_documenso_signing_approval.yaml")
