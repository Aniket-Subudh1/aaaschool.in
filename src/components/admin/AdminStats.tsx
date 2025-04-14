import Link from 'next/link';

interface AdminStatsProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  bgColor: string;
  iconColor: string;
  isLoading: boolean;
  href: string;
}

export default function AdminStats({
  title,
  count,
  icon,
  bgColor,
  iconColor,
  isLoading,
  href,
}: AdminStatsProps) {
  return (
    <Link href={href} className="block">
      <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-start">
          <div className={`p-3 rounded-full ${bgColor} ${iconColor}`}>
            {icon}
          </div>
          <div className="ml-4 flex-1">
            <h3 className="text-lg font-medium text-gray-700">{title}</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {isLoading ? (
                <span className="animate-pulse bg-gray-200 w-12 h-8 rounded inline-block"></span>
              ) : (
                count
              )}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}