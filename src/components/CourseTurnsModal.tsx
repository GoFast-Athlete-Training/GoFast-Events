import { X, Route } from 'lucide-react';

type RoutePoint = {
  id: string;
  location: string;
  description: string;
  mile: string;
};

type CourseTurnsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  routePoints: RoutePoint[];
};

const CourseTurnsModal = ({ isOpen, onClose, routePoints }: CourseTurnsModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative w-full max-w-4xl max-h-[90vh] rounded-3xl bg-white shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Route className="h-6 w-6 text-orange-500" />
            <h2 className="text-2xl font-semibold text-gray-900">Course Route Points</h2>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <p className="text-sm text-gray-600 mb-6">
            The 5K course has <strong>13 route points</strong> (turns and key locations). 
            These are the specific locations where marshals will be positioned.
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    #
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Location / Turn
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Course Description
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wide">
                    Approx. Mile
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {routePoints.map((point, index) => (
                  <tr key={point.id} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {index + 1}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">
                      {point.location}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {point.description}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {point.mile}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <button
            onClick={onClose}
            className="w-full rounded-full bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg transition hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseTurnsModal;

