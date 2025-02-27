const { deployProxy } = require('@openzeppelin/truffle-upgrades');

const ERC721Rarible = artifacts.require('ERC721Rarible');
const ERC1155Rarible = artifacts.require('ERC1155Rarible');

const rinkeby = {
	erc721LazyMintTransferProxy: "0xE6bB91E8fAcf3717D5f28093Efc8E0fE00994cb1",
	erc1155LazyMintTransferProxy: "0x7c4B13B5893cD82f371c5e28f12FB2F37542BbC5",
	transferProxy: "0x7d47126a2600E22eab9eD6CF0e515678727779A6"
}
const e2e = {
	erc721LazyMintTransferProxy: "0xe853B9994304264ff418b818A8D23FD39e8DABe6",
	erc1155LazyMintTransferProxy: "0x6E605A7d1FD15e9087f0756ab57E0ED99735a7a7",
	transferProxy: "0x66611f8d97688a0af08d4337d7846efec6995d58"
}
const def = {
	erc721LazyMintTransferProxy: "0x0000000000000000000000000000000000000000",
	erc1155LazyMintTransferProxy: "0x0000000000000000000000000000000000000000",
	transferProxy: "0x0000000000000000000000000000000000000000"
}
let settings = {
	"default": def,
	"rinkeby": rinkeby,
	"rinkeby-fork": rinkeby,
	"e2e": e2e,
	"e2e-fork": e2e
};

function getSettings(network) {
	if (settings[network] !== undefined) {
		return settings[network];
	} else {
		return settings["default"];
	}
}

module.exports = async function (deployer, network) {
	const { erc721LazyMintTransferProxy, erc1155LazyMintTransferProxy, transferProxy } = getSettings(network);
	const erc721 = await ERC721Rarible.deployed();
	const erc1155 = await ERC1155Rarible.deployed();

	await erc721.setDefaultApproval(erc721LazyMintTransferProxy, true, { gas: 100000 });
	await erc721.setDefaultApproval(transferProxy, true, { gas: 100000 });
	await erc1155.setDefaultApproval(erc1155LazyMintTransferProxy, true, { gas: 100000 });
	await erc1155.setDefaultApproval(transferProxy, true, { gas: 100000 });
};
