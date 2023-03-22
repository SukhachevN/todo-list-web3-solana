import { web3, Program } from '@project-serum/anchor';
import { TodoListWeb3 } from '../../target/types/todo_list_web3';

export const getPdas = (
    user: web3.Keypair,
    program: Program<TodoListWeb3>,
    todoTitle: string
) => {
    const [todoPda] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from(todoTitle), user.publicKey.toBuffer()],
        program.programId
    );

    const [statsPda] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from('stats'), user.publicKey.toBuffer()],
        program.programId
    );

    const [mintAuthorityPda] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from('mint')],
        program.programId
    );

    const [achievementsPda] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from('achievements'), user.publicKey.toBuffer()],
        program.programId
    );

    const [aiImageGeneratorCounterPda] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from('ai_image_generator_counter'), user.publicKey.toBuffer()],
        program.programId
    );

    const [savedAiImagePda] = web3.PublicKey.findProgramAddressSync(
        [Buffer.from('saved_ai_image'), user.publicKey.toBuffer()],
        program.programId
    );

    return {
        todoPda,
        statsPda,
        mintAuthorityPda,
        achievementsPda,
        aiImageGeneratorCounterPda,
        savedAiImagePda,
    };
};
