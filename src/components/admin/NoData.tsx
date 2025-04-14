import { FolderPlus } from 'lucide-react';

interface NoDataProps {
  message: string;
  buttonText: string;
  href: string;
}

export default function NoData({ message, buttonText, href }: NoDataProps) {
  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 p-12 text-center">
      <FolderPlus size={48} className="mx-auto text-gray-400 mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">{message}</h3>
      <p className="text-gray-500 mb-6">
        No data to display. Get started by creating a new entry.
      </p>
      <a
        href={href}
        className="inline-flex items-center px-4 py-2 bg-[#8b1a1a] text-white rounded-md hover:bg-[#8b1a1a]/90"
      >
        {buttonText}
      </a>
    </div>
  );
}