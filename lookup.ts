import { Connection, Keypair, SystemProgram, PublicKey } from "@solana/web3.js";
import { Program, Wallet, AnchorProvider, Address } from "@coral-xyz/anchor";
import { WbaPrereq, IDL } from "./programs/wba_prereq";
import * as anchor from "@coral-xyz/anchor";
import wallet from "./wba-wallet.json";

const connection = new Connection("https://api.devnet.solana.com");
const keypair = Keypair.fromSecretKey(new Uint8Array(wallet));

const provider = new AnchorProvider(connection, new Wallet(keypair), {});
anchor.setProvider(provider);

const program = new Program<WbaPrereq>(
  IDL,
  "HC2oqz2p6DEWfrahenqdq2moUcga9c9biqRBcdK3XKU1" as Address,
  provider
);

const pda_seeds = [Buffer.from("prereq"), keypair.publicKey.toBuffer()];

const [enrollment_key, _bump] = PublicKey.findProgramAddressSync(
  pda_seeds,
  program.programId
);

(async () => {
  try {
    const accounts = await program.account.prereqAccount.fetch(enrollment_key);

    console.log("github username: ", accounts.github.toString());
    console.log("wallet address: ", accounts.key.toBase58());
  } catch (error) {
    console.error("Error fetching account data:", error);
  }
})();
