use crate::*;

#[account]
pub struct StatsState {
    pub created: u64,   // 8
    pub completed: u64, // 8
    pub deleted: u64,   // 8
}

#[account]
pub struct TodoState {
    pub user: Pubkey,        // 32
    pub title: String,       // 4 + len()
    pub description: String, // 4 + len()
    pub deadline: i64,       // 8
    pub is_completed: bool,  // 1
    pub create_date: i64,    // 8
    pub complete_date: i64,  // 8
}
