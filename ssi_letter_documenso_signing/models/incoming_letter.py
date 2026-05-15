# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl-3.0-standalone.html).

from odoo import models


class IncomingLetter(models.Model):
    _name = "incoming_letter"
    _inherit = [
        "incoming_letter",
        "mixin.documenso_signing_approval",
    ]

    _documenso_signing_create_page = True
