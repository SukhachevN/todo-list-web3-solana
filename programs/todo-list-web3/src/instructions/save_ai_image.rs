use crate::*;

#[derive(Accounts)]
#[instruction(uri: String)]
pub struct SaveAiImage<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(
        mut, 
        seeds=["saved_ai_image".as_bytes().as_ref(), user.key().as_ref()],
        bump,
        realloc = 4 + uri.len() + 32 + 8,
        realloc::payer=user, 
        realloc::zero= false,
    )]
    pub saved_ai_image: Account<'info, SavedAiImageState>,
    pub system_program: Program<'info, System>,
}

impl SaveAiImage<'_> {
    pub fn process_instruction(ctx: Context<Self>, uri: String) -> Result<()> {
        let saved_ai_image = &mut ctx.accounts.saved_ai_image;

        saved_ai_image.uri = uri;

        Ok(())
    }
}