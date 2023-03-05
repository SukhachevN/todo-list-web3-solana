use crate::*;

use anchor_spl::token::{mint_to, MintTo, Mint, TokenAccount, Token};
use anchor_spl::associated_token::AssociatedToken;

#[derive(Accounts)]
#[instruction(params: CreateTodoParams)]
pub struct CreateTodo<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(
        init, 
        seeds=[params.title.as_ref(), user.key().as_ref()], 
        bump, 
        payer=user, 
        space = 32 + 4 + params.title.len() + 4 + params.description.len() + 8 + 1 + 8 + 8 + 8
    )]
    pub todo: Account<'info, TodoState>,
    #[account(
        init_if_needed,
        seeds=["stats".as_bytes().as_ref(), user.key().as_ref()],
        bump,
        payer=user,
        space=std::mem::size_of::<StatsState>() + 8,
    )]
    pub stats: Account<'info, StatsState>,
    #[account(mut)]
    pub mint: Account<'info, Mint>,
    /// CHECK: manual check
    #[account(seeds = ["mint".as_bytes().as_ref()], bump)]
    pub mint_authority: UncheckedAccount<'info>,
    #[account(
        init_if_needed,
        payer = user,
        associated_token::mint = mint,
        associated_token::authority = user
    )]
    pub token_account: Box<Account<'info, TokenAccount>>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    pub system_program: Program<'info, System>,
}

#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct CreateTodoParams {
    pub title: String,
    pub description: String,
    pub deadline: i64,
}

impl CreateTodo<'_> {
    pub fn process_instruction(ctx: Context<Self>, params: CreateTodoParams) -> Result<()> {
        let clock = Clock::get()?;

        let todo = &mut ctx.accounts.todo;

        todo.user = ctx.accounts.user.key();
        todo.title = params.title;
        todo.description = params.description;
        todo.deadline = params.deadline;
        todo.is_completed = false;
        todo.create_date = clock.unix_timestamp * 1000;

        let stats = &mut ctx.accounts.stats;

        stats.created += 1;

        mint_to(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                MintTo { 
                    authority: ctx.accounts.mint_authority.to_account_info(), 
                    to: ctx.accounts.token_account.to_account_info(),
                    mint: ctx.accounts.mint.to_account_info()
                },
                &[&[
                    b"mint".as_ref(),
                    &[*ctx.bumps.get("mint_authority").unwrap()],
                ]],
            ),
            5000
        )?;

        Ok(())
    }
}
