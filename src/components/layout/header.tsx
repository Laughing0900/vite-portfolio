import { Dispatch, FC, SetStateAction, useCallback } from "react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

type WithHeaderProps = {
    setOpenGrid: Dispatch<SetStateAction<boolean>>;
    openGrid: boolean;
};

const WithHeader: FC<WithHeaderProps> = ({ setOpenGrid, openGrid }) => {
    const toggleGrid = useCallback(() => {
        setOpenGrid((prev) => !prev);
    }, [setOpenGrid]);

    return (
        <header className="grid-template fixed top-0 z-50 grid w-full pt-8">
            <div className="col-start-4 flex items-center gap-2 md:col-start-8">
                <Label htmlFor="grid-mode">Grid</Label>
                <Switch
                    checked={openGrid}
                    onCheckedChange={toggleGrid}
                    id="grid-mode"
                />
            </div>
        </header>
    );
};

export default WithHeader;
