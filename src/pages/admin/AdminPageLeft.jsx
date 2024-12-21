import React from "react";

const AdminPageLeft = React.forwardRef((props, ref) => {
//   const updatePool = async () => {
//     try {

//         const userWallet = provider.wallet.publicKey;

//         const userStakingWallet = await getOrCreateAssociatedTokenAccount(
//             connection,
//             adminKeyPair,
//             stakingTokenMint,
//             userWallet,
//         );

//         const adminTokenAccount = await getOrCreateAssociatedTokenAccount(
//             connection,
//             adminKeyPair,
//             stakingTokenMint,
//             adminKeyPair.publicKey,
//         );

//         console.log({
//             userWallet,
//             userStakingWallet,
//             adminTokenAccount,
//         });

//         const accounts = {
//             user: userWallet,
//             admin: adminKeyPair.publicKey,
//             userInfo: publicKey,
//             userStakingWallet: userStakingWallet.address,
//             adminStakingWallet: adminTokenAccount.address,
//             stakingToken: stakingTokenMint,
//             poolInfo: poolKeyPair.publicKey,
//             tokenProgram: TOKEN_PROGRAM_ID,
//             systemProgram: SystemProgram.programId,
//         };

//         const accounts2 = {
//             user: userWallet.toString(),
//             admin: adminKeyPair.publicKey.toString(),
//             userInfo: publicKey.toString(),
//             userStakingWallet: userStakingWallet.address.toString(),
//             adminStakingWallet: adminTokenAccount.address.toString(),
//             stakingToken: stakingTokenMint.toString(),
//             poolInfo: poolKeyPair.publicKey.toString(),
//             tokenProgram: TOKEN_PROGRAM_ID.toString(),
//             systemProgram: SystemProgram.programId.toString(),
//         };

//         console.log({ accounts, accounts2 });

//         const index = 1; // Index to update
//         const newDetail = {
//             lockSeconds: new BN(14),
//             poolSize: new BN(20000000000000),
//             userLimit: new BN(3000000000),
//             rewardPercentage: new BN(50),
//         };

//         const tx = await program.methods
//             .updatePoolDetail(index, newDetail)
//             .accounts({
//                 admin: adminKeyPair.publicKey, // Admin account required here
//                 poolInfo: poolKeyPair.publicKey,
//             })
//             .signers([adminKeyPair]) // Unauthorized user
//             .rpc();

//         console.log("Stake transaction successful:", tx);
//     } catch (error) {
//         console.error("Error staking tokens:", error);
//     }
// };
  return (
    <div className={`demoPage comic_background_white_left ${props?.isMobile ? "" : "center_div"}`} ref={ref}>
      <h1 className="font">Admin Actions</h1>
    </div>
  );
});

export default AdminPageLeft;
