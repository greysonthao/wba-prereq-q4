import bs58 from "bs58";
import devWallet from "./dev-wallet.json";
import wbaWallet from "./wba-wallet.json";

const walletToBase58 = () => {
  const wallet: number[] = wbaWallet;
  console.log("wallet: ", wallet);

  const privKey = new Uint8Array(wallet);

  const base58 = bs58.encode(privKey);
  console.log("privKey: ", base58);
};

walletToBase58();
