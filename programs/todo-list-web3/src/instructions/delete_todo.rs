use crate::*;

use anchor_spl::associated_token::AssociatedToken;
use anchor_spl::token::{approve, burn, Approve, Burn, Mint, Token, TokenAccount};

#[derive(Accounts)]
pub struct DeleteTodo<'info> {
    #[account(mut)]
    user: Signer<'info>,
    #[account(mut, close = user, has_one = user)]
    todo: Account<'info, TodoState>,
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

impl DeleteTodo<'_> {
    pub fn process_instruction(ctx: Context<DeleteTodo>) -> Result<()> {
        let stats = &mut ctx.accounts.stats;

        stats.deleted += 1;

        let burn_amount = if ctx.accounts.todo.complete_date == 0 {
            CREATE_TODO_REWARD
        } else {
            CREATE_TODO_REWARD + COMPLETE_TODO_REWARD
        };

        approve(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Approve {
                    authority: ctx.accounts.user.to_account_info(),
                    to: ctx.accounts.token_account.to_account_info(),
                    delegate: ctx.accounts.mint_authority.to_account_info(),
                },
            ),
            burn_amount,
        )?;

        burn(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                Burn {
                    authority: ctx.accounts.mint_authority.to_account_info(),
                    from: ctx.accounts.token_account.to_account_info(),
                    mint: ctx.accounts.mint.to_account_info(),
                },
                &[&[
                    b"mint".as_ref(),
                    &[*ctx.bumps.get("mint_authority").unwrap()],
                ]],
            ),
            burn_amount,
        )?;

        Ok(())
    }
}
