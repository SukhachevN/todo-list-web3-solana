use anchor_spl::{token::{Mint, TokenAccount, Token, approve, Approve, burn, Burn}, associated_token::AssociatedToken};

use crate::*;

#[derive(Accounts)]
pub struct BuyAiImageGeneratorTry<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(
        mut, 
        seeds=["ai_image_generator_counter".as_bytes().as_ref(), user.key().as_ref()],
        bump
    )]
    pub ai_image_generator_counter: Account<'info, AIImageGeneratingCounterState>,
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
}

impl BuyAiImageGeneratorTry<'_> {
    const GENERATE_IMAGE_PRICE: u64 = 100000;

    pub fn process_instruction(ctx: Context<Self>, amount: u32) -> Result<()> {

        require!(amount > 0, AiImageGeneratorCounterError::NegativeTryAmount);


        // for testing
        let burn_amount = 0;
        // for prod
        // let burn_amount = amount as u64 * Self::GENERATE_IMAGE_PRICE;

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

        let counter = &mut ctx.accounts.ai_image_generator_counter;

        counter.try_count += amount;

        Ok(())
    }
}
