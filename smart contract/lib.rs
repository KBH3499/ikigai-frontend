use anchor_lang::prelude::*;
use anchor_spl::token::{self, Transfer};
use anchor_spl::token_interface::{Mint, TokenAccount, TokenInterface};

declare_id!("62R5JWWDzuYqyPGyp7otGbj5eD1Na7Tj5HX74tFBYkKh");

#[program]
pub mod solana_staking_blog {
    use super::*;

    pub fn initialize_admin(ctx: Context<InitializeAdmin>) -> Result<()> {
        msg!("Instruction: InitializeAdmin");

        let admin_pda = &mut ctx.accounts.admin_pda;
        let clock = Clock::get()?;

        admin_pda.start_slot = clock.slot;
        admin_pda.staking_token = ctx.accounts.staking_token.key();
        admin_pda.total_staked_amount = 0;
        admin_pda.total_rewarded_amount = 0;
        admin_pda.total_holders = 0;
        admin_pda.bump = ctx.bumps.admin_pda;

        Ok(())
    }

    pub fn initialize_user_info(
        ctx: Context<InitializeUserInfo>,
        pda_seed: u16,
        amount: u64,
        duration: u64,
    ) -> Result<()> {
        msg!("Instruction: InitializeUserInfo");

        let admin_pda = &mut ctx.accounts.admin_pda;
        let user_info = &mut ctx.accounts.user_info;
        let user_child_info = &mut ctx.accounts.user_child_info;
        let clock = Clock::get()?;

        let cpi_accounts = Transfer {
            from: ctx.accounts.user_staking_wallet.to_account_info(),
            to: ctx.accounts.admin_staking_wallet.to_account_info(),
            authority: ctx.accounts.user.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::transfer(cpi_ctx, amount)?;

        user_info.total_staked_amount += amount;
        user_info.total_rewarded_amount = 0;
        user_info.staking_count = 1;
        user_info.staking_seeds[0] = pda_seed;
        user_info.deposit_slot = clock.slot;
        user_info.bump = ctx.bumps.user_info;

        user_child_info.amount = amount;
        user_child_info.reward_debt = 0;
        user_child_info.deposit_slot = clock.slot;
        user_child_info.withdraw_slot = 0;
        user_child_info.duration = duration;
        user_child_info.bump = ctx.bumps.user_child_info;

        admin_pda.total_staked_amount += amount;
        admin_pda.total_holders += 1;

        Ok(())
    }

    pub fn stake_user_child_info(
        ctx: Context<StakeUserChildInfo>,
        pda_seed: u16,
        amount: u64,
        duration: u64,
    ) -> Result<()> {
        msg!("Instruction: Stake");

        let admin_pda = &mut ctx.accounts.admin_pda;
        let user_info = &mut ctx.accounts.user_info;
        let user_child_info = &mut ctx.accounts.user_child_info;
        let clock = Clock::get()?;

        let cpi_accounts = Transfer {
            from: ctx.accounts.user_staking_wallet.to_account_info(),
            to: ctx.accounts.admin_staking_wallet.to_account_info(),
            authority: ctx.accounts.user.to_account_info(),
        };
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        token::transfer(cpi_ctx, amount)?;

        user_info.total_staked_amount += amount;
        user_info.staking_count += 1;
        let staking_index = (user_info.staking_count - 1) as usize;
        user_info.staking_seeds[staking_index] = pda_seed;

        user_child_info.amount = amount;
        user_child_info.reward_debt = 0;
        user_child_info.deposit_slot = clock.slot;
        user_child_info.withdraw_slot = 0;
        user_child_info.duration = duration;
        user_child_info.bump = ctx.bumps.user_child_info;

        admin_pda.total_staked_amount += amount;

        Ok(())
    }

    /* pub fn unstake(ctx: Context<Unstake>) -> Result<()> {
        msg!("Instruction: Unstake");

        let admin_pda = &mut ctx.accounts.admin_pda;
        let user_info = &mut ctx.accounts.user_info;
        let clock = Clock::get()?;

        // let reward = (clock.slot - user_info.deposit_slot) * user_info.amount;

        // let cpi_accounts = Transfer {
        //     from: ctx.accounts.admin_staking_wallet.to_account_info(),
        //     to: ctx.accounts.user_staking_wallet.to_account_info(),
        //     authority: admin_pda.to_account_info(),
        // };
        // let bump = admin_pda.bump;
        // let token_program_string = ctx.accounts.token_program.key().clone();
        // let seeds = &[token_program_string.as_ref(), &[bump]];
        // let binding = [&seeds[..]];
        // let cpi_program = ctx.accounts.token_program.to_account_info();
        // let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, &binding);
        // token::transfer(cpi_ctx, user_info.amount)?;

        let cpi_accounts = Transfer {
            from: ctx.accounts.admin_staking_wallet.to_account_info(),
            to: ctx.accounts.user_staking_wallet.to_account_info(),
            authority: admin_pda.to_account_info(),
        };
        let bump = admin_pda.bump;
        let token_program_string = ctx.accounts.token_program.key().clone();
        let seeds = &[token_program_string.as_ref(), &[bump]];
        let binding = [&seeds[..]];
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, &binding);
        token::transfer(cpi_ctx, user_info.amount)?;

        admin_pda.total_staked_amount -= user_info.amount;
        // admin_pda.total_rewarded_amount += reward;

        user_info.amount = 0;
        user_info.deposit_slot = 0;
        user_info.reward_debt = 0;
        // user_info.total_rewarded_amount += reward;

        // let cpi_accounts = Approve {
        //     to: ctx.accounts.admin_staking_wallet.to_account_info(),
        //     authority: ctx.accounts.admin.to_account_info(),
        //     delegate: ctx.accounts.user.to_account_info(),
        // };
        // let cpi_program = ctx.accounts.token_program.to_account_info();
        // let cpi_ctx = CpiContext::new(cpi_program, cpi_accounts);
        // token::approve(cpi_ctx, 10)?;

        Ok(())
    } */

    pub fn claim_reward(ctx: Context<ClaimReward>, pda_seed: u16) -> Result<()> {
        msg!("Instruction: Claim Reward");

        let admin_pda = &mut ctx.accounts.admin_pda;
        let user_info = &mut ctx.accounts.user_info;
        let user_child_info = &mut ctx.accounts.user_child_info;
        let clock = Clock::get()?;

        let reward = (((1.0 + 0.05 / 12.0 as f64).powf(user_child_info.duration as f64))
            * (user_child_info.amount as f64)) as u64;

        let cpi_accounts = Transfer {
            from: ctx.accounts.admin_staking_wallet.to_account_info(),
            to: ctx.accounts.user_staking_wallet.to_account_info(),
            authority: admin_pda.to_account_info(),
        };
        let bump = admin_pda.bump;
        let token_program_string = ctx.accounts.token_program.key().clone();
        let seeds = &[
            token_program_string.as_ref(),
            "solena_staking".as_bytes().as_ref(),
            &[bump],
        ];
        let binding = [&seeds[..]];
        let cpi_program = ctx.accounts.token_program.to_account_info();
        let cpi_ctx = CpiContext::new_with_signer(cpi_program, cpi_accounts, &binding);
        token::transfer(cpi_ctx, reward)?;

        user_info.total_rewarded_amount += reward;

        user_child_info.reward_debt += reward;
        user_child_info.withdraw_slot = clock.slot;

        admin_pda.total_rewarded_amount += reward;

        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeAdmin<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(init, payer = user, space = 8 + AdminInfo::LEN, seeds = [token_program.key().as_ref(), "solena_staking".as_bytes().as_ref()], bump)]
    pub admin_pda: Account<'info, AdminInfo>,
    #[account(mut)]
    pub staking_token: InterfaceAccount<'info, Mint>,
    pub token_program: Interface<'info, TokenInterface>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(pda_seed: u16, amount: u64, duration: u64)]
pub struct InitializeUserInfo<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut, seeds = [token_program.key().as_ref(), "solena_staking".as_bytes().as_ref()], bump = admin_pda.bump)]
    pub admin_pda: Account<'info, AdminInfo>,
    #[account(init, payer = user, space = 8 + UserInfo::LEN, seeds = [user.key().as_ref(), token_program.key().as_ref(), staking_token.key().as_ref()], bump)]
    pub user_info: Account<'info, UserInfo>,
    #[account(init, payer = user, space = 8 + UserChildInfo::LEN, seeds = [user.key().as_ref(), token_program.key().as_ref(), staking_token.key().as_ref(), pda_seed.to_le_bytes().as_ref()], bump)]
    pub user_child_info: Account<'info, UserChildInfo>,
    #[account(mut)]
    pub user_staking_wallet: InterfaceAccount<'info, TokenAccount>,
    #[account(mut)]
    pub admin_staking_wallet: InterfaceAccount<'info, TokenAccount>,
    #[account(mut)]
    pub staking_token: InterfaceAccount<'info, Mint>,
    pub token_program: Interface<'info, TokenInterface>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
#[instruction(pda_seed: u16, amount: u64, duration: u64)]
pub struct StakeUserChildInfo<'info> {
    #[account(mut)]
    pub user: Signer<'info>,
    #[account(mut, seeds = [token_program.key().as_ref(), "solena_staking".as_bytes().as_ref()], bump = admin_pda.bump)]
    pub admin_pda: Account<'info, AdminInfo>,
    #[account(mut, seeds = [user.key().as_ref(), token_program.key().as_ref(), staking_token.key().as_ref()], bump = user_info.bump)]
    pub user_info: Account<'info, UserInfo>,
    #[account(init, payer = user, space = 8 + UserChildInfo::LEN, seeds = [user.key().as_ref(), token_program.key().as_ref(), staking_token.key().as_ref(), pda_seed.to_le_bytes().as_ref()], bump)]
    pub user_child_info: Account<'info, UserChildInfo>,
    #[account(mut)]
    pub user_staking_wallet: InterfaceAccount<'info, TokenAccount>,
    #[account(mut)]
    pub admin_staking_wallet: InterfaceAccount<'info, TokenAccount>,
    #[account(mut)]
    pub staking_token: InterfaceAccount<'info, Mint>,
    pub token_program: Interface<'info, TokenInterface>,
    pub system_program: Program<'info, System>,
}

/* #[derive(Accounts)]
pub struct Unstake<'info> {
    #[account(mut)]
    pub user: AccountInfo<'info>,
    #[account(mut, seeds = [token_program.key().as_ref()], bump = admin_pda.bump)]
    pub admin_pda: Account<'info, AdminInfo>,
    #[account(mut, seeds = [user.key().as_ref(), token_program.key().as_ref(), staking_token.key().as_ref()], bump = user_info.bump)]
    pub user_info: Account<'info, UserInfo>,
    #[account(mut)]
    pub user_staking_wallet: InterfaceAccount<'info, TokenAccount>,
    #[account(mut)]
    pub admin_staking_wallet: InterfaceAccount<'info, TokenAccount>,
    #[account(mut)]
    pub staking_token: InterfaceAccount<'info, Mint>,
    pub token_program: Interface<'info, TokenInterface>,
    pub system_program: Program<'info, System>,
} */

#[derive(Accounts)]
#[instruction(pda_seed: u16)]
pub struct ClaimReward<'info> {
    #[account(mut)]
    pub user: AccountInfo<'info>,
    #[account(mut, seeds = [token_program.key().as_ref(), "solena_staking".as_bytes().as_ref()], bump = admin_pda.bump)]
    pub admin_pda: Account<'info, AdminInfo>,
    #[account(mut, seeds = [user.key().as_ref(), token_program.key().as_ref(), staking_token.key().as_ref()], bump = user_info.bump)]
    pub user_info: Account<'info, UserInfo>,
    #[account(mut, seeds = [user.key().as_ref(), token_program.key().as_ref(), staking_token.key().as_ref(), &pda_seed.to_le_bytes()], bump = user_child_info.bump)]
    pub user_child_info: Account<'info, UserChildInfo>,
    #[account(mut)]
    pub user_staking_wallet: InterfaceAccount<'info, TokenAccount>,
    #[account(mut)]
    pub admin_staking_wallet: InterfaceAccount<'info, TokenAccount>,
    #[account(mut)]
    pub staking_token: InterfaceAccount<'info, Mint>,
    pub token_program: Interface<'info, TokenInterface>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct UserInfo {
    pub total_staked_amount: u64,
    pub total_rewarded_amount: u64,
    pub staking_count: u64,
    pub staking_seeds: [u16; 300],
    pub deposit_slot: u64,
    pub bump: u8,
}

impl UserInfo {
    pub const LEN: usize = 8 + 8 + 8 + 2 * 300 + 8 + 1;
}

#[account]
pub struct UserChildInfo {
    pub amount: u64,
    pub reward_debt: u64,
    pub deposit_slot: u64,
    pub withdraw_slot: u64,
    pub duration: u64,
    pub bump: u8,
}

impl UserChildInfo {
    pub const LEN: usize = 8 + 8 + 8 + 8 + 8 + 1;
}

#[account]
pub struct AdminInfo {
    pub staking_token: Pubkey,
    pub start_slot: u64,
    pub total_staked_amount: u64,
    pub total_rewarded_amount: u64,
    pub total_holders: u64,
    pub bump: u8,
}

impl AdminInfo {
    pub const LEN: usize = 32 + 8 + 8 + 8 + 8 + 8;
}
