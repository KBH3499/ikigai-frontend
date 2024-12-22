import { AnchorProvider, BN, Program } from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import { clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";
import React, { useMemo, useState } from "react";
import { stakingData } from "../../utils/constants";
import idl from "../../json/idl.json";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

const AdminPageRight = React.forwardRef((props, ref) => {
  const [selectedToken, setSelectedToken] = useState();
  const [selectedPool, setSelectedPool] = useState();
  const [poolStakeSize, setPoolStakeSize] = useState();
  const [userStakeLimit, setUserStakeLimit] = useState();
  const [lockPeriod, setLockPeriod] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rewardPercentage, setRewardPercentage] = useState();
  const { wallet } = useWallet()
  const opts = { preflightCommitment: "processed" };
  const network = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);
  const connection = new Connection(endpoint, opts.preflightCommitment);
  const provider = new AnchorProvider(
    connection,
    wallet?.adapter,
    opts.preflightCommitment,
  );

  const daysToSeconds = (days) => {
    if (typeof days !== "number" || days < 0) {
      throw new Error("Input must be a non-negative number");
    }
    return days * 24 * 60 * 60; // 24 hours, 60 minutes, 60 seconds
  }

  const handleSelectedToken = (e) => {
    setSelectedToken(e.target.value)
  }
  const handleSelectedPool = (e) => {
    switch (e.target.value) {
      case '1 Month':
        setSelectedPool(1)
        break;
      case '3 Month':
        setSelectedPool(2)
        break;
      case '6 Month':
        setSelectedPool(3)
        break;
      case '12 Month':
        setSelectedPool(4)
        break;

      default:
        break;
    }
  }

  const handlePoolStakeChange = (e) => {
    const value = e.target.value;
    const dynamicValue = `${value}e9`
    const bnAmount = new BN(Number(dynamicValue));
    if (!isNaN(value)) {
      setPoolStakeSize(bnAmount); // Log only valid numbers
    }
  };
  const handleUserStakeLimitChange = (e) => {
    const value = e.target.value;
    const dynamicValue = `${value}e9`
    const bnAmount = new BN(Number(dynamicValue));
    if (!isNaN(value)) {
      setUserStakeLimit(bnAmount); // Log only valid numbers
    }
  };
  const handleLockPeriodChange = (e) => {
    const value = e.target.value;
    const lockPeriodSeconds = daysToSeconds(Number(value))
    const bnAmount = new BN(lockPeriodSeconds);
    if (!isNaN(value)) {
      setLockPeriod(bnAmount); // Log only valid numbers
    }
  };
  const handleRewardPercentageChange = (e) => {
    const value = e.target.value;
    const bnAmount = new BN(Number(value));
    if (!isNaN(value)) {
      setRewardPercentage(bnAmount); // Log only valid numbers
    }
  };

  const updatePool = async () => {
    try {
      setIsSubmitting(true)
      const index = selectedPool
      const newDetail = {
        lockSeconds: lockPeriod,
        poolSize: poolStakeSize,
        userLimit: userStakeLimit,
        rewardPercentage: rewardPercentage,
      }
      const program = new Program(idl, stakingData[selectedToken]?.stakeProg, provider);
      const stakingTokenMint = new PublicKey(stakingData[selectedToken]?.mintAddr);

      const poolinfoPDA = PublicKey.findProgramAddressSync(
        [Buffer.from("pool_info"), stakingTokenMint.toBuffer()],
        program?.programId,
      )[0];

      const accounts = {
        admin: stakingData[selectedToken].admin.publicKey,
        poolInfo: poolinfoPDA,
      };

      const tx = await program.methods
        .updatePoolDetail(index, newDetail)
        .accounts(accounts)
        .signers([stakingData[selectedToken].admin])
        .rpc();

      console.log("Stake transaction successful:", tx);
      if(tx){
        setIsSubmitting(false)
        alert("Successfully Updated Details")
      }
    } catch (error) {
      setIsSubmitting(false)
      alert(error.message)
      console.error("Error staking tokens:", error);
    }
  };

  return (

    <div className={`demoPage comic_background_white_right ${props?.isMobile ? "" : "center_div"}`} ref={ref}>
      <div className="admin-form"><h1 className="font admin-font">Update Pool</h1>
        <div className="contact_us_canvas">
          <div style={{ padding: "0.5vh" }}>
            <select className="input_form_element_select" onChange={handleSelectedToken}>
            {/* <select className="input_form_element" onChange={handleSelectedToken}> */}
              <option>Select Token</option>
              <option>ikigai</option>
              <option>tyke</option>
            </select>
          </div>
          <div style={{ padding: "0.5vh" }}>
            <select className="input_form_element_select" onChange={handleSelectedPool}>
              <option>Select Pool</option>
              <option>1 Month</option>
              <option>3 Month</option>
              <option>6 Month</option>
              <option>12 Month</option>
            </select>
          </div>
          <div style={{ padding: "0.5vh" }}>
            <input
              className="input_form_element_data"
              placeholder="Pool Size"
              type="number"
              onChange={handlePoolStakeChange}
            />
          </div>
          <div style={{ padding: "0.5vh" }}>
            <input
              className="input_form_element_data"
              placeholder="Stake Limit"
              type="number"
              onChange={handleUserStakeLimitChange}
            />
            <div style={{ padding: "0.5vh" }}>
              <input
                className="input_form_element_data"
                placeholder="Lock Period"
                type="number"
                onChange={handleLockPeriodChange}
              />
            </div>
          </div>
          <div style={{ padding: "0.5vh" }}>
            <input
              className="input_form_element_data"
              placeholder="Reward %"
              type="number"
              onChange={handleRewardPercentageChange}
            />
          </div>
          <div style={{ width: "100%", padding: "10px" }}>
            <button
              onClick={updatePool}
              className="submit_button_admin"
              type="submit"
              style={{
                textDecoration: "none",
                width: "100%",
                height: "100%",
                cursor: isSubmitting ? "not-allowed" : "pointer",
                opacity: isSubmitting ? 0.5 : 1,
                marginLeft: -30
              }}
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? "Submiting..." : "Submit"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

export default AdminPageRight;
