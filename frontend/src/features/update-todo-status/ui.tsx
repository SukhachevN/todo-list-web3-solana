import { Switch, useToast } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { ChangeEvent, Dispatch, FC, SetStateAction } from 'react';

import { useWorkspace } from '@/app/providers/WorkspaceProvider';
import { getDateFromTodo } from '@/shared/date';
import { handleCreateUpdateTodo } from '@/shared/helpers/handle-create-update-todo';
import { TodoCardType } from '@/shared/types';

type UpdateTodoStatusSwitchType = {
    setIsUpdating: Dispatch<SetStateAction<boolean>>;
} & TodoCardType;

const UpdateTodoStatusSwitch: FC<UpdateTodoStatusSwitchType> = ({
    todo,
    index,
    setTodos,
    setIsUpdating,
}) => {
    const { publicKey, sendTransaction } = useWallet();

    const { program, connection } = useWorkspace();

    const toast = useToast();

    const onChange = ({
        target: { checked },
    }: ChangeEvent<HTMLInputElement>) => {
        if (!todo) return;

        const todoState = {
            ...todo,
            deadline: getDateFromTodo(todo),
            isCompleted: checked,
        };

        handleCreateUpdateTodo({
            index,
            toast,
            connection,
            todo,
            todoState,
            program,
            publicKey,
            sendTransaction,
            setIsUpdating,
            setTodos,
        });
    };

    return (
        <Switch
            name="isCompleted"
            isChecked={todo?.isCompleted}
            onChange={onChange}
        />
    );
};

export default UpdateTodoStatusSwitch;
