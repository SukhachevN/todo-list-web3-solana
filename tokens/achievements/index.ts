import { web3 } from '@project-serum/anchor';
import { initializeKeypair } from '../initializeKeypair';
import * as fs from 'fs';
import {
    bundlrStorage,
    keypairIdentity,
    Metaplex,
    toMetaplexFile,
} from '@metaplex-foundation/js';

const createMetadata = async (
    connection: web3.Connection,
    payer: web3.Keypair
) => {
    const metaplex = Metaplex.make(connection)
        .use(keypairIdentity(payer))
        .use(
            bundlrStorage({
                address: 'https://devnet.bundlr.network',
                providerUrl: 'https://api.devnet.solana.com',
                timeout: 60000,
            })
        );

    for (let i = 0; i < 12; i++) {
        const imageBuffer = fs.readFileSync(
            `tokens/achievements/assets/${i}.png`
        );

        const metadataBuffer = fs.readFileSync(
            `tokens/achievements/assets/${i}.json`
        );

        const metadata = JSON.parse(metadataBuffer.toString());

        const file = toMetaplexFile(imageBuffer, `${i}.png`);

        const image = await metaplex.storage().upload(file);

        const { uri } = await metaplex.nfts().uploadMetadata({
            ...metadata,
            image,
        });

        fs.writeFileSync(
            `tokens/achievements/cache/${i}.json`,
            JSON.stringify({
                name: metadata.name,
                metadataUri: uri,
            })
        );
    }
};

async function main() {
    const connection = new web3.Connection(web3.clusterApiUrl('devnet'));
    const payer = await initializeKeypair(connection);

    await createMetadata(connection, payer);
}

main()
    .then(() => {
        console.log('Finished successfully');
        process.exit(0);
    })
    .catch((error) => {
        console.log(error);
        process.exit(1);
    });
