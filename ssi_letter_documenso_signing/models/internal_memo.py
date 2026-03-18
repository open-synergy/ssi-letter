# Copyright 2026 OpenSynergy Indonesia
# Copyright 2026 PT. Simetri Sinergi Indonesia
# License AGPL-3.0 or later (http://www.gnu.org/licenses/agpl-3.0-standalone.html).

from odoo import models


class InternalMemo(models.Model):
    _name = "internal_memo"
    _inherit = [
        "internal_memo",
        "mixin.documenso_signing",
    ]

    _documenso_signing_create_page = True
