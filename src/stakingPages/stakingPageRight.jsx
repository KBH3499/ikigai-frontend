import { AwesomeButton } from "react-awesome-button";
import "react-awesome-button/dist/styles.css";
import "react-awesome-button/dist/themes/theme-blue.css";
import React, { useEffect, useState, useMemo } from "react";
import { useWalletConnect } from "../provider/staking-provider";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, Keypair, PublicKey, SystemProgram, clusterApiUrl } from "@solana/web3.js";
import { Program, AnchorProvider, BN } from "@project-serum/anchor";
import { TOKEN_PROGRAM_ID, getAccount, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import idl from "../json/idl.json";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

const StakingPageRight = React.forwardRef((props, ref) => {
  const [isUnstakeVisible, setIsUnstakeVisible] = useState(false);
  const [isStakeConfirmed, setIsStakeConfirmed] = useState(false);
  const {
    connected,
    wallet,
  } = useWallet();
  const {
    isWalletConnectConfirming,
    closeWalletConnectConfirming,
    askApproval,
    approvalCompleted,
    approval,
    approvalUnknown,
  } = useWalletConnect();
  const network = WalletAdapterNetwork.Devnet;

  // You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);


  const closeUnstakeComponent = () => {
    setIsUnstakeVisible(false);
  };
  const OpenUnstakeComponent = () => {
    setIsUnstakeVisible(true);
  };

  const [isStakeVisible, setIsStakeVisible] = useState(false);
  const closeStakeComponent = () => {
    setIsStakeVisible(false);
    // setStakeAmount("")
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
   const admin = new PublicKey("DG6ZWtgMqYo4P9wsjF5vetosPZmthk33AxJCgeBEY7nr");
   const adminKeyPair = Keypair.fromSeed(admin?.toBytes());
   const poolInfo = new PublicKey(
      "FjT1Wwp3scx1x4bCnVpGyAUoPDMT1GVmAu2VAGzT16hB",
    );
    const poolKeyPair = Keypair.fromSeed(poolInfo?.toBytes());
    const stakingTokenMint = new PublicKey(
      "84AYw2XZ5HcyWWmVNR6s4uS3baHrMLpPMnEfBTm6JkdE",
    );
    const userInfo = JSON.parse(localStorage.getItem("userInfo")) ?? Keypair.generate();
    // localStorage.setItem("userInfo", JSON.stringify(userInfo))
    const publicKeyArray = Uint8Array.from(
      Object.values(userInfo._keypair.publicKey),
    );
    const secretKeyArray = Uint8Array.from(
      Object.values(userInfo._keypair.secretKey),
    );
    const publicKey = new PublicKey(publicKeyArray);
    const _keypair = {
      publicKey: publicKey,
      secretKey: secretKeyArray,
    };
    const publicAddress = publicKey.toBase58();
    console.log({publicAddress})

  const handleInput = (e) => {
    setStakeAmount(Number(e.target.value));
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
        case 3:
          return "3.5%";
        case 6:
          return "7.5%";
        case 12:
          return "16%";
        default:
          return "0%";
      }
    };
  }, [stakeDuration]);

  useEffect(() => {
    getUserInfo()
    setStartDateApproval(getCurrentFormattedDate())
  }, []);

  useEffect(()=>{
    setRedDateApproval(getRedemtionFormattedDate(stakeDuration))
  },[stakeDuration])

  const getUserInfo = async () => {
    const connection = new Connection(endpoint, "confirmed");
    const provider = new AnchorProvider(
      connection,
      wallet.adapter,
      AnchorProvider.defaultOptions(),
    );
    const program = new Program(
      idl,
      "A1KnSRkwF34piFfioJ1NPfeCVRLp5rgJ6kjQz579LCqP",
      provider,
    );
    const userWallet = provider.wallet.publicKey;
    // const userStakingWallet = await getOrCreateAssociatedTokenAccount(
    //   connection,
    //   adminKeyPair,
    //   stakingTokenMint,
    //   userWallet,
    // );
    // console.log({userStakingWallet:userStakingWallet.owner.toString()})
    const accountInfo = await connection.getAccountInfo(adminKeyPair.publicKey);
console.log(accountInfo);

    const poolData = await program.account.userInfo.fetch(publicKey.toString());
    console.log({poolData})
    console.log({poolData2: {
      amount: poolData.amount.toString(),
      depositTimestamp: poolData.depositTimestamp.toString(),
      lockPeriod: poolData.lockPeriod.toString(),
      rewardDebt: poolData.rewardDebt.toString(),
      rewardPercentage: poolData.rewardPercentage.toString()
    }})
  }

  const stake = async () => {
    try {
      const connection = new Connection(endpoint, "confirmed");
      const provider = new AnchorProvider(
        connection,
        wallet.adapter,
        AnchorProvider.defaultOptions(),
      );
      const program = new Program(
        idl,
        "A1KnSRkwF34piFfioJ1NPfeCVRLp5rgJ6kjQz579LCqP",
        provider,
      );

      const userWallet = provider.wallet.publicKey;

      const userStakingWallet = await getOrCreateAssociatedTokenAccount(
        connection,
        adminKeyPair,
        stakingTokenMint,
        userWallet,
      );

      const userAccount = await getAccount(connection, userStakingWallet.address);
      console.log("User Token Balance:", userAccount.amount);


      const adminTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        adminKeyPair,
        stakingTokenMint,
        adminKeyPair.publicKey,
      );

      const accounts = {
        user: userWallet,
        admin: adminKeyPair.publicKey,
        userInfo: publicKey,
        userStakingWallet: userStakingWallet.address,
        adminStakingWallet: adminTokenAccount.address,
        stakingToken: stakingTokenMint,
        poolInfo: poolKeyPair.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      };
      const accounts2 = {
        user: userWallet.toString(),
        admin: adminKeyPair.publicKey.toString(),
        // userInfo: userInfoKeyPair.publicKey,
        userInfo: publicKey.toString(),
        userStakingWallet: userStakingWallet.address.toString(),
        adminStakingWallet: adminTokenAccount.address.toString(),
        stakingToken: stakingTokenMint.toString(),
        poolInfo: poolKeyPair.publicKey.toString(),
        tokenProgram: TOKEN_PROGRAM_ID.toString(),
        systemProgram: SystemProgram.programId.toString(),
      };
      console.log({ accounts, accounts2 });
      const time = new BN(stakeDuration);
      const dynamicValue = `${stakeAmount}e9`;
      const bnAmount = new BN(Number(dynamicValue));

      const tx = await program.methods
        .stake(time, bnAmount)
        .accounts(accounts)
        .signers([_keypair])
        .rpc();

      console.log("Stake transaction successful:", tx);
      if(tx){
        approvalCompleted()
        OpenTransactionConfirming()
      }
    } catch (error) {
      alert(error.message);
      console.error("Error staking tokens:", error);
    }
  };

  const unStake = async () => {
    try {
      const connection = new Connection(endpoint, "confirmed");
      const provider = new AnchorProvider(connection,wallet.adapter, AnchorProvider.defaultOptions());
      const program = new Program(idl, "A1KnSRkwF34piFfioJ1NPfeCVRLp5rgJ6kjQz579LCqP", provider);

      // User's wallet
      const userWallet = provider.wallet.publicKey;

      const userStakingWallet = await getOrCreateAssociatedTokenAccount(
        connection,
        adminKeyPair,
        stakingTokenMint,
        userWallet
      );
      console.log({userWallet, userStakingWallet, owner:userStakingWallet.owner.toString()})
      const adminTokenAccount = await getOrCreateAssociatedTokenAccount(
        connection,
        adminKeyPair,
        stakingTokenMint,
        adminKeyPair.publicKey
      );

      const accounts = {
        user: userWallet,
        admin: adminKeyPair.publicKey,
        // userInfo: userInfoKeyPair.publicKey,
        userInfo: publicKey,
        userStakingWallet: userStakingWallet.address,
        adminStakingWallet: adminTokenAccount.address,
        stakingToken: stakingTokenMint,
        poolInfo: poolKeyPair.publicKey,
        tokenProgram: TOKEN_PROGRAM_ID,
        systemProgram: SystemProgram.programId,
      };
      const accounts2 = {
        user: userWallet.toString(),
        admin: adminKeyPair.publicKey.toString(),
        // userInfo: userInfoKeyPair.publicKey,
        userInfo: publicKey.toString(),
        userStakingWallet: userStakingWallet.address.toString(),
        adminStakingWallet: adminTokenAccount.address.toString(),
        stakingToken: stakingTokenMint.toString(),
        poolInfo: poolKeyPair.publicKey.toString(),
        tokenProgram: TOKEN_PROGRAM_ID.toString(),
        systemProgram: SystemProgram.programId.toString(),
      };
      console.log({ accounts, accounts2 });

      console.log(stakeAmount);

      const tx = await program.methods
        .unstake()
        .accounts(accounts)
        .signers([adminKeyPair])
        .rpc();

      console.log("Stake transaction successful:", tx);
    } catch (error) {
      alert(error.message)
      console.error("Error staking tokens:", error);
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
                        ? stakeDuration
                        : 1}{" "}
                      {stakeDuration < 12
                        ? "MONTH"
                        : "YEAR"}{" "}
                      ={" "}
                      {redDateApproval}
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
                      stake()
                    }}
                  >
                    <span className="stake_main_font_style">
                      Approve
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
                      setIsStakeConfirmed(false)
                      setStakeAmount("")
                      setStakeDuration(1)
                    }}
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
              height: "85%",
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
              <div className="stake_current_info">
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
              </div>
              <div
                style={{
                  width: "100%",
                  paddingTop: "20px",
                  overflowY: "auto",
                }}
              >
                <div
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
              </div>
            </div>
            {connected && (
              <>
                <div
                  style={{
                    height: "80px",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-around",
                    flexWrap: "wrap",
                    borderTop: "1px solid #000000",
                  }}
                >
                  <div style={{ paddingRight: "10px" }}>
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
                  <div style={{ paddingRight: "10px" }}>
                    <AwesomeButton
                      className="stake-aws-btn3"
                      type="secondary"
                      style={{
                        fontSize: "16px",
                        fontFamily: "KaoriGelBold",
                        padding: 0,
                      }}
                      onPress={() => {
                        // OpenUnstakeComponent();
                        unStake()
                      }}
                    >
                      <span className="stake_main_font_style">
                        UNSTAKE
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
                      value={stakeAmount?.toString()}
                      className="stake_stake_amount"
                      placeholder="Please, insert amount of stake."
                    ></input>
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
                      // OpenTransactionConfirming();
                      askApproval();
                      closeStakeComponent();
                      setIsStakeConfirmed(true)
                    }}
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
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
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
                  {stakeDuration < 12
                        ? stakeDuration
                        : 1}{" "}
                      {stakeDuration < 12
                        ? "Month"
                        : "Year"}{" "}                  </span>
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
