import { X, Repeat, Navigation } from 'lucide-react';

type MarshalPosition = {
  id: string;
  name: string;
  description: string;
  repositioning: string;
  routePoints: string;
};

type MarshalDetailsModalProps = {
  isOpen: boolean;
  onClose: () => void;
  position: MarshalPosition | null;
};

const MarshalDetailsModal = ({ isOpen, onClose, position }: MarshalDetailsModalProps) => {
  if (!isOpen || !position) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="relative w-full max-w-2xl max-h-[90vh] rounded-3xl bg-white shadow-xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-orange-500 p-2">
              <Navigation className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{position.name}</h2>
              <p className="text-sm text-gray-500 mt-1">{position.routePoints}</p>
            </div>
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
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
                Description
              </h3>
              <p className="text-sm text-gray-600">{position.description}</p>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <div className="flex items-start gap-3">
                <Repeat className="h-5 w-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-2">
                    Repositioning Plan
                  </h3>
                  <p className="text-sm text-gray-700">{position.repositioning}</p>
                </div>
              </div>
            </div>
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

export default MarshalDetailsModal;

