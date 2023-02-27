use crate::*;

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
}

impl DeleteTodo<'_> {
    pub fn process_instruction(ctx: Context<DeleteTodo>) -> Result<()> {
        let stats = &mut ctx.accounts.stats;

        stats.deleted += 1;

        Ok(())
    }
}
