use anchor_lang::prelude::*;

pub mod error;
pub mod instructions;
pub mod state;

use error::*;
use instructions::*;
use state::*;

declare_id!("CTAZ3XiKohcVEfDDiCgBkiVLnMHF7zDg9wuLXkP2uDwv");

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

    pub fn init_ai_image_generator_counter(
        ctx: Context<InitAiImageGeneratorCounter>,
    ) -> Result<()> {
        InitAiImageGeneratorCounter::process_instruction(ctx)
    }

    pub fn buy_ai_image_generator_try(
        ctx: Context<BuyAiImageGeneratorTry>,
        amount: u32,
    ) -> Result<()> {
        BuyAiImageGeneratorTry::process_instruction(ctx, amount)
    }

    pub fn use_ai_image_generator_try(ctx: Context<UseAiImageGeneratorTry>) -> Result<()> {
        UseAiImageGeneratorTry::process_instruction(ctx)
    }

    pub fn mint_ai_image_nft(
        ctx: Context<MintAiImageNft>,
        title: String,
        uri: String,
    ) -> Result<()> {
        MintAiImageNft::process_instruction(ctx, title, uri)
    }
}
