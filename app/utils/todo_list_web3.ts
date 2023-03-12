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
            "type": "bool"
          },
          {
            "name": "completeOneTodo",
            "type": "bool"
          },
          {
            "name": "deleteOneTodo",
            "type": "bool"
          },
          {
            "name": "createTenTodos",
            "type": "bool"
          },
          {
            "name": "completeTenTodos",
            "type": "bool"
          },
          {
            "name": "deleteTenTodos",
            "type": "bool"
          },
          {
            "name": "createHundreedTodos",
            "type": "bool"
          },
          {
            "name": "completeHundreedTodos",
            "type": "bool"
          },
          {
            "name": "deleteHundreedTodos",
            "type": "bool"
          },
          {
            "name": "createThousandTodos",
            "type": "bool"
          },
          {
            "name": "completeThousandTodos",
            "type": "bool"
          },
          {
            "name": "deleteThousandTodos",
            "type": "bool"
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
            "type": "bool"
          },
          {
            "name": "completeOneTodo",
            "type": "bool"
          },
          {
            "name": "deleteOneTodo",
            "type": "bool"
          },
          {
            "name": "createTenTodos",
            "type": "bool"
          },
          {
            "name": "completeTenTodos",
            "type": "bool"
          },
          {
            "name": "deleteTenTodos",
            "type": "bool"
          },
          {
            "name": "createHundreedTodos",
            "type": "bool"
          },
          {
            "name": "completeHundreedTodos",
            "type": "bool"
          },
          {
            "name": "deleteHundreedTodos",
            "type": "bool"
          },
          {
            "name": "createThousandTodos",
            "type": "bool"
          },
          {
            "name": "completeThousandTodos",
            "type": "bool"
          },
          {
            "name": "deleteThousandTodos",
            "type": "bool"
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
