export default function LoadingOverlay({ show = false }) {
    if (!show) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 z-[9999]">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-500 border-t-transparent"></div>
        </div>
    );
}
