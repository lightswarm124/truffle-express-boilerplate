const getContract = async (web3, contractDefinition) => {
    // get networkId and deployed address
    const networkId = await web3.eth.net.getId();
    const deployedAddress = contractDefinition.networks[networkId].address;

    // create instance
    const instance = new web3.eth.Contract(contractDefinition.abi, deployedAddress);
    return instance;
}

export default getContract;
