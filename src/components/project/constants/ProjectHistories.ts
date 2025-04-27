export type Projects = {
  name: string;
  company: string;
  previewImageId: string;
  id: string;
  shorts?: string;
};

export const projects: Projects[] = [
  {
    id: "knightsafe",
    name: "KnightSafe",
    company: "KS Lab",
    previewImageId: "cykmvjttfgmm0bznqai3",
    shorts:
      "An open-source, transparent, and self-custody wallet for blockchain.",
  },
  {
    id: "pex",
    name: "PEX - ZkSync Exchange",
    company: "Pex Exchange",
    previewImageId: "pxwxl5opqea93na7mfa8",
    shorts:
      "A decentralized exchange to trade BTC, ETH, and other top cryptocurrencies on the ZkSync network.",
  },
  {
    id: "its-glass",
    name: "ITS Glass",
    company: "ITS Glass",
    previewImageId: "vyoh1ogrdb8tdys1i7pf",
    shorts:
      "A branding and marketing webpage for a company dedicated to assisting businesses in their growth and success.",
  },
  {
    id: "dearshare",
    name: "DearShare",
    company: "WeMakeApp",
    previewImageId: "wyivpnvxf7dui5vrzl1q",
    shorts:
      "A platform for sharing and discovering content, connecting with friends, and exploring new ideas.",
  },
  {
    id: "beastroid",
    name: "Beastroid",
    company: "Polkafantasy",
    previewImageId: "bhkmvcqqbxp7824ejmgi",
    shorts:
      "The NFT collection for Polkafantasy has been designed by Keiji Inafune, a prominent Japanese video game producer.",
  },
  {
    id: "polkafantasy",
    name: "Polkafantasy",
    company: "Polkafantasy",
    previewImageId: "sklurd1rebfrvi8gw12g",
    shorts:
      "A branding page for a GameFi project: Polkafantasy-The Game of Polkafantasy.",
  },
  {
    id: "polkafantasy-game",
    name: "Game of Polkafantasy",
    company: "Polkafantasy",
    previewImageId: "gdnfsesk34ifdeqynkja",
    shorts:
      "A landing page for the Polkafantasy, a blockchain-based game that allows players to Play to Earn and trade NFTs.",
  },
];
