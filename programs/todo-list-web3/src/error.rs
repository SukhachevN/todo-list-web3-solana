use crate::*;

#[error_code]
pub enum AchievementError {
    #[msg("Achievement already unlocked!")]
    AlreadyUnlocked,

    #[msg("Not enough todos created to unlock achievement")]
    NotEnoughCreated,

    #[msg("Not enough todos completed to unlock achievement")]
    NotEnoughCompleted,

    #[msg("Not enough todos deleted to unlock achievement")]
    NotEnoughDeleted,
}

#[error_code]
pub enum AiImageGeneratorCounterError {
    #[msg("Cant buy negative try amount")]
    NegativeTryAmount,

    #[msg("Dont have enough tries, buy more")]
    NotEnoughTries,
}
