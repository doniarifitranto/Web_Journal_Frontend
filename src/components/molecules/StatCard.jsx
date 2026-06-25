export default function StatCard({ title, value, change, isPositive, icon: Icon, iconBg, iconColor }) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-neutral-border/60 shadow-xs flex flex-col justify-between hover:border-sage-300 transition-all">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-text-muted text-xs font-medium mb-1">{title}</p>
                    <h3 className="text-3xl font-bold text-text-dark">{value}</h3>
                </div>
                <div className={'p-3 rounded-xl ${iconBg} ${iconColor}'}>
                    <Icon size={22} />
                </div>
            </div>

            <div className="flex items-center gap-1.5 mt-4 text-xs font-medium">
                <span className={isPositive ? "text-status-healthy font-bold" : "text-status-burnout font-bold"}>
                    {change}
                </span>
            </div>
        </div>
    );

}