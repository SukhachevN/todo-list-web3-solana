use crate::*;

use anchor_spl::{
    associated_token::AssociatedToken,
    token::{approve, burn, Approve, Burn, Mint, Token, TokenAccount},
};

#[derive(Accounts)]
pub struct MintAiImageNft<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut)]
    pub todo_token_mint: Account<'info, Mint>,
    /// CHECK: manual check
    #[account(seeds = ["mint".as_bytes().as_ref()], bump)]
    pub mint_authority: UncheckedAccount<'info>,
    #[account(
        mut,
        associated_token::mint = todo_token_mint,
        associated_token::authority = user
    )]
    pub todo_token_account: Account<'info, TokenAccount>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    /// CHECK: Create this with Metaplex
    #[account(mut)]
    pub metadata: UncheckedAccount<'info>,
    /// CHECK: Create this with Metaplex
    #[account(mut)]
    pub master_edition: UncheckedAccount<'info>,
    #[account(mut)]
    pub nft_mint: Signer<'info>,
    /// CHECK: Create this with Anchor
    #[account(mut)]
    pub nft_token_account: UncheckedAccount<'info>,
    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
    /// CHECK: Metaplex check
    pub token_metadata_program: UncheckedAccount<'info>,
}

impl MintAiImageNft<'_> {
    // for testing
    const MINT_NFT_PRICE: u64 = 0;
    // for prod
    // const MINT_NFT_PRICE: u64 = 50000;

    const AI_IMAGE_NFT_SYMBOL: &'static str = "TODOAIIMG";

    pub fn process_instruction(ctx: Context<Self>, title: String, uri: String) -> Result<()> {
        approve(
            CpiContext::new(
                ctx.accounts.token_program.to_account_info(),
                Approve {
                    authority: ctx.accounts.user.to_account_info(),
                    to: ctx.accounts.todo_token_account.to_account_info(),
                    delegate: ctx.accounts.mint_authority.to_account_info(),
                },
            ),
            Self::MINT_NFT_PRICE,
        )?;

        burn(
            CpiContext::new_with_signer(
                ctx.accounts.token_program.to_account_info(),
                Burn {
                    authority: ctx.accounts.mint_authority.to_account_info(),
                    from: ctx.accounts.todo_token_account.to_account_info(),
                    mint: ctx.accounts.todo_token_mint.to_account_info(),
                },
                &[&[
                    b"mint".as_ref(),
                    &[*ctx.bumps.get("mint_authority").unwrap()],
                ]],
            ),
            Self::MINT_NFT_PRICE,
        )?;

        MintNft::process_instruction(
            Context {
                program_id: ctx.program_id,
                accounts: &mut MintNft {
                    metadata: ctx.accounts.metadata.clone(),
                    master_edition: ctx.accounts.master_edition.clone(),
                    mint: ctx.accounts.nft_mint.clone(),
                    token_account: ctx.accounts.nft_token_account.clone(),
                    mint_authority: ctx.accounts.user.clone(),
                    rent: ctx.accounts.rent.clone(),
                    system_program: ctx.accounts.system_program.clone(),
                    token_program: ctx.accounts.token_program.clone(),
                    associated_token_program: ctx.accounts.associated_token_program.clone(),
                    token_metadata_program: ctx.accounts.token_metadata_program.clone(),
                },
                bumps: ctx.bumps,
                remaining_accounts: ctx.remaining_accounts,
            },
            title,
            Self::AI_IMAGE_NFT_SYMBOL.to_string(),
            uri,
        )?;

        Ok(())
    }
}
