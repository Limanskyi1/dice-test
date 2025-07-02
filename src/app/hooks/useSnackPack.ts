import { SnackbarCloseReason } from "@mui/material";
import { useState, useEffect, SyntheticEvent } from "react";

interface SnackbarMessage {
  message: string;
}

export const useSnackPack = <T extends SnackbarMessage>() => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<T[]>([]);
  const [messageInfo, setMessageInfo] = useState<T>();

  useEffect(() => {
    if (messages.length && !messageInfo) {
      setMessageInfo({ ...messages[0] });
      setMessages((prev) => prev.slice(1));
      setOpen(true);
    } else if (messages.length && messageInfo && open) {
      setOpen(false);
    }
  }, [messages, messageInfo, open]);

  const show = (message: T) => {
    setMessages((prev) => [...prev, {
      ...message
    }]);
  };

  const close = (event: SyntheticEvent | Event, reason: SnackbarCloseReason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const exit = () => setMessageInfo(undefined);

  return {
    messages,
    messageInfo,
    open,
    show,
    close,
    exit,
  };
};
