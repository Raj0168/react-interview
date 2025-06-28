interface MessageProps {
  message: string;
  onClose: () => void;
}

export default function MessageBox({ message, onClose }: MessageProps) {
  if (!message) return;

  return (
    <div>
      <p>{message}</p>
      <button onClick={onClose}>Close</button>
    </div>
  );
}
