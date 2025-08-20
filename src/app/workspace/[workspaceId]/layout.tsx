"use client";

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";

import { Toolbar } from "./toolbar";
import { Sidebar } from "./sidebar";
import { WorkspaceSidebar } from "./workspace-sidebar";
import { usePanel } from "@/hooks/use-panel";
import { Loader } from "lucide-react";
import { Id } from "../../../../convex/_generated/dataModel";
import { Thread } from "@/features/messages/components/thread";
import { Profile } from "@/features/members/components/profile";


interface WorkspaceIdLayoutProps {
    children: React.ReactNode;
}


const WorkspaceIdLayout = ({ children }: WorkspaceIdLayoutProps) => {

    const {parentMessageId, profileMemberId, onClose} = usePanel();

    const showPanel = !!parentMessageId || !!profileMemberId;

    return (
        <div className="h-full">
            <Toolbar/>
            <div className="flex h-[calc(100vh-40px)]">
                <Sidebar/>
                <ResizablePanelGroup direction="horizontal" autoSaveId="ca-workspace-layout">
                    <ResizablePanel defaultSize={20} minSize={20} className="bg-[#2d3748]">
                        <WorkspaceSidebar/>
                    </ResizablePanel>
                    <ResizableHandle withHandle/>
                    <ResizablePanel defaultSize={80} minSize={20}>
                        {children}
                    </ResizablePanel>
                    {showPanel && (
                        <>
                            <ResizableHandle withHandle/>
                            <ResizablePanel minSize={30} defaultSize={29}>
                                {parentMessageId ? (
                                    <Thread messageId={parentMessageId as Id<"messages">} 
                                            onClose={onClose}
                                    />
                                ) : profileMemberId ? (
                                    <Profile
                                        memberId = {profileMemberId as Id<"members">}
                                        onClose={onClose}
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center">
                                        <Loader className="size-5 animate-spin text-muted-foreground"/>
                                    </div>
                                )}
                                
                            </ResizablePanel>
                        </>
                    )}
                </ResizablePanelGroup>
                
            </div>
            
        </div>
    );
}

export default WorkspaceIdLayout;