use anchor_lang::prelude::*;

pub mod instructions;
pub mod state;

use instructions::*;
use state::*;

declare_id!("9MJCUr9Uoj3o75yiDrNLxsknWuwkbisGobyH3Effi186");

#[program]
pub mod todo_list_web3 {
    use super::*;

    pub fn create_todo(ctx: Context<CreateTodo>, params: CreateTodoParams) -> Result<()> {
        CreateTodo::process_instruction(ctx, params)
    }

    pub fn update_todo(ctx: Context<UpdateTodo>, params: UpdateTodoParams) -> Result<()> {
        UpdateTodo::process_instruction(ctx, params)
    }

    pub fn delete_todo(ctx: Context<DeleteTodo>) -> Result<()> {
        DeleteTodo::process_instruction(ctx)
    }

    pub fn mint_achievement_nft(
        ctx: Context<MintAchievementNft>,
        params: MintAchievementNftParams,
    ) -> Result<()> {
        MintAchievementNft::process_instruction(ctx, params)
    }
}
