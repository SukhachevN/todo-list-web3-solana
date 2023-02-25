use crate::*;

#[derive(Accounts)]
#[instruction(params: UpdateTodoParams)]
pub struct UpdateTodo<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(
        mut, 
        seeds=[params.title.as_ref(), user.key().as_ref()], 
        bump, 
        realloc = 32 + 4 + params.title.len() + 4 + params.description.len() + 8 + 1 + 8 + 8 + 8,
        realloc::payer=user, 
        realloc::zero= false,
    )]
    pub todo: Account<'info, TodoState>,
    #[account(
        mut,
        seeds=["counter".as_bytes().as_ref(), user.key().as_ref()],
        bump,
    )]
    pub counter: Account<'info, TodoCounterState>,
    pub system_program: Program<'info, System>,
}

#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct UpdateTodoParams {
    pub title: String,
    pub description: String,
    pub deadline: i64,
    pub is_completed: bool,
}

impl UpdateTodo<'_> {
    pub fn process_instruction(ctx: Context<UpdateTodo>, params: UpdateTodoParams) -> Result<()> {
        let clock = Clock::get()?;
        let todo = &mut ctx.accounts.todo;
        let counter = &mut ctx.accounts.counter;

        if !todo.is_completed && params.is_completed {
            counter.completed += 1;
            todo.complete_date = clock.unix_timestamp;
        } else if todo.is_completed && !params.is_completed {
            counter.completed -= 1;
            todo.complete_date = 0;
        }

        todo.description = params.description;
        todo.deadline = params.deadline;

        Ok(())
    }
}
