import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { TodoListWeb3 } from "../target/types/todo_list_web3";

describe("todo-list-web3", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.TodoListWeb3 as Program<TodoListWeb3>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
