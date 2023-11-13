"use client";
import React, { useEffect, useState } from "react";
import { LiveKitRoom, VideoConference } from "@livekit/components-react";
import { useSession } from "next-auth/react";
import "@livekit/components-styles";
import { Loader2 } from "lucide-react";

interface Props {
  chatId: string;
  video: boolean;
  audio: boolean;
}

const MediaRoom = ({ audio, chatId, video }: Props) => {
  const { data: session } = useSession();

  const [token, setToken] = useState("");

  useEffect(() => {
    if (!session?.user?.name) return;

    const name = session?.user?.name;
    console.log(name);
    (async () => {
      try {
        const resp = await fetch(
          `/api/livekit?room=${chatId}&username=${name}`
        );
        const data = await resp.json();
        console.log(data);
        setToken(data.token);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [session?.user?.name, chatId]);

  if (token === "") {
    return (
      <div className="flex flex-col flex-1 justify-center items-center">
        <Loader2 className="h-7 w-7 text-zinc-500 animate-spin my-4" />
        <p className="text-xs text-zinc-500 dark:text-zinc-400">Loading...</p>
      </div>
    );
  }
  return (
    <LiveKitRoom
      data-lk-theme="default"
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      token={token}
      connect
      video={video}
      audio={audio}
    >
      <VideoConference />
    </LiveKitRoom>
  );
};

export default MediaRoom;
