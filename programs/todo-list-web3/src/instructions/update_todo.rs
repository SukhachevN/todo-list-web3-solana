use crate::*;

use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::{mint_to, Mint, MintTo, Token, TokenAccount};

#[derive(Accounts)]
#[instruction(params: UpdateTodoParams)]
pub struct UpdateTodo<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(
        mut, 
        seeds=[params.title.as_ref(), user.key().as_ref()], 
        bump, 
        realloc = 32 + 4 + params.title.len() + 4 + params.description.len() + 8 + 1 + 8 + 8 + 8,
        realloc::payer=user, 
        realloc::zero= false,
    )]
    pub todo: Account<'info, TodoState>,
    #[account(
        mut,
        seeds=["stats".as_bytes().as_ref(), user.key().as_ref()],
        bump,
    )]
    pub stats: Account<'info, StatsState>,
    #[account(mut)]
    pub mint: Account<'info, Mint>,
    /// CHECK: manual check
    #[account(seeds = ["mint".as_bytes().as_ref()], bump)]
    pub mint_authority: UncheckedAccount<'info>,
    #[account(
        mut,
        associated_token::mint = mint,
        associated_token::authority = user
    )]
    pub token_account: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}

#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct UpdateTodoParams {
    pub title: String,
    pub description: String,
    pub deadline: i64,
    pub is_completed: bool,
}

impl UpdateTodo<'_> {
    pub fn process_instruction(ctx: Context<UpdateTodo>, params: UpdateTodoParams) -> Result<()> {
        let clock = Clock::get()?;
        let todo = &mut ctx.accounts.todo;
        let stats = &mut ctx.accounts.stats;

        if params.is_completed {
            if todo.complete_date == 0 {
                stats.completed += 1;

                mint_to(
                    CpiContext::new_with_signer(
                        ctx.accounts.token_program.to_account_info(),
                        MintTo {
                            authority: ctx.accounts.mint_authority.to_account_info(),
                            to: ctx.accounts.token_account.to_account_info(),
                            mint: ctx.accounts.mint.to_account_info(),
                        },
                        &[&[
                            b"mint".as_ref(),
                            &[*ctx.bumps.get("mint_authority").unwrap()],
                        ]],
                    ),
                    COMPLETE_TODO_REWARD,
                )?;
            }
            
            todo.complete_date = clock.unix_timestamp * MS_IN_ONE_SECOND;
        }

        todo.description = params.description;
        todo.deadline = params.deadline;
        todo.is_completed = params.is_completed;

        Ok(())
    }
}
