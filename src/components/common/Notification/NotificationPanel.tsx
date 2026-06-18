import "./NotificationPanel.css";

interface Notification {
  id: number;
  title: string;
  body: string;
  date: string;
  unread: boolean;
}

const notifications: Notification[] = [
  {
    id: 1,
    title: "Notification Title",
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin suscipit lectus quis neque eleifend, tempor sagittis tortor efficitur.",
    date: "12 May, 2026",
    unread: true,
  },
  {
    id: 2,
    title: "Notification Title",
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin suscipit lectus quis neque eleifend, tempor sagittis tortor efficitur.",
    date: "12 May, 2026",
    unread: true,
  },
  {
    id: 3,
    title: "Notification Title",
    body:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin suscipit lectus quis neque eleifend, tempor sagittis tortor efficitur.",
    date: "12 May, 2026",
    unread: false,
  },
];

export default function NotificationPanel() {
  return (
    <div className="notifications">
      <div className="notifications__header">
        <h3>Notifications</h3>
        <button>Mark all as read</button>
      </div>

      <div className="notifications__tabs">
        <button className="active">All 11</button>
        <button>Offers 2</button>
        <button>Payments 6</button>
        <button>Reminders</button>
      </div>

      <div className="notifications__list">
        {notifications.map((item) => (
          <div
            key={item.id}
            className={`notification-card ${item.unread ? "unread" : ""}`}
          >
            <h4>
              <span className="dot" />
              {item.title}
            </h4>

            <p>{item.body}</p>

            <span>{item.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
}