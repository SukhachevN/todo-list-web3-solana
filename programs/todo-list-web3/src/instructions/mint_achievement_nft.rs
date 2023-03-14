use crate::*;

use anchor_spl::{associated_token::AssociatedToken, token::Token};

#[derive(Accounts)]
pub struct MintAchievementNft<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(
        mut,
        seeds=["stats".as_bytes().as_ref(), user.key().as_ref()],
        bump,
    )]
    pub stats: Account<'info, StatsState>,
    #[account(
        init_if_needed,
        seeds=["achievements".as_bytes().as_ref(), user.key().as_ref()],
        bump,
        payer=user,
        space=std::mem::size_of::<AchievementsState>() + 8,
    )]
    pub achievements: Account<'info, AchievementsState>,
    /// CHECK: Create this with Metaplex
    #[account(mut)]
    pub metadata: UncheckedAccount<'info>,
    /// CHECK: Create this with Metaplex
    #[account(mut)]
    pub master_edition: UncheckedAccount<'info>,
    #[account(mut)]
    pub mint: Signer<'info>,
    /// CHECK: Create this with Anchor
    #[account(mut)]
    pub token_account: UncheckedAccount<'info>,
    pub rent: Sysvar<'info, Rent>,
    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub associated_token_program: Program<'info, AssociatedToken>,
    /// CHECK: Metaplex check
    pub token_metadata_program: UncheckedAccount<'info>,
}

#[derive(Clone, AnchorSerialize, AnchorDeserialize)]
pub struct MintAchievementNftParams {
    pub amount: AchievementAmount,
    pub action_type: ActionType,
}

impl MintAchievementNft<'_> {
    const ACHIEVEMENTS: &'static [AchievementInfo<'static>] = &[
        AchievementInfo {
            title: "My first todo",
            symbol: "TODOACHV",
            uri: "https://arweave.net/C0ooMLjcTAVibUIQqpmdRccfSv80olKGNvnO-RUUkkU",
            amount_to_unlock: AchievementAmount::One,
            action_type: ActionType::Create,
        },
        AchievementInfo {
            title: "TODO Beginner",
            symbol: "TODOACHV",
            uri: "https://arweave.net/UGnl05okC9AmaMKQy_2Wb17BtR8HOVHOwHMmI7KG9_g",
            amount_to_unlock: AchievementAmount::Ten,
            action_type: ActionType::Create,
        },
        AchievementInfo {
            title: "TODO Master",
            symbol: "TODOACHV",
            uri: "https://arweave.net/v3g1NpLrC4ZUp8CQgt1o5hRS7tcQE_K6QDujyJHq3IU",
            amount_to_unlock: AchievementAmount::Hundreed,
            action_type: ActionType::Create,
        },
        AchievementInfo {
            title: "TODO Legend",
            symbol: "TODOACHV",
            uri: "https://arweave.net/Dg-qhxIIHzApgEAPfej6i8Sl6e4mLi035XAChRRyRZ4",
            amount_to_unlock: AchievementAmount::Thousand,
            action_type: ActionType::Create,
        },
        AchievementInfo {
            title: "I did it!",
            symbol: "TODOACHV",
            uri: "https://arweave.net/xRZf6Hob1gfzenxXyzPFLOlKVTt8pY4HVgJqcBFvqdk",
            amount_to_unlock: AchievementAmount::One,
            action_type: ActionType::Complete,
        },
        AchievementInfo {
            title: "10/10",
            symbol: "TODOACHV",
            uri: "https://arweave.net/Vl3gfAA2wlPr8vZd9rzej1JRVQF3wV_XEMIt5Sv_BSY",
            amount_to_unlock: AchievementAmount::Ten,
            action_type: ActionType::Complete,
        },
        AchievementInfo {
            title: "Big deal!",
            symbol: "TODOACHV",
            uri: "https://arweave.net/8zsYRLNljinq4xFhXeFg7Q_9jsw4ZOEnuLd60Plp-Uc",
            amount_to_unlock: AchievementAmount::Hundreed,
            action_type: ActionType::Complete,
        },
        AchievementInfo {
            title: "Nothing is impossible",
            symbol: "TODOACHV",
            uri: "https://arweave.net/rkonFvUFLsHyertdH4V2BBfiXjnM_8_7d0mjhc8IQ3I",
            amount_to_unlock: AchievementAmount::Thousand,
            action_type: ActionType::Complete,
        },
        AchievementInfo {
            title: "Delete me!",
            symbol: "TODOACHV",
            uri: "https://arweave.net/atJN3qA5dgGQ11Y7OHeFL-_EjlPL_GmZ-pn-SOv7tdY",
            amount_to_unlock: AchievementAmount::One,
            action_type: ActionType::Delete,
        },
        AchievementInfo {
            title: "Why you create us?",
            symbol: "TODOACHV",
            uri: "https://arweave.net/gKIAslQhOSSbYv6p-VqRIa-C9QkFQWHSqCExK-HPeXc",
            amount_to_unlock: AchievementAmount::Ten,
            action_type: ActionType::Delete,
        },
        AchievementInfo {
            title: "TODO destroyer",
            symbol: "TODOACHV",
            uri: "https://arweave.net/65ZgeUcCA8n49hvvhDzyJ1gtwsRiBf9k7gTQfknI4W0",
            amount_to_unlock: AchievementAmount::Hundreed,
            action_type: ActionType::Delete,
        },
        AchievementInfo {
            title: "TODO Annihilator",
            symbol: "TODOACHV",
            uri: "https://arweave.net/hklxV78SZ_jsutT8Dw41oyy2J-8TS3a8iqRoqwbuYmg",
            amount_to_unlock: AchievementAmount::Thousand,
            action_type: ActionType::Delete,
        },
    ];

    pub fn process_instruction(ctx: Context<Self>, params: MintAchievementNftParams) -> Result<()> {
        let achievement = Self::ACHIEVEMENTS
            .iter()
            .find(|achievement| {
                achievement.amount_to_unlock == params.amount
                    && achievement.action_type == params.action_type
            })
            .unwrap();

        let achievements = &mut ctx.accounts.achievements;

        let stats = &mut ctx.accounts.stats;

        let amount = &params.amount;
        let action_type = &params.action_type;

        let achievement_mint = match action_type {
            ActionType::Create => match amount {
                AchievementAmount::One => achievements.create_one_todo,
                AchievementAmount::Ten => achievements.create_ten_todos,
                AchievementAmount::Hundreed => achievements.create_hundreed_todos,
                AchievementAmount::Thousand => achievements.create_thousand_todos,
            },
            ActionType::Complete => match amount {
                AchievementAmount::One => achievements.complete_one_todo,
                AchievementAmount::Ten => achievements.complete_ten_todos,
                AchievementAmount::Hundreed => achievements.complete_hundreed_todos,
                AchievementAmount::Thousand => achievements.complete_thousand_todos,
            },
            ActionType::Delete => match amount {
                AchievementAmount::One => achievements.delete_one_todo,
                AchievementAmount::Ten => achievements.delete_ten_todos,
                AchievementAmount::Hundreed => achievements.delete_hundreed_todos,
                AchievementAmount::Thousand => achievements.delete_thousand_todos,
            },
        };

        require!(
            achievement_mint.eq(&Pubkey::default()),
            AchiementError::AlreadyUnlocked
        );

        match params.action_type {
            ActionType::Create => {
                require!(
                    stats.created >= *amount as u64,
                    AchiementError::NotEnoughCreated
                );
            }
            ActionType::Complete => {
                require!(
                    stats.completed >= *amount as u64,
                    AchiementError::NotEnoughCompleted
                );
            }
            ActionType::Delete => {
                require!(
                    stats.deleted >= *amount as u64,
                    AchiementError::NotEnoughDeleted
                );
            }
        };

        MintNft::process_instruction(
            Context {
                program_id: ctx.program_id,
                accounts: &mut MintNft {
                    metadata: ctx.accounts.metadata.clone(),
                    master_edition: ctx.accounts.master_edition.clone(),
                    mint: ctx.accounts.mint.clone(),
                    token_account: ctx.accounts.token_account.clone(),
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
            achievement.title.to_string(),
            achievement.symbol.to_string(),
            achievement.uri.to_string(),
        )?;

        let mint = ctx.accounts.mint.key();

        match params.action_type {
            ActionType::Create => match amount {
                AchievementAmount::One => achievements.create_one_todo = mint,
                AchievementAmount::Ten => achievements.create_ten_todos = mint,
                AchievementAmount::Hundreed => achievements.create_hundreed_todos = mint,
                AchievementAmount::Thousand => achievements.create_thousand_todos = mint,
            },
            ActionType::Complete => match amount {
                AchievementAmount::One => achievements.complete_one_todo = mint,
                AchievementAmount::Ten => achievements.complete_ten_todos = mint,
                AchievementAmount::Hundreed => achievements.complete_hundreed_todos = mint,
                AchievementAmount::Thousand => achievements.complete_thousand_todos = mint,
            },
            ActionType::Delete => match amount {
                AchievementAmount::One => achievements.delete_one_todo = mint,
                AchievementAmount::Ten => achievements.delete_ten_todos = mint,
                AchievementAmount::Hundreed => achievements.delete_hundreed_todos = mint,
                AchievementAmount::Thousand => achievements.delete_thousand_todos = mint,
            },
        };

        Ok(())
    }
}
