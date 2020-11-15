'use strict';

const FabricCAServices = require('fabric-ca-client');
const { Wallets, Gateway } = require('fabric-network');
const fs = require('fs');

const ccp = JSON.parse(fs.readFileSync('/opt/peerOrganizations/org1.blockchain.sensefinity.com/connection-org1.json', 'utf8'));
const username = 'user';

let gateway = null;
let network = null;
let wallet = null;
let contract = null;

exports.enrollAdmin = async function () {
    wallet = await Wallets.newFileSystemWallet('/opt/wallet');
    if (await wallet.get('admin')) return;
    console.log('Enrolling admin');
    const caInfo = ccp.certificateAuthorities['ca.org1.blockchain.sensefinity.com'];
    const ca = new FabricCAServices(caInfo.url, { trustedRoots: caInfo.tlsCACerts.pem, verify: false }, caInfo.caName);
    const enrollment = await ca.enroll({ enrollmentID: 'admin', enrollmentSecret: 'adminpw' });
    const x509Identity = {
        credentials: {
            certificate: enrollment.certificate,
            privateKey: enrollment.key.toBytes(),
        },
        mspId: 'Org1MSP',
        type: 'X.509',
    };
    await wallet.put('admin', x509Identity);
    console.log('Enrolled admin successfully');
}

exports.registerUser = async function () {
    if (await wallet.get(username)) return;
    if (!await wallet.get('admin')) throw Error('An identity for the admin does not exist in the wallet.');
    console.log('Enrolling user');
    gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: 'admin', discovery: { enabled: true, asLocalhost: false } });
    const caInfo = ccp.certificateAuthorities['ca.org1.blockchain.sensefinity.com'];
    const ca = new FabricCAServices(caInfo.url, { trustedRoots: caInfo.tlsCACerts.pem, verify: false }, caInfo.caName);
    const adminIdentity = gateway.getIdentity();
    const provider = wallet.getProviderRegistry().getProvider(adminIdentity.type);
    const adminUser = await provider.getUserContext(adminIdentity, 'admin');
    const secret = await ca.register({ affiliation: 'org1.department1', enrollmentID: username, role: 'client' }, adminUser);
    const enrollment = await ca.enroll({ enrollmentID: username, enrollmentSecret: secret });
    const x509Identity = {
        credentials: {
            certificate: enrollment.certificate,
            privateKey: enrollment.key.toBytes(),
        },
        mspId: 'Org1MSP',
        type: 'X.509',
    };
    await wallet.put(username, x509Identity);
    console.log('Enrolled user successfully');
}

exports.connect = async function () {
    if (!await wallet.get(username)) throw Error(`An identity for the user ${username} does not exist in the wallet.`);
    gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: username, discovery: { enabled: true, asLocalhost: false } });
    network = await gateway.getNetwork('mychannel');
    contract = network.getContract('sensefinity');
}

exports.getContract = async function () {
    return contract;
}
