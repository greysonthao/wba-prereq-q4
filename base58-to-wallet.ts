import bs58 from "bs58";
import promptSync from "prompt-sync";

const base58ToWallet = () => {
  const prompt = promptSync();

  const input = prompt("Enter your secret key: ");

  try {
    const privKey = bs58.decode(input);
    console.log("privKey: ", privKey);
  } catch (error) {
    console.error("Error decoding the base58 string:", error);
  }
};

base58ToWallet();
