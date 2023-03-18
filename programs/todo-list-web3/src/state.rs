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

#[account]
pub struct AchievementsState {
    pub create_one_todo: Pubkey,         // 32
    pub complete_one_todo: Pubkey,       // 32
    pub delete_one_todo: Pubkey,         // 32
    pub create_ten_todos: Pubkey,        // 32
    pub complete_ten_todos: Pubkey,      // 32
    pub delete_ten_todos: Pubkey,        // 32
    pub create_hundreed_todos: Pubkey,   // 32
    pub complete_hundreed_todos: Pubkey, // 32
    pub delete_hundreed_todos: Pubkey,   // 32
    pub create_thousand_todos: Pubkey,   // 32
    pub complete_thousand_todos: Pubkey, // 32
    pub delete_thousand_todos: Pubkey,   // 32
}

#[account]
pub struct AIImageGeneratingCounterState {
    pub try_count: u32, // 4
}
pub const MS_IN_ONE_SECOND: i64 = 1000;
pub const CREATE_TODO_REWARD: u64 = 5000;
pub const COMPLETE_TODO_REWARD: u64 = 10000;

pub struct AchievementInfo<'a> {
    pub title: &'a str,
    pub symbol: &'a str,
    pub uri: &'a str,
    pub amount_to_unlock: AchievementAmount,
    pub action_type: ActionType,
}

#[derive(Debug, PartialEq, AnchorDeserialize, AnchorSerialize, Clone)]
pub enum ActionType {
    Create,
    Complete,
    Delete,
}

#[derive(Debug, PartialEq, AnchorDeserialize, AnchorSerialize, Clone, Copy)]
pub enum AchievementAmount {
    One = 1,
    Ten = 10,
    Hundreed = 100,
    Thousand = 1000,
}

#[error_code]
pub enum AchiementError {
    #[msg("Achievement already unlocked!")]
    AlreadyUnlocked,
    #[msg("Not enough todos created to unlock achievement")]
    NotEnoughCreated,
    #[msg("Not enough todos completed to unlock achievement")]
    NotEnoughCompleted,
    #[msg("Not enough todos deleted to unlock achievement")]
    NotEnoughDeleted,
}
