import { ActivityCardProps } from "../_types/IActivityCardProps";

const ActivityCard: React.FC<ActivityCardProps> = ({ activity }) => {
  return (
    <div className="activity-card border-4 border-emerald-700 border- p-4 m-4 rounded-lg w-80 h-60 bg-emerald-950 overflow-hidden">

      <h2 className="text-2xl font-semibold mb-2 text-center">{activity.name}</h2>

      <p className="text-sm text-emerald-200 mb-2 line-clamp-3">
        {activity.description}
      </p>

      <p className="text-sm mb-2 text-emerald-400">
        Temperature: {activity.temp_min}°C  -  {activity.temp_max}°C
      </p>

      <p className="text-sm text-emerald-600">
        Price: ${activity.price_min}  -  ${activity.price_max}
      </p>

    </div>
  );
};

export default ActivityCard;
