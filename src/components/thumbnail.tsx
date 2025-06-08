
/*eslint-disable @next/next/no-img-element*/

import { Dialog, DialogTrigger, DialogContent } from "./ui/dialog";

interface ThumbnailProps {
    url: string | null | undefined;
};

export const Thumbnail = ({url}:ThumbnailProps) => {
    if(!url) return null;

    return(
        <Dialog>
            <DialogTrigger>
                <div className="relative overflow-hidden max-w-[360px] border rounded-lg my-2 cursor-zoom-in">
                <img src={url} className="rounded-md object-cover size-full" alt="Message image"/>
                </div>
            </DialogTrigger>
            <DialogContent className="max-w-[800px] border-none bg-transparent p-0 shadow-none">
                 <img src={url} className="rounded-md object-cover size-full" alt="Message image"/>
            </DialogContent>
        </Dialog>
    )
}