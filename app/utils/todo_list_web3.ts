export type TodoListWeb3 = {
  "version": "0.1.0",
  "name": "todo_list_web3",
  "instructions": [
    {
      "name": "createTodo",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "todo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stats",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "CreateTodoParams"
          }
        }
      ]
    },
    {
      "name": "updateTodo",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "todo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stats",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "UpdateTodoParams"
          }
        }
      ]
    },
    {
      "name": "deleteTodo",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "todo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stats",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "mintAchievementNft",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "stats",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "achievements",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "masterEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "MintAchievementNftParams"
          }
        }
      ]
    },
    {
      "name": "initAiImageGenerator",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "aiImageGeneratorCounter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "savedAiImage",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "buyAiImageGeneratorTry",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "aiImageGeneratorCounter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u32"
        }
      ]
    },
    {
      "name": "useAiImageGeneratorTry",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "aiImageGeneratorCounter",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "mintAiImageNft",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "savedAiImage",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "todoTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "todoTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "masterEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "nftTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "uri",
          "type": "string"
        }
      ]
    },
    {
      "name": "saveAiImage",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "savedAiImage",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "uri",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "statsState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "created",
            "type": "u64"
          },
          {
            "name": "completed",
            "type": "u64"
          },
          {
            "name": "deleted",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "todoState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "deadline",
            "type": "i64"
          },
          {
            "name": "isCompleted",
            "type": "bool"
          },
          {
            "name": "createDate",
            "type": "i64"
          },
          {
            "name": "completeDate",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "achievementsState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "createOneTodo",
            "type": "publicKey"
          },
          {
            "name": "completeOneTodo",
            "type": "publicKey"
          },
          {
            "name": "deleteOneTodo",
            "type": "publicKey"
          },
          {
            "name": "createTenTodos",
            "type": "publicKey"
          },
          {
            "name": "completeTenTodos",
            "type": "publicKey"
          },
          {
            "name": "deleteTenTodos",
            "type": "publicKey"
          },
          {
            "name": "createHundreedTodos",
            "type": "publicKey"
          },
          {
            "name": "completeHundreedTodos",
            "type": "publicKey"
          },
          {
            "name": "deleteHundreedTodos",
            "type": "publicKey"
          },
          {
            "name": "createThousandTodos",
            "type": "publicKey"
          },
          {
            "name": "completeThousandTodos",
            "type": "publicKey"
          },
          {
            "name": "deleteThousandTodos",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "aiImageGeneratingCounterState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tryCount",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "savedAiImageState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "mint",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "CreateTodoParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "deadline",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "MintAchievementNftParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": {
              "defined": "AchievementAmount"
            }
          },
          {
            "name": "actionType",
            "type": {
              "defined": "ActionType"
            }
          }
        ]
      }
    },
    {
      "name": "UpdateTodoParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "deadline",
            "type": "i64"
          },
          {
            "name": "isCompleted",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "AiImageGeneratorCounterError",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "NegativeTryAmount"
          },
          {
            "name": "NotEnoughTries"
          }
        ]
      }
    },
    {
      "name": "ActionType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Create"
          },
          {
            "name": "Complete"
          },
          {
            "name": "Delete"
          }
        ]
      }
    },
    {
      "name": "AchievementAmount",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "One"
          },
          {
            "name": "Ten"
          },
          {
            "name": "Hundreed"
          },
          {
            "name": "Thousand"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "AlreadyUnlocked",
      "msg": "Achievement already unlocked!"
    },
    {
      "code": 6001,
      "name": "NotEnoughCreated",
      "msg": "Not enough todos created to unlock achievement"
    },
    {
      "code": 6002,
      "name": "NotEnoughCompleted",
      "msg": "Not enough todos completed to unlock achievement"
    },
    {
      "code": 6003,
      "name": "NotEnoughDeleted",
      "msg": "Not enough todos deleted to unlock achievement"
    }
  ]
};

export const IDL: TodoListWeb3 = {
  "version": "0.1.0",
  "name": "todo_list_web3",
  "instructions": [
    {
      "name": "createTodo",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "todo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stats",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "CreateTodoParams"
          }
        }
      ]
    },
    {
      "name": "updateTodo",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "todo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stats",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "UpdateTodoParams"
          }
        }
      ]
    },
    {
      "name": "deleteTodo",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "todo",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "stats",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "mintAchievementNft",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "stats",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "achievements",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "masterEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "params",
          "type": {
            "defined": "MintAchievementNftParams"
          }
        }
      ]
    },
    {
      "name": "initAiImageGenerator",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "aiImageGeneratorCounter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "savedAiImage",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "buyAiImageGeneratorTry",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "aiImageGeneratorCounter",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "amount",
          "type": "u32"
        }
      ]
    },
    {
      "name": "useAiImageGeneratorTry",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "aiImageGeneratorCounter",
          "isMut": true,
          "isSigner": false
        }
      ],
      "args": []
    },
    {
      "name": "mintAiImageNft",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "savedAiImage",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "todoTokenMint",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "mintAuthority",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "todoTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "tokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "associatedTokenProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "metadata",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "masterEdition",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "nftMint",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "nftTokenAccount",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "rent",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        },
        {
          "name": "tokenMetadataProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "uri",
          "type": "string"
        }
      ]
    },
    {
      "name": "saveAiImage",
      "accounts": [
        {
          "name": "user",
          "isMut": true,
          "isSigner": true
        },
        {
          "name": "savedAiImage",
          "isMut": true,
          "isSigner": false
        },
        {
          "name": "systemProgram",
          "isMut": false,
          "isSigner": false
        }
      ],
      "args": [
        {
          "name": "uri",
          "type": "string"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "statsState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "created",
            "type": "u64"
          },
          {
            "name": "completed",
            "type": "u64"
          },
          {
            "name": "deleted",
            "type": "u64"
          }
        ]
      }
    },
    {
      "name": "todoState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "user",
            "type": "publicKey"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "deadline",
            "type": "i64"
          },
          {
            "name": "isCompleted",
            "type": "bool"
          },
          {
            "name": "createDate",
            "type": "i64"
          },
          {
            "name": "completeDate",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "achievementsState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "createOneTodo",
            "type": "publicKey"
          },
          {
            "name": "completeOneTodo",
            "type": "publicKey"
          },
          {
            "name": "deleteOneTodo",
            "type": "publicKey"
          },
          {
            "name": "createTenTodos",
            "type": "publicKey"
          },
          {
            "name": "completeTenTodos",
            "type": "publicKey"
          },
          {
            "name": "deleteTenTodos",
            "type": "publicKey"
          },
          {
            "name": "createHundreedTodos",
            "type": "publicKey"
          },
          {
            "name": "completeHundreedTodos",
            "type": "publicKey"
          },
          {
            "name": "deleteHundreedTodos",
            "type": "publicKey"
          },
          {
            "name": "createThousandTodos",
            "type": "publicKey"
          },
          {
            "name": "completeThousandTodos",
            "type": "publicKey"
          },
          {
            "name": "deleteThousandTodos",
            "type": "publicKey"
          }
        ]
      }
    },
    {
      "name": "aiImageGeneratingCounterState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "tryCount",
            "type": "u32"
          }
        ]
      }
    },
    {
      "name": "savedAiImageState",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "uri",
            "type": "string"
          },
          {
            "name": "mint",
            "type": "publicKey"
          }
        ]
      }
    }
  ],
  "types": [
    {
      "name": "CreateTodoParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "deadline",
            "type": "i64"
          }
        ]
      }
    },
    {
      "name": "MintAchievementNftParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "amount",
            "type": {
              "defined": "AchievementAmount"
            }
          },
          {
            "name": "actionType",
            "type": {
              "defined": "ActionType"
            }
          }
        ]
      }
    },
    {
      "name": "UpdateTodoParams",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "deadline",
            "type": "i64"
          },
          {
            "name": "isCompleted",
            "type": "bool"
          }
        ]
      }
    },
    {
      "name": "AiImageGeneratorCounterError",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "NegativeTryAmount"
          },
          {
            "name": "NotEnoughTries"
          }
        ]
      }
    },
    {
      "name": "ActionType",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "Create"
          },
          {
            "name": "Complete"
          },
          {
            "name": "Delete"
          }
        ]
      }
    },
    {
      "name": "AchievementAmount",
      "type": {
        "kind": "enum",
        "variants": [
          {
            "name": "One"
          },
          {
            "name": "Ten"
          },
          {
            "name": "Hundreed"
          },
          {
            "name": "Thousand"
          }
        ]
      }
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "AlreadyUnlocked",
      "msg": "Achievement already unlocked!"
    },
    {
      "code": 6001,
      "name": "NotEnoughCreated",
      "msg": "Not enough todos created to unlock achievement"
    },
    {
      "code": 6002,
      "name": "NotEnoughCompleted",
      "msg": "Not enough todos completed to unlock achievement"
    },
    {
      "code": 6003,
      "name": "NotEnoughDeleted",
      "msg": "Not enough todos deleted to unlock achievement"
    }
  ]
};
