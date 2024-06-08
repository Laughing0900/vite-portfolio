const WithFooter = () => {
    return (
        <>
            <div className="pointer-events-none relative z-30 h-dvh bg-gray-700"></div>
            <footer className="fixed bottom-0 left-0 right-0 top-auto -z-[100] h-screen bg-black text-white">
                {/* todo bottom wrapper     will-change: opacity;
    opacity: 0.84093; */}
                Footer !
            </footer>
        </>
    );
};

export default WithFooter;
