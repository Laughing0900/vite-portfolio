import { format } from "date-fns";

export const formatDate = (date: string): string => {
    return format(date, "MMM yyyy");
};
