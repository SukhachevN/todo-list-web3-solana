import { TodoType } from '@/shared/types';

export const formatDateToInput = (date: Date) => {
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);

    return `${year}-${month}-${day}`;
};

export const minDate = formatDateToInput(new Date());

export const maxDate = formatDateToInput(
    new Date(new Date().getFullYear() + 100, 31, 11)
);

export const getDateFromTodo = (todo: TodoType | null) =>
    !!todo?.deadline.toNumber()
        ? formatDateToInput(new Date(todo.deadline.toNumber()))
        : '';
