use crate::*;

#[derive(Accounts)]
pub struct InitAiImageGeneratorCounter<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(
        init, 
        seeds=["ai_image_generator_counter".as_bytes().as_ref(), user.key().as_ref()],
        bump,
        payer=user,
        space=std::mem::size_of::<AIImageGeneratingCounterState>() + 8
    )]
    pub ai_image_generator_counter: Account<'info, AIImageGeneratingCounterState>,
    pub system_program: Program<'info, System>,
}

impl InitAiImageGeneratorCounter<'_> {
    pub fn process_instruction(ctx: Context<Self>) -> Result<()> {
        let counter = &mut ctx.accounts.ai_image_generator_counter;

        counter.try_count = 1;

        Ok(())
    }
}
