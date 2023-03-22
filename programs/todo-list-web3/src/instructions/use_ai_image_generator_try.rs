use crate::*;

#[derive(Accounts)]
pub struct UseAiImageGeneratorTry<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(
        mut, 
        seeds=["ai_image_generator_counter".as_bytes().as_ref(), user.key().as_ref()],
        bump
    )]
    pub ai_image_generator_counter: Account<'info, AiImageGeneratingCounterState>,
}

impl UseAiImageGeneratorTry<'_> {
    pub fn process_instruction(ctx: Context<Self>) -> Result<()> {
        let counter = &mut ctx.accounts.ai_image_generator_counter;

        require!(counter.try_count > 0, AiImageGeneratorCounterError::NotEnoughTries);

        counter.try_count -= 1;

        Ok(())
    }
}

