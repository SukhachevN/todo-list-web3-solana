use crate::*;

#[derive(Accounts)]
pub struct InitAiImageGenerator<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(
        init, 
        seeds=["ai_image_generator_counter".as_bytes().as_ref(), user.key().as_ref()],
        bump,
        payer=user,
        space=std::mem::size_of::<AiImageGeneratingCounterState>() + 8
    )]
    pub ai_image_generator_counter: Account<'info, AiImageGeneratingCounterState>,
    #[account(
        init,
        seeds=["saved_ai_image".as_bytes().as_ref(), user.key().as_ref()],
        bump,
        space = std::mem::size_of::<SavedAiImageState>() + 8,
        payer=user, 
    )]
    pub saved_ai_image: Account<'info, SavedAiImageState>,
    pub system_program: Program<'info, System>,
}

impl InitAiImageGenerator<'_> {
    pub fn process_instruction(ctx: Context<Self>) -> Result<()> {
        let counter = &mut ctx.accounts.ai_image_generator_counter;

        counter.try_count = 1;

        Ok(())
    }
}
