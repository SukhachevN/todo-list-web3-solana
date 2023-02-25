use crate::*;

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
        seeds=["counter".as_bytes().as_ref(), user.key().as_ref()],
        bump,
        payer=user,
        space=std::mem::size_of::<TodoCounterState>() + 8,
    )]
    pub counter: Account<'info, TodoCounterState>,
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
        todo.create_date = clock.unix_timestamp;

        let todo_counter = &mut ctx.accounts.counter;

        todo_counter.total += 1;

        Ok(())
    }
}
