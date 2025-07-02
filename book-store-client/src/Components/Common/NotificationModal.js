import { useNotification } from "../../context/NotificationContext";

export default function NotificationModal() {
  const { message, type } = useNotification();

  if (!message) return null;

  return (
    <div className={`notification-modal ${type}`}>
      {message}
    </div>
  );
}
