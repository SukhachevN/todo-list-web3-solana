use crate::*;

#[derive(Accounts)]
pub struct DeleteTodo<'info> {
    #[account(mut)]
    user: Signer<'info>,
    #[account(mut, close = user, has_one = user)]
    todo: Account<'info, TodoState>,
    #[account(
        mut,
        seeds=["counter".as_bytes().as_ref(), user.key().as_ref()],
        bump,
    )]
    pub counter: Account<'info, TodoCounterState>,
}

impl DeleteTodo<'_> {
    pub fn process_instruction(ctx: Context<DeleteTodo>) -> Result<()> {
        let todo = &ctx.accounts.todo;
        let counter = &mut ctx.accounts.counter;

        if todo.is_completed {
            counter.completed -= 1;
        }

        counter.total -= 1;

        Ok(())
    }
}
