import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import "react-awesome-button/dist/themes/theme-blue.css";
import React, { useEffect, useState, useMemo } from "react";
import { useWalletConnect } from "../provider/staking-provider";
import { useWallet } from "@solana/wallet-adapter-react";
import {
    Connection,
    Keypair,
    PublicKey,
    SystemProgram,
    clusterApiUrl,
} from "@solana/web3.js";
import { Program, AnchorProvider, BN } from "@project-serum/anchor";
import {
    TOKEN_PROGRAM_ID,
    getAccount,
    getAssociatedTokenAddress,
    getOrCreateAssociatedTokenAccount,
} from "@solana/spl-token";
import idl from "../json/idl.json";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { adminKeyPair, stakingData } from "../utils/constants";
import { useMediaQuery } from "react-responsive";

const StakingPageRight = React.forwardRef((props, ref) => {
    const [isUnstakeVisible, setIsUnstakeVisible] = useState(false);
    const {
        isWalletConnectConfirming,
        closeWalletConnectConfirming,
        askApproval,
        approvalCompleted,
        approval,
        approvalUnknown,
    } = useWalletConnect();


    const closeUnstakeComponent = () => {
        setIsUnstakeVisible(false);
    };
    const OpenUnstakeComponent = () => {
        setIsUnstakeVisible(true);
    };

    const [isStakeVisible, setIsStakeVisible] = useState(false);
    const closeStakeComponent = () => {
        setIsStakeVisible(false);
    };
    const OpenStakeComponent = () => {
        setIsStakeVisible(true);
    };
    const [isTransactionConfirming, setIsTransactionConfirming] =
        useState(false);
    const closeTransactionConfirming = () => {
        setIsTransactionConfirming(false);
    };
    const OpenTransactionConfirming = () => {
        setIsTransactionConfirming(true);
    };

    const [stakeAmount, setStakeAmount] = useState("");
    const [stakeDuration, setStakeDuration] = useState(1);
    const [startDate, setStartDate] = useState();
    const [startDateApproval, setStartDateApproval] = useState();
    const [redDateApproval, setRedDateApproval] = useState();
    const [redemptionDate, setRedemptionDate] = useState();
    const [isStakeConfirmed, setIsStakeConfirmed] = useState(false);
    const [userInfoPDA, setUserInfoPDA] = useState();
    const [poolInfoPDA, setPoolInfoPDA] = useState();
    const [tokenToMint, setTokenToMint] = useState();
    const isMobileSmall = useMediaQuery({ query: "(max-width: 768px)" });
    const [isUnstakeDisabled, setIsUnstakeDisabled] = useState(false);
    const [selectedToken, setSelectedToken] = useState('ikigai');
    const [selectedTokenDetails, setSelectedTokenDetails] = useState(stakingData['ikigai']);
    const { publicKey, connected, wallet } = useWallet();
    const [isClaiming, setIsClaiming] = useState(false);
    const [isUnstaking, setIsUnstaking] = useState(false);
    const [isStaking, setIsStaking] = useState(false);
    const [expectedRewards, setExpectedRewards] = useState()
    const [adminBalance, setAdminBalance] = useState(false);
    const [isLockDownEnded, setIsLockDownEnded] = useState(false);
    const [isLockEndDate, setIsLockEndDate] = useState(false);
    const [userLimit, setUserLimit] = useState(0);
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);
    const [currentProgram, setCurrentProgram] = useState()
    const [totalStaked, setTotalStaked] = useState()

    const opts = { preflightCommitment: "processed" };

    const connection = new Connection(endpoint, opts.preflightCommitment);
    const provider = new AnchorProvider(
        connection,
        wallet?.adapter,
        opts.preflightCommitment,
    );

    useEffect(() => {
        if (selectedTokenDetails) {
            const programData = new Program(idl, selectedTokenDetails?.stakeProg, provider);
            const stakingTokenMint = new PublicKey(selectedTokenDetails.mintAddr);
            setTokenToMint(stakingTokenMint)
            setCurrentProgram(programData)
        }
    }, [selectedTokenDetails])

    useEffect(() => {
        if (connected && currentProgram) {
            fetchTokenBalance();
            const userinfoPDA = PublicKey.findProgramAddressSync(
                [Buffer.from("user_info"), publicKey?.toBuffer()],
                currentProgram?.programId,
            )[0];

            const poolinfoPDA = PublicKey.findProgramAddressSync(
                [Buffer.from("pool_info"), tokenToMint.toBuffer()],
                currentProgram?.programId,
            )[0];
            setUserInfoPDA(userinfoPDA);
            setPoolInfoPDA(poolinfoPDA);
        }else{
            setExpectedRewards(0)
        }
    }, [connected, currentProgram]);

    const fetchTokenBalance = async () => {
        try {
            const tokenAddress = await getAssociatedTokenAddress(
                tokenToMint,
                selectedTokenDetails.admin.publicKey
            );
            const tokenAccount = await getAccount(connection, tokenAddress);
            setAdminBalance(Number(tokenAccount.amount.toString()) / 1e9)
        } catch (error) {
            console.error("Error fetching token balance:", error);
        } finally {
        }
    };

    const handleInput = (e) => {
        const value = Number(e?.target?.value);
        if(value <= userLimit){
            setStakeAmount(Number(e.target.value));
        }
    };

    const getCurrentFormattedDate = () => {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
        const year = date.getFullYear();

        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const period = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        setStartDate(`${year}-${month}-${day}`);
        return `${day}-${month}-${year} ${hours}:${minutes}${period}`;
    };

    const getRedemtionFormattedDate = (monthsToAdd) => {
        const date = new Date();
        date.setMonth(date.getMonth() + monthsToAdd);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
        const year = date.getFullYear();

        let hours = date.getHours();
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const period = hours >= 12 ? "PM" : "AM";
        hours = hours % 12 || 12;
        setRedemptionDate(`${year}-${month}-${day}`);
        return `${day}-${month}-${year}`;
    };

    const getEstAPY = useMemo(() => {
        return () => {
            switch (stakeDuration) {
                case 1:
                    return "1%";
                case 2:
                    return "3.5%";
                case 3:
                    return "7.5%";
                case 4:
                    return "16%";
                default:
                    return "0%";
            }
        };
    }, [stakeDuration]);

    useEffect(() => {
        if (userInfoPDA && connected) {
            getUserInfo();
        }
        setStartDateApproval(getCurrentFormattedDate());
    }, [userInfoPDA, stakeDuration, connected ]);

    useEffect(() => {
        setRedDateApproval(getRedemtionFormattedDate(stakeDuration));
    }, [stakeDuration]);

    const hasLockPeriodEnded = (timestamp, lockPeriod) => {
        const currentTimestamp = Math.floor(Date.now() / 1000);
        return currentTimestamp > timestamp + lockPeriod;
    }

    const getLockEndDate = (timestamp, lockPeriod) => {
        const targetTimestamp = timestamp + lockPeriod; // Add one day
        const date = new Date(targetTimestamp * 1000); // Convert to milliseconds for Date object
    
        // Format the date and time
        const formattedDate = date.toLocaleString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        });
    
        return formattedDate;
    }

    const getUserInfo = async () => {
        try {
            const userInfoData = await currentProgram.account.userInfo.fetch(userInfoPDA);
            const poolInfoData = await currentProgram.account.poolInfo.fetch(poolInfoPDA);

            const keyValuePairs = poolInfoData?.keyValuePairs[stakeDuration];
            const stakeLimit = (keyValuePairs.userLimit.toNumber() - userInfoData?.amount?.toNumber()) / 1e9
            setUserLimit(stakeLimit)

            // if (keyValuePairs && Array.isArray(keyValuePairs)) {
            //     // Define the target lockSeconds value you want to fetch
            //     const targetLockSeconds = userInfoData?.lockPeriod?.toString(); // Replace with your desired value
            
            //     // Filter the keyValuePairs array
            //     const filteredPairs = keyValuePairs.filter(pair =>
            //         pair.lockSeconds.toString() === targetLockSeconds
            //     );
            
            //     // console.log(`Filtered keyValuePairs with lockSeconds = ${targetLockSeconds}:`, filteredPairs.map(pair => ({
            //     //     lockSeconds: pair.lockSeconds.toString(),
            //     //     poolSize: pair.poolSize.toString(),
            //     //     userLimit: pair.userLimit.toString(),
            //     //     rewardPercentage: pair.rewardPercentage.toString(),
            //     // })));
            //     const stakeLimit = (filteredPairs[0]?.userLimit.toNumber() - userInfoData?.amount?.toNumber()) / 1e9
            //     setUserLimit(stakeLimit)
            // } else {
            //     console.log("keyValuePairs is not an array or is undefined.");
            // }
            
            console.log({
                poolInfoData: {
                    admin: poolInfoData?.admin?.toString(),
                    keyValuePairs:{
                        lockSeconds: keyValuePairs.lockSeconds.toString(),
                        poolSize: keyValuePairs.poolSize.toString(),
                        userLimit: keyValuePairs.userLimit.toString(),
                        rewardPercentage: keyValuePairs.rewardPercentage.toString(),
                    },
                    token: poolInfoData?.token?.toString(),
                    totalStaked: poolInfoData?.totalStaked?.toString(),
                },
            });
            console.log({
                userInfoData: {
                    amount: userInfoData?.amount?.toString(),
                    depositTimestamp: userInfoData?.depositTimestamp?.toString(),
                    lockPeriod: userInfoData?.lockPeriod?.toString(),
                    rewardDebt: userInfoData?.rewardDebt?.toString(),
                    rewardPercentage: userInfoData?.rewardPercentage?.toString(),
                }
            })
            if (userInfoData?.amount?.toNumber() === 0) {
                setIsUnstakeDisabled(true);
            } else {
                setIsUnstakeDisabled(false);
            }

            const hasTimePassed = hasLockPeriodEnded(userInfoData?.depositTimestamp?.toNumber(), userInfoData?.lockPeriod?.toNumber())
            const lockEndDate = getLockEndDate(userInfoData?.depositTimestamp?.toNumber(), userInfoData?.lockPeriod?.toNumber());
            setIsLockDownEnded(hasTimePassed);
            setIsLockEndDate(lockEndDate)
            const stakeAmount = userInfoData.amount.toNumber() / 1e9;
            const rewardPercentage = userInfoData.rewardPercentage.toNumber()
            const lockSeconds = userInfoData.lockPeriod.toNumber()
            const expectedReward = (stakeAmount * rewardPercentage * lockSeconds) / (100 * lockSeconds);
            const claimedRewards = userInfoData.rewardDebt.toNumber() / 1e9;
            setExpectedRewards(isNaN(expectedReward) ? 0 : expectedReward)
            setTotalStaked( userInfoData?.amount?.toNumber() / 1e9)
            props.setTotalReward(claimedRewards)
        } catch (error) {
            setExpectedRewards(0)
            setIsUnstakeDisabled(true);
            console.log(error)
        }
    };

    const stake = async () => {
        try {
            setIsStaking(true);

            const userWallet = provider.wallet.publicKey;

            const userStakingWallet = await getOrCreateAssociatedTokenAccount(
                connection,
                userWallet,
                tokenToMint,
                userWallet,
            );

            const adminTokenAccount = await getOrCreateAssociatedTokenAccount(
                connection,
                selectedTokenDetails.admin,
                tokenToMint,
                selectedTokenDetails.admin.publicKey,
            );

            const accounts = {
                user: userWallet,
                admin: selectedTokenDetails.admin.publicKey,
                userInfo: userInfoPDA,
                userStakingWallet: userStakingWallet.address,
                adminStakingWallet: adminTokenAccount.address,
                stakingToken: tokenToMint,
                poolInfo: poolInfoPDA,
                tokenProgram: TOKEN_PROGRAM_ID,
                systemProgram: SystemProgram.programId,
            };

            const time = new BN(stakeDuration);
            const dynamicValue = `${stakeAmount}e9`;
            const bnAmount = new BN(Number(dynamicValue));

            const tx = await currentProgram.methods
                .stake(time, bnAmount)
                .accounts(accounts)
                .signers([selectedTokenDetails.admin])
                .rpc();

            console.log("Stake transaction successful:", tx);
            if (tx) {
                approvalCompleted();
                OpenTransactionConfirming();
                getUserInfo()
                setIsStaking(false)
            }

            alert("Successfully Staked");
        } catch (error) {
            alert(error.message);
            setIsStaking(false)
            console.error("Error staking tokens:", error);
        }
    };

    const unStake = async () => {
        try {
            if (!isLockDownEnded) {
                alert(`OOPS!! you cannot UNSTAKE your tokens before ${isLockEndDate}`);
                return
            } else {

                setIsUnstaking(true);

                const userWallet = provider.wallet.publicKey;

                const userStakingWallet = await getOrCreateAssociatedTokenAccount(
                    connection,
                    userWallet,
                    tokenToMint,
                    userWallet,
                );

                const adminTokenAccount = await getOrCreateAssociatedTokenAccount(
                    connection,
                    selectedTokenDetails.admin,
                    tokenToMint,
                    selectedTokenDetails.admin.publicKey,
                );

                const accounts = {
                    user: userWallet,
                    admin: selectedTokenDetails.admin.publicKey,
                    userInfo: userInfoPDA,
                    userStakingWallet: userStakingWallet.address,
                    adminStakingWallet: adminTokenAccount.address,
                    stakingToken: tokenToMint,
                    poolInfo: poolInfoPDA,
                    tokenProgram: TOKEN_PROGRAM_ID,
                    systemProgram: SystemProgram.programId,
                };

                const tx = await currentProgram.methods
                    .unstake()
                    .accounts(accounts)
                    .signers([selectedTokenDetails.admin])
                    .rpc();

                console.log("Stake transaction successful:", tx);
                if (tx) {
                    alert("Successfully Unstaked");
                    getUserInfo();
                    setIsUnstaking(false);
                }
            }

        } catch (error) {
            setIsUnstaking(false);
            alert(error.message);
            console.error("Error staking tokens:", error);
        }
    };

    const claimReward = async () => {
        try {
            setIsClaiming(true);

            const userWallet = provider.wallet.publicKey;

            const userStakingWallet = await getOrCreateAssociatedTokenAccount(
                connection,
                adminKeyPair,
                tokenToMint,
                userWallet,
            );

            const adminTokenAccount = await getOrCreateAssociatedTokenAccount(
                connection,
                selectedTokenDetails.admin,
                tokenToMint,
                selectedTokenDetails.admin.publicKey,
            );

            const accounts = {
                user: userWallet,
                admin: selectedTokenDetails.admin.publicKey,
                userInfo: userInfoPDA,
                userStakingWallet: userStakingWallet.address,
                adminStakingWallet: adminTokenAccount.address,
                stakingToken: tokenToMint,
                tokenProgram: TOKEN_PROGRAM_ID,
            };

            const tx = await currentProgram.methods
                .claimReward()
                .accounts(accounts)
                .signers([selectedTokenDetails.admin])
                .rpc();

            console.log("Stake transaction successful:", tx);
            if (tx) {
                setIsClaiming(false);
                props.setIsClaimed(true);
                getUserInfo()
                alert("Successfully Claimed")
            }
        } catch (error) {
            setIsClaiming(false);
            props.setIsClaimed(false);
            console.error("Error staking tokens:", error);
            alert(error.message)
        }
    };

    return (
        <div
            className="demoPage comic_background_white_left"
            ref={ref}
            style={{ width: "100%", position: "relative" }}
        >
            <div
                style={{
                    height: "100%",
                    width: "90%",
                    paddingLeft: "5%",
                    paddingRight: "5%",
                }}
            >
                {approval === 1 && (
                    <>
                        <div
                            style={{ height: "10%" }}
                            className="stake_flex_align_center"
                        >
                            <div>
                                <span
                                    className="stake_main_font_style "
                                    style={{
                                        fontSize: "13px",
                                        textAlign: "start",
                                    }}
                                >
                                    SELECT DURATION, FUND YOUR ACCOUNT TO START
                                    EARNING
                                </span>
                            </div>
                        </div>
                        <div
                            style={{
                                height: "80%",
                                width: "90%",
                                marginLeft: "7%",
                                backgroundColor: "white",
                                border: "solid 2px black",
                            }}
                        >
                            <div style={{ marginLeft: "5%", paddingTop: "5%" }}>
                                <img
                                    style={{ width: "55px", height: "55px" }}
                                    src="../../public/images/image.png"
                                    alt="image of logo"
                                ></img>
                            </div>
                            <div
                                className="stake_main_font_style"
                                style={{ fontSize: "25px", paddingTop: "10px" }}
                            >
                                Approve transaction
                            </div>
                            <div
                                style={{
                                    width: "80%",
                                    height: "50%",
                                    backgroundColor: "#f4f3e2",
                                    marginLeft: "10%",
                                    marginTop: "15px",
                                    border: "solid 2px black",
                                    position: "relative",
                                }}
                            >
                                <div
                                    className="stake_main_font_style"
                                    style={{
                                        padding: "10px",
                                        position: "absolute",
                                        top: "0",
                                        left: "0",
                                    }}
                                >
                                    Summary
                                </div>

                                <div
                                    className="stake_approval"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                        paddingTop: "50px",
                                    }}
                                >
                                    <div
                                        style={{
                                            textAlign: "start",
                                            paddingLeft: "10px",
                                        }}
                                    >
                                        <br />
                                        <span className="box"></span>
                                        <span style={{ fontSize: "12px" }}>
                                            Stake Date
                                        </span>
                                        <br />
                                        <br />
                                        <br />
                                        <span className="box"></span>
                                        <span style={{ fontSize: "12px" }}>
                                            Redemption Date
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            textAlign: "end",
                                            paddingRight: "10px",
                                        }}
                                    >
                                        <br />
                                        <span style={{ fontSize: "12px" }}>
                                            {/* 04-04-2024 3;30AM */}
                                            {startDateApproval}
                                        </span>
                                        <br />
                                        <br />
                                        <br />
                                        <span style={{ fontSize: "12px" }}>
                                            {stakeDuration < 12
                                                ? stakeDuration === 2? 3 : stakeDuration === 3 ? 6 : 1
                                                : 1}{" "}
                                            {stakeDuration < 12
                                                ? "MONTH"
                                                : "YEAR"}{" "}
                                            = {redDateApproval}
                                        </span>
                                    </div>
                                </div>

                                {/* Date and Time Info */}

                                {/* Horizontal Line */}
                                <div
                                    style={{
                                        position: "absolute",
                                        top: "70%",
                                        left: "10%",
                                        width: "80%",
                                        height: "1px",
                                        backgroundColor: "black",
                                    }}
                                ></div>

                                {/* Bullet Points */}
                                <div
                                    className="stake_approval"
                                    style={{
                                        paddingTop: "10px",

                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <div
                                        style={{
                                            textAlign: "start",
                                            paddingLeft: "10px",
                                        }}
                                    >
                                        <br />
                                        <span
                                            style={{
                                                fontSize: "12px",
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <span className="box"></span>Est.APY
                                        </span>
                                        <br />
                                        <br />
                                        <span
                                            style={{
                                                fontSize: "12px",
                                                display: "flex",
                                                alignItems: "center",
                                            }}
                                        >
                                            <span className="box"></span>
                                            EstEstimated Income
                                        </span>
                                    </div>
                                    <div
                                        style={{
                                            textAlign: "end",
                                            paddingRight: "10px",
                                        }}
                                    >
                                        <br />
                                        <span style={{ fontSize: "12px" }}>
                                            {getEstAPY()}
                                        </span>
                                        <br />
                                        <br />
                                        <span style={{ fontSize: "12px" }}>
                                            0.0003394 IKIGAI
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <div
                                    style={{
                                        paddingLeft: "15%",
                                        width: "70%",
                                        paddingTop: "10px",
                                        display: "flex",
                                        justifyContent: "space-between", // Add space between the buttons
                                    }}
                                >
                                    <AwesomeButton
                                        className="stake-aws-btn3"
                                        type="primary"
                                        style={{
                                            width: "48%", // Adjust width to leave space between buttons
                                            fontSize: "16px",
                                            fontFamily: "KaoriGelBold",
                                            padding: 0,
                                        }}
                                        onPress={() => {
                                            // approvalCompleted();
                                            // OpenTransactionConfirming();
                                            stake();
                                        }}
                                        disabled={isStaking}
                                    >
                                        <span className="stake_main_font_style">
                                            {isStaking ? "Staking..." : "Approve"}
                                        </span>
                                    </AwesomeButton>

                                    <AwesomeButton
                                        className="stake-aws-btn3"
                                        type="secondary"
                                        style={{
                                            width: "48%", // Adjust width to leave space between buttons
                                            fontSize: "16px",
                                            fontFamily: "KaoriGelBold",
                                            padding: 0,
                                        }}
                                        onPress={() => {
                                            approvalUnknown();
                                            setIsStakeConfirmed(false);
                                            setStakeAmount("");
                                            setStakeDuration(1);
                                        }}
                                        disabled={isStaking}
                                    >
                                        <span className="stake_main_font_style">
                                            Cancel
                                        </span>
                                    </AwesomeButton>
                                </div>
                            </div>
                        </div>
                    </>
                )}
                {approval !== 1 && approval !== 2 && (
                    <div
                        className="stake_border stake_main_font_style"
                        style={{
                            marginTop: "5%",
                            height: isMobileSmall ? "95%" : "85%",
                            width: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "space-between",
                        }}
                    >
                        <div
                            className="stake_states"
                            style={{ overflowY: "auto", padding: "10px" }}
                        >
                            <div style={{ textAlign: "start", width: "100%" }}>
                                <span>DURATION</span>
                            </div>
                            <div
                                className="stake_wrap"
                                style={{
                                    justifyContent: "space-around",
                                    marginBottom: "30px",
                                }}
                            >
                                <div
                                    className={`stake_pool_element ${stakeDuration === 1
                                        ? "selected-pool"
                                        : ""
                                        }`}
                                    style={{
                                        position: "relative",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => setStakeDuration(1)}
                                >
                                    <div>
                                        <span style={{ fontSize: "" }}>
                                            1 month
                                        </span>
                                    </div>
                                    <div style={{ color: "#018790" }}>
                                        <span>1</span>
                                        <span>% APY</span>
                                    </div>
                                    <div style={{ fontSize: "10px" }}>
                                        <span>6,000,000</span>
                                        <span>pool</span>
                                    </div>
                                    <div
                                        className={`stake_pool_ticket ${stakeDuration === 1
                                            ? "stake_pool_ticket_show"
                                            : ""
                                            }`}
                                        style={{
                                            border: "1px solid #018790",
                                            backgroundColor: "#FFCE2F",
                                            position: "absolute",
                                            bottom: "-25px",
                                            width: "110px",
                                            fontSize: "10px",
                                            left: "-10px",
                                        }}
                                    >
                                        <span>1</span>
                                        <span> free lottery tickets</span>
                                    </div>
                                </div>
                                <div
                                    className={`stake_pool_element ${stakeDuration === 2
                                        ? "selected-pool"
                                        : ""
                                        }`}
                                    style={{
                                        position: "relative",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => setStakeDuration(2)}
                                >
                                    <div>
                                        <span style={{ fontSize: "" }}>
                                            3 months
                                        </span>
                                    </div>
                                    <div style={{ color: "#018790" }}>
                                        <span>3.5</span>
                                        <span>% APY</span>
                                    </div>
                                    <div style={{ fontSize: "10px" }}>
                                        <span>6,000,000</span>
                                        <span>pool</span>
                                    </div>
                                    <div
                                        className={`stake_pool_ticket ${stakeDuration === 2
                                            ? "stake_pool_ticket_show"
                                            : ""
                                            }`}
                                        style={{
                                            border: "1px solid #018790",
                                            backgroundColor: "#FFCE2F",
                                            position: "absolute",
                                            bottom: "-25px",
                                            width: "110px",
                                            fontSize: "10px",
                                            left: "-10px",
                                        }}
                                    >
                                        <span>3</span>
                                        <span> free lottery tickets</span>
                                    </div>
                                </div>
                                <div
                                    className={`stake_pool_element ${stakeDuration === 3
                                        ? "selected-pool"
                                        : ""
                                        }`}
                                    style={{
                                        position: "relative",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => setStakeDuration(3)}
                                >
                                    <div>
                                        <span style={{ fontSize: "" }}>
                                            6 months
                                        </span>
                                    </div>
                                    <div style={{ color: "#018790" }}>
                                        <span>7.5</span>
                                        <span>% APY</span>
                                    </div>
                                    <div style={{ fontSize: "10px" }}>
                                        <span>6,000,000</span>
                                        <span>pool</span>
                                    </div>
                                    <div
                                        className={`stake_pool_ticket ${stakeDuration === 3
                                            ? "stake_pool_ticket_show"
                                            : ""
                                            }`}
                                        style={{
                                            border: "1px solid #018790",
                                            backgroundColor: "#FFCE2F",
                                            position: "absolute",
                                            bottom: "-25px",
                                            width: "110px",
                                            fontSize: "10px",
                                            left: "-10px",
                                        }}
                                    >
                                        <span>6</span>
                                        <span> free lottery tickets</span>
                                    </div>
                                </div>
                                <div
                                    className={`stake_pool_element ${stakeDuration === 4
                                        ? "selected-pool"
                                        : ""
                                        }`}
                                    style={{
                                        position: "relative",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => setStakeDuration(4)}
                                >
                                    <div>
                                        <span style={{ fontSize: "" }}>
                                            12 months
                                        </span>
                                    </div>
                                    <div style={{ color: "#018790" }}>
                                        <span>16</span>
                                        <span>% APY</span>
                                    </div>
                                    <div style={{ fontSize: "10px" }}>
                                        <span>6,000,000</span>
                                        <span>pool</span>
                                    </div>
                                    <div
                                        className={`stake_pool_ticket ${stakeDuration === 4
                                            ? "stake_pool_ticket_show"
                                            : ""
                                            }`}
                                        style={{
                                            border: "1px solid #018790",
                                            backgroundColor: "#FFCE2F",
                                            position: "absolute",
                                            bottom: "-25px",
                                            width: "110px",
                                            fontSize: "10px",
                                            left: "-10px",
                                        }}
                                    >
                                        <span>12</span>
                                        <span> free lottery tickets</span>
                                    </div>
                                </div>
                            </div>
                            <div className="token_info">
                                <div>
                                    <span
                                        style={{
                                            marginBottom: "4px",
                                            fontSize: "24px",
                                        }}
                                    >
                                        Select Token to Stake
                                    </span>
                                    <div style={{ display: "flex", fontSize: "15px", marginTop: 10, justifyContent: "center", alignItems: "center", gap: 40 }}>
                                        <div style={{ fontSize: 20 }}>
                                            <input type="checkbox" checked={selectedToken === 'ikigai'} onChange={() => { setSelectedToken('ikigai'); setSelectedTokenDetails(stakingData["ikigai"]) }} />
                                            ikigai
                                        </div>
                                        <div style={{ fontSize: 20 }}>
                                            <input type="checkbox" checked={selectedToken === 'tyke'} onChange={() => { setSelectedToken('tyke'); setSelectedTokenDetails(stakingData["tyke"]) }} />
                                            tyke
                                        </div>

                                    </div>
                                </div>
                                {/* <div>
                  <div style={{ fontSize: "15px" }}>
                    <span>50,000</span>
                    <span>ikgai</span>
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: "15px" }}>
                    <span>50,000</span>
                    <span>ikgai</span>
                  </div>
                </div> */}
                            </div>
                            {/* <div className="stake_current_info">
                                <div>
                                    <div>
                                        <span style={{ fontSize: "9px" }}>
                                            Total Pending Reward
                                        </span>
                                    </div>
                                    <div style={{ fontSize: "15px" }}>
                                        <span>50,000</span>
                                        <span>ikgai</span>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <span style={{ fontSize: "9px" }}>
                                            Total Pending Reward
                                        </span>
                                    </div>
                                    <div style={{ fontSize: "15px" }}>
                                        <span>50,000</span>
                                        <span>ikgai</span>
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <span style={{ fontSize: "9px" }}>
                                            Total Pending Reward
                                        </span>
                                    </div>
                                    <div style={{ fontSize: "15px" }}>
                                        <span>50,000</span>
                                        <span>ikgai</span>
                                    </div>
                                </div>
                            </div> */}
                            <div
                                style={{
                                    width: "100%",
                                    paddingTop: "20px",
                                    overflowY: "auto",
                                }}
                            >
                                {/* <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                  }}
                >
                  <div className="stake_flex_align_center stake_border stake_complete_reward">
                    <div>
                      <div>
                        <span>Pending Rewards</span>
                      </div>
                      <div>
                        <span>3,020,900</span>
                        <span> ikgai</span>
                      </div>
                    </div>
                  </div>
                  <div className="stake_flex_align_center stake_border stake_complete_reward">
                    <div>
                      <div>
                        <span>Pending Rewards</span>
                      </div>
                      <div>
                        <span>3,020,900</span>
                        <span> ikgai</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="stake_flex_align_center stake_border stake_pending_reward">
                  <div>
                    <div>
                      <span>Pending Rewards</span>
                    </div>
                    <div>
                      <span>3,020,900</span>
                      <span> ikgai</span>
                    </div>
                  </div>
                </div>
                <div className="stake_flex_align_center stake_border stake_pending_reward">
                  <div>
                    <div>
                      <span>Pending Rewards</span>
                    </div>
                    <div>
                      <span>3,020,900</span>
                      <span> ikgai</span>
                    </div>
                  </div>
                </div>
                <div className="stake_flex_align_center stake_border stake_pending_reward">
                  <div>
                    <div>
                      <span>Pending Rewards</span>
                    </div>
                    <div>
                      <span>3,020,900</span>
                      <span> ikgai</span>
                    </div>
                  </div>
                </div>
                <div className="stake_flex_align_center stake_border stake_pending_reward">
                  <div>
                    <div>
                      <span>Pending Rewards</span>
                    </div>
                    <div>
                      <span>3,020,900</span>
                      <span> ikgai</span>
                    </div>
                  </div>
                </div> */}
                                <div className="stake_flex_align_center stake_border stake_pending_reward">
                                    <div>
                                        <div>
                                            <span>Total Staked</span>
                                        </div>
                                        <div>
                                            <span>{totalStaked?.toLocaleString()}</span>
                                            {/* <span> ikgai</span> */}
                                        </div>
                                    </div>
                                </div>
                                <div className="stake_flex_align_center stake_border stake_pending_reward">
                                    <div>
                                        <div>
                                            <span>Pending Rewards</span>
                                        </div>
                                        <div>
                                            <span>{expectedRewards?.toLocaleString()}</span>
                                            {/* <span> ikgai</span> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {connected && (
                            <>
                                <div
                                    style={{
                                        height: isMobileSmall ? "180px" : "80px",
                                        width: "100%",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flexDirection: isMobileSmall ? "column" : "",
                                        flexWrap: isMobileSmall ? "wrap" : "",
                                        borderTop: "1px solid #000000",
                                    }}
                                >
                                    <div style={{ paddingRight: "3px" }}>
                                        <AwesomeButton
                                            className="stake-aws-btn3"
                                            type="primary"
                                            style={{
                                                fontSize: "16px",
                                                fontFamily: "KaoriGelBold",
                                                padding: 0,
                                            }}
                                            onPress={() => {
                                                OpenStakeComponent();
                                            }}
                                        >
                                            <span className="stake_main_font_style">
                                                STAKE
                                            </span>
                                        </AwesomeButton>
                                    </div>
                                    <div style={{ paddingRight: "3px" }}>
                                        <AwesomeButton
                                            className="stake-aws-btn3"
                                            type="secondary"
                                            style={{
                                                fontSize: "16px",
                                                fontFamily: "KaoriGelBold",
                                                padding: 0,
                                            }}
                                            onPress={() => {
                                                if (adminBalance > 0) {
                                                    unStake();
                                                } else {
                                                    alert("Insufficient Admin Balance")
                                                }
                                            }}
                                            disabled={isUnstaking || isUnstakeDisabled}
                                        >
                                            <span className="stake_main_font_style">
                                                {isUnstaking ? "Unstaking..." : "UNSTAKE"}
                                            </span>
                                        </AwesomeButton>
                                    </div>
                                    <div style={{ paddingRight: "3px" }}>
                                        <AwesomeButton
                                            className="stake-aws-btn3"
                                            type="secondary"
                                            style={{
                                                fontSize: "16px",
                                                fontFamily: "KaoriGelBold",
                                                padding: 0,
                                            }}
                                            onPress={() => {
                                                if (adminBalance > 0) {
                                                    claimReward();
                                                } else {
                                                    alert("Insufficient Admin Balance")
                                                }
                                            }}
                                            disabled={isClaiming || expectedRewards === 0}
                                        >
                                            <span className="stake_main_font_style">
                                                {isClaiming ? "CLAIMING..." : "CLAIM REWARD"}
                                            </span>
                                        </AwesomeButton>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
            {/* /////////////////////////////////////////// stake component */}
            {isStakeVisible && approval === 0 && (
                <div className="stake_stake">
                    <div className="stake_unstake1_bg">
                        <div className="stake_unstake1_comp">
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row-reverse",
                                    height: "45px",
                                }}
                            >
                                <button
                                    className="stake_close_button"
                                    onClick={closeStakeComponent}
                                >
                                    ×
                                </button>
                            </div>
                            <div className="stake_unstake1_layout">
                                <div
                                    style={{
                                        marginBottom: "20px",
                                        marginTop: "20px",
                                    }}
                                >
                                    <span style={{ fontSize: "20px" }}>
                                        Add Stake Amount
                                    </span>
                                </div>
                                <div
                                    style={{
                                        width: "100%",
                                        marginBottom: "20px",
                                    }}
                                >
                                    <div
                                        style={{
                                            textAlign: "start",
                                            margin: "10px",
                                        }}
                                    >
                                        <span>AMOUNT</span>
                                    </div>
                                    <div>
                                        <input
                                            onChange={handleInput}
                                            value={stakeAmount > 0 ? stakeAmount : ""}
                                            className="stake_stake_amount"
                                            placeholder="Please, insert amount of stake."
                                            type="number"
                                        ></input>
                                    </div>
                                    <div>
                                        Stake Limit : {userLimit}
                                    </div>
                                    <div
                                        className="stake_stake_auto_compounding_select"
                                        style={{
                                            marginBottom: "20px",
                                            marginTop: "20px",
                                            padding: "5px",
                                        }}
                                    >
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                height: "100%",
                                            }}
                                        >
                                            <div>
                                                <span>Auto Compunding</span>
                                            </div>
                                            <div>
                                                <input
                                                    type="checkbox"
                                                    id="vehicle1"
                                                    name="vehicle1"
                                                    value="Bike"
                                                    readOnly
                                                    checked={connected}
                                                ></input>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    style={{ paddingRight: "10px", width: "80%" }}
                                >
                                    <AwesomeButton
                                        className="stake-aws-btn3"
                                        type="primary"
                                        style={{
                                            width: "100%",
                                            fontSize: "16px",
                                            fontFamily: "KaoriGelBold",
                                            padding: 0,
                                        }}
                                        onPress={() => {
                                            askApproval();
                                            closeStakeComponent();
                                            setIsStakeConfirmed(true);
                                        }}
                                        disabled={stakeAmount === 0 || stakeAmount === '' || stakeAmount < 0}
                                    >
                                        <span className="stake_main_font_style">
                                            STAKE IKIGAI
                                        </span>
                                    </AwesomeButton>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {/* /////////////////////////////////////////////////// */}
            {/* /////////////////////////////////////////// unstake component */}
            {isUnstakeVisible && approval === 0 && (
                <div className="stake_unstake">
                    <div className="stake_unstake1_bg">
                        <div className="stake_unstake1_comp">
                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "row-reverse",
                                    heigth: "45px",
                                }}
                            >
                                <button
                                    className="stake_close_button"
                                    onClick={closeUnstakeComponent}
                                >
                                    ×
                                </button>
                            </div>
                            <div className="stake_unstake1_layout">
                                <div style={{ marginBottom: "20px" }}>
                                    <span style={{ fontSize: "20px" }}>
                                        Add Unstake Amount
                                    </span>
                                </div>
                                <div
                                    style={{
                                        width: "100%",
                                        marginBottom: "20px",
                                    }}
                                >
                                    <div
                                        style={{
                                            textAlign: "start",
                                            margin: "10px",
                                        }}
                                    >
                                        <span>AMOUNT</span>
                                    </div>
                                    <div>
                                        <input
                                            className="stake_unstake_amount"
                                            placeholder="Please, insert amount of unstake."
                                        ></input>
                                    </div>
                                </div>
                                <div
                                    className="stake_unstake1_button"
                                    style={{
                                        marginBottom: "20px",
                                        marginTop: "20px",
                                    }}
                                    onClick={() => {
                                        // OpenTransactionConfirming();
                                        askApproval();
                                        closeUnstakeComponent();
                                    }}
                                >
                                    UNSTAKE IKIGAI
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* /////////////////////////////////////////////////// */}
            {/* /////////////////////////////////////////// transaction component */}
            {isTransactionConfirming && approval === 2 && (
                <div className="stake_unstake">
                    <div className="stake_unstake1_bg">
                        <div
                            className="stake_unstake1_comp"
                            style={{
                                paddingTop: "20px",
                                flexDirection: "column",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                overflowY: "auto",
                            }}
                        >
                            <div
                                style={{
                                    marginTop: "20px",
                                    border: "2px solid #000000",
                                    borderRadius: "50%",
                                    height: "40px",
                                    width: "40px",
                                    backgroundColor: "#05FF7E",
                                    textAlign: "center",
                                    fontSize: "30px",
                                }}
                            >
                                <svg
                                    width="24"
                                    height="21"
                                    viewBox="0 0 24 21"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M1.75911 10.1941L2.43564 10.9305L1.7591 10.1941C0.821036 11.0559 0.743512 12.5213 1.57611 13.4808L2.3314 12.8254L1.57611 13.4808L6.54504 19.2071C6.97891 19.7071 7.60657 20 8.27329 20C8.94002 20 9.56768 19.7071 10.0015 19.2072L22.4239 4.89137C23.2565 3.93187 23.179 2.46639 22.2409 1.60458C21.2863 0.727622 19.8143 0.816829 18.9674 1.79286L8.27329 14.117L5.03261 10.3823C4.18567 9.4063 2.71367 9.31709 1.75911 10.1941Z"
                                        fill="white"
                                        stroke="black"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <div style={{ marginBottom: "20px" }}>
                                <span style={{ fontSize: "20px" }}>
                                    TRANSACTION SUCCESSFUL
                                </span>
                            </div>
                            <div
                                className="stake_transaction_history"
                                style={{
                                    marginBottom: "20px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                }}
                            >
                                <div
                                    style={{
                                        textAlign: "start",
                                        paddingLeft: "10px",
                                    }}
                                >
                                    <span>Lock Amount</span>
                                    <br />
                                    <span style={{ fontSize: "12px" }}>
                                        Start Date:
                                    </span>
                                    <br />
                                    <span style={{ fontSize: "12px" }}>
                                        Redemption Date:
                                    </span>
                                </div>
                                <div
                                    style={{
                                        textAlign: "end",
                                        paddingRight: "10px",
                                    }}
                                >
                                    <span>{stakeAmount}</span>
                                    <span> ikigai</span>
                                    <br />
                                    <span style={{ fontSize: "12px" }}>
                                        {startDate}
                                    </span>
                                    <br />
                                    <span style={{ fontSize: "12px" }}>
                                        {stakeDuration < 12 ? stakeDuration : 1}{" "}
                                        {stakeDuration < 12 ? "Month" : "Year"}{" "}
                                    </span>
                                    <span>=</span>
                                    <span style={{ fontSize: "12px" }}>
                                        {redemptionDate}
                                    </span>
                                </div>
                            </div>
                            <div
                                className="stake_transaction_state"
                                style={{ marginBottom: "20px" }}
                            >
                                <div
                                    className=""
                                    style={{
                                        height: "100%",
                                        boxSizing: "border-box",
                                    }}
                                >
                                    <img
                                        alt=""
                                        src="/assets/staking/dfe9730f62f014b284d1e9197277cf00.png"
                                        style={{ height: "100%" }}
                                    />
                                </div>
                            </div>
                            <div
                                style={{
                                    paddingRight: "20px",
                                    marginBottom: "20px",
                                }}
                            >
                                <AwesomeButton
                                    className="stake-aws-btn3"
                                    type="primary"
                                    style={{
                                        fontSize: "16px",
                                        fontFamily: "KaoriGelBold",
                                        padding: 0,
                                    }}
                                    onPress={() => {
                                        approvalUnknown();
                                        closeTransactionConfirming();
                                    }}
                                >
                                    <span className="stake_main_font_style">
                                        Go To Dashboard
                                    </span>
                                </AwesomeButton>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {isWalletConnectConfirming && (
                <div className="stake_unstake">
                    <div className="stake_unstake1_bg">
                        <div
                            className="stake_unstake1_comp"
                            style={{
                                flexDirection: "column",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                overflowY: "auto",
                            }}
                        >
                            <div
                                style={{
                                    marginTop: "20px",
                                    border: "2px solid #000000",
                                    borderRadius: "50%",
                                    height: "40px",
                                    width: "40px",
                                    backgroundColor: "#05FF7E",
                                    textAlign: "center",
                                    fontSize: "30px",
                                }}
                            >
                                <svg
                                    width="24"
                                    height="21"
                                    viewBox="0 0 24 21"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M1.75911 10.1941L2.43564 10.9305L1.7591 10.1941C0.821036 11.0559 0.743512 12.5213 1.57611 13.4808L2.3314 12.8254L1.57611 13.4808L6.54504 19.2071C6.97891 19.7071 7.60657 20 8.27329 20C8.94002 20 9.56768 19.7071 10.0015 19.2072L22.4239 4.89137C23.2565 3.93187 23.179 2.46639 22.2409 1.60458C21.2863 0.727622 19.8143 0.816829 18.9674 1.79286L8.27329 14.117L5.03261 10.3823C4.18567 9.4063 2.71367 9.31709 1.75911 10.1941Z"
                                        fill="white"
                                        stroke="black"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                </svg>
                            </div>
                            <div style={{ marginBottom: "20px" }}>
                                <span style={{ fontSize: "20px" }}>
                                    CONNECTION SUCCESSFUL
                                </span>
                            </div>
                            <div style={{ width: "100%", marginBottom: "20px" }}>
                                <div
                                    className="stake_phantom_wallet_select"
                                    style={{
                                        margin: "20px",
                                        padding: "5px",
                                    }}
                                >
                                    <div
                                        style={{
                                            height: "100%",
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <div style={{ heigth: "100%" }}>
                                            <img
                                                alt=""
                                                src="/assets/staking/pngaaa.com-6547356 1.png"
                                                style={{ height: "80%" }}
                                            />
                                        </div>

                                        <div>
                                            <span style={{ color: "#018790" }}>
                                                CONGRATULATIONS!
                                            </span>
                                            <br />
                                            <span style={{ fontSize: "10px" }}>
                                                Your phantom wallet has been
                                                succesfully connected
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                style={{
                                    paddingRight: "20px",
                                    marginBottom: "20px",
                                }}
                            >
                                <AwesomeButton
                                    className="stake-aws-btn3"
                                    type="primary"
                                    style={{
                                        fontSize: "16px",
                                        fontFamily: "KaoriGelBold",
                                        padding: 0,
                                    }}
                                    onPress={() => {
                                        closeWalletConnectConfirming();
                                    }}
                                >
                                    <span className="stake_main_font_style">
                                        START STAKING
                                    </span>
                                </AwesomeButton>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* /////////////////////////////////////////////////// */}
        </div>
        //  {approval===1 && <div>
        //   <span>Here</span>
        //   </div>}
    );
});

export default StakingPageRight;
