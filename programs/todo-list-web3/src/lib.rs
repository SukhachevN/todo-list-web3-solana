use anchor_lang::prelude::*;

pub mod instructions;
pub mod state;

use instructions::*;
use state::*;

declare_id!("HzCzKDJ3gadVz1BGNgryn2GVae5z76XgH1DuKikXE7sM");

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
}
