CREATE TABLE IF NOT EXISTS approvals (
  id TEXT PRIMARY KEY,
  monday_item_id INTEGER NOT NULL,
  monday_board_id INTEGER NOT NULL,
  monday_account_id INTEGER NOT NULL,
  requester_id INTEGER NOT NULL,
  requester_name TEXT NOT NULL,
  approver_id INTEGER NOT NULL,
  approver_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  requester_note TEXT,
  approver_note TEXT,
  status_column_id TEXT,
  requested_at TEXT NOT NULL,
  resolved_at TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_approvals_item ON approvals(monday_item_id);
CREATE INDEX IF NOT EXISTS idx_approvals_approver_status ON approvals(approver_id, status);
CREATE INDEX IF NOT EXISTS idx_approvals_board ON approvals(monday_board_id);

CREATE TABLE IF NOT EXISTS audit_log (
  id TEXT PRIMARY KEY,
  approval_id TEXT NOT NULL REFERENCES approvals(id),
  action TEXT NOT NULL,
  actor_id INTEGER NOT NULL,
  actor_name TEXT NOT NULL,
  note TEXT,
  timestamp TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_audit_approval ON audit_log(approval_id);
CREATE INDEX IF NOT EXISTS idx_audit_timestamp ON audit_log(timestamp);

CREATE TABLE IF NOT EXISTS board_configs (
  id TEXT PRIMARY KEY,
  monday_board_id INTEGER NOT NULL UNIQUE,
  monday_account_id INTEGER NOT NULL,
  status_column_id TEXT,
  default_approver_column TEXT,
  reminder_hours INTEGER DEFAULT 24,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_board_configs_account ON board_configs(monday_account_id);
CREATE INDEX IF NOT EXISTS idx_board_configs_board ON board_configs(monday_board_id);