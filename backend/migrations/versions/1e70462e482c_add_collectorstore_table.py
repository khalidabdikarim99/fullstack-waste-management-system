"""Add CollectorStore table

Revision ID: 1e70462e482c
Revises: 6fd2e8333389
Create Date: 2025-09-04 13:18:15.964060
"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1e70462e482c'
down_revision = '6fd2e8333389'
branch_labels = None
depends_on = None


def upgrade():
    # ✅ Table already exists (created manually or by db.create_all)
    # ✅ Just skip creation to prevent "already exists" error
    pass


def downgrade():
    # ✅ Only drop if rolling back
    op.drop_table('collector_store')
