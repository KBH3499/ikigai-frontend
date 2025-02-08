import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import React, { useEffect, useImperativeHandle, useRef, useState } from "react";
import { AwesomeButton } from "react-awesome-button";

const NftPageLeft = React.forwardRef((props, ref) => {
  const { createAsset, minting, mintingAsset, connected, isTransactionPerformed, setIsTransactionPerformed } = props;
  const [nfts, setNfts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [missingNFTs, setMissingNFTs] = useState([]);
  const [page, setPage] = useState(1);

  const fetchImageAsBlob = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Image blocked: ${url}`);

      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch {
      return "fallback.png"; // Return fallback if the image fails
    }
  };

  const fetchNFTs = async () => {
    setLoading(true);

    const totalNFTs = 5; // Always aim to have 5 NFTs in state
    let fetchedNFTs = [];
    let missing = [];
    

    const existingNFTs = [...nfts]; // Current NFTs
    const fetchAfter =
      Number(existingNFTs[existingNFTs.length - 1]?.name?.split("_")[1]) ?? 0;
    let nextId = existingNFTs.length > 0 && !isTransactionPerformed ? fetchAfter + 1 : 1;

    while (fetchedNFTs.length < totalNFTs) {
      const id = nextId++;
      const checkUrl = `https://nft.ikigaionsol.com/api/v1/nftid/${id}`;

      let price;

      // Replace specific IDs with custom filenames
      let filename;
      if (id === 55) {
        filename = "BLACK";
        price = 2;
      } else if (id === 214) {
        filename = "NEGATIVE";
        price = 2;
      } else if (id === 307) {
        filename = "PURPL";
        price = 2;
      } else {
        filename = `IKI_${id}`; // Default format
        price = 0.1;
      }

      const metadataUrl = `https://nft.ikigaionsol.com/media/${filename}.json`;

      try {
        // Step 1: Check if NFT already exists
        const checkResponse = await fetch(checkUrl);
        if (!checkResponse.ok) throw new Error(`Failed to check NFT #${id}`);

        const checkData = await checkResponse.json();
        if (checkData.exists) {
          missing.push(id);
          continue; // Skip fetching metadata if NFT already exists
        }
      } catch (error) {
        console.log(`Error checking NFT #${id}: ${error.message}`);
      }

      try {
        // Step 2: Fetch metadata only if NFT doesn't exist
        const metadataResponse = await fetch(metadataUrl);
        if (!metadataResponse.ok)
          throw new Error(`Metadata for NFT #${id} not found`);

        const nftData = await metadataResponse.json();
        nftData.image = await fetchImageAsBlob(nftData.image);
        nftData.fileName = filename;
        nftData.price = price;

        fetchedNFTs.push(nftData);
      } catch (error) {}
    }

    if (nfts?.length > 0) {
      setNfts((prevNfts) => {
        const updatedNFTs = [...prevNfts, ...fetchedNFTs]; // Keep only last 5 NFTs
        return updatedNFTs;
      });
    } else {
      setNfts(fetchedNFTs);
    }

    if (missingNFTs?.length > 0) {
      setMissingNFTs((prevNfts) => {
        const updatedNFTs = [...prevNfts, ...missing]; // Keep only last 5 NFTs
        return updatedNFTs;
      });
    } else {
      setMissingNFTs(missing);
    }

    setLoading(false);
    setIsTransactionPerformed(false)

    console.log(
      `Fetched new NFTs: ${fetchedNFTs.length}, Metadata not found: ${missingNFTs.length}`
    );
  };

  useEffect(()=>{
    if(isTransactionPerformed){
      setNfts([])
    }
  },[isTransactionPerformed])

  useImperativeHandle(ref, () => ({
    fetchNFTs,
  }));

  useEffect(() => {
    if (connected) {
      fetchNFTs(page); // Fetch the NFTs for the first page when the component mounts
    }
  }, [page, connected]);

  const loadMore = () => {
    setLoading(true);
    setPage((prevPage) => prevPage + 1); // Increment page number to fetch next set of NFTs
  };



  return (
    // nft panel view
    <div className="demoPage comic_background_white_left" ref={ref}>
      <div className="pt-10 px-[5%] h-full">
        <div className="stake_main_font_style mb-4 text-left">
          <h1 className="font">NFT Panel</h1>
        </div>
        {connected && nfts?.length === 0 && (
          <div
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              marginTop: 150,
            }}
          >
            <div className="spinner"></div>
          </div>
        )}
        {!connected && (
          <div
            style={{
              marginTop: 150,
            }}
          >
            {" "}
            <WalletMultiButton />
          </div>
        )}
        {connected && (
          <>
            {" "}
            <div className="scrollable-div">
              {nfts?.map((nft) => (
                <div className="stake_border_1 p-3 flex gap-2 justify-between mb-3">
                  <div
                    className="stake_border_1"
                    style={{ width: "52px", height: "80px" }}
                  >
                    <img
                      alt=""
                      className="gallery_image"
                      src={nft?.image}
                      style={{ borderRadius: "0" }}
                    />
                  </div>
                  <div className="text-left self-end pb-1">
                    <h2 className="stake_main_font_style text-[11px] font-extrabold m-0 mb-2">
                      {nft?.name?.split("_")?.join(" ")}
                    </h2>
                    <h2 className="stake_main_font_style text-[11px] font-extrabold m-0 mb-2">
                      DETAILS
                    </h2>
                    <p className="text-gray m-0 text-[10px]">
                      Stake for 12 months
                    </p>
                    <p className="text-gray m-0 text-[10px]">
                      Buy 100 lottery tickets
                    </p>
                  </div>
                  <div className="text-left self-end pb-1">
                    <h2 className="stake_main_font_style text-[11px] font-extrabold m-0 mb-2">
                      REWARD
                    </h2>
                    <p className="text-gray m-0 text-[10px]">
                      Ticket price 10% decrease
                    </p>
                    <p className="text-gray m-0 text-[10px]">APY 5% increase</p>
                  </div>
                  <div className="self-end pb-1">
                    <div className="text-blue stake_main_font_style text-[14px] mb-4">
                      Price{" "}
                      <span className="stake_border_1 p-1">
                        {nft?.price ?? 0.1}
                      </span>
                    </div>
                    <AwesomeButton
                      className="stake-aws-btn2 "
                      type="primary"
                      style={{
                        // fontSize: "17px",
                        width: "100%",
                        height: "auto",
                      }}
                      onPress={() => createAsset(nft?.name, nft?.price)}
                      disabled={minting || mintingAsset === nft?.name}
                    >
                      <span className="stake_main_font_style">
                        {minting && mintingAsset === nft?.name
                          ? "Minting...."
                          : "Mint"}
                      </span>
                    </AwesomeButton>
                  </div>
                </div>
              ))}
            </div>
            {nfts?.length + missingNFTs?.length < 500 && nfts?.length > 0 && (
              <AwesomeButton
                className="stake-aws-btn2 "
                type="primary"
                style={{
                  // fontSize: "17px",
                  width: "50%",
                  height: "auto",
                  marginTop: 20,
                }}
                disabled={loading || minting} 
                onPress={loadMore}
              >
                <span className="stake_main_font_style">
                  {loading ? "Loading...." : "Load More"}
                </span>
              </AwesomeButton>
            )}
          </>
        )}
      </div>
    </div>
  );
});

export default NftPageLeft;
