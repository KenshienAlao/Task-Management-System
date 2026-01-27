"use client"
import { useSearchParams } from 'next/navigation'

export default function Error() {
    const searchParams = useSearchParams()
    const errorMessage = searchParams.get('message') || "Something went wrong.";

    return (
        <section className="min-h-screen flex justify-center items-center flex-col bg-background text-foreground">
            <div className="mx-auto text-center">
                <h1 className="text-4xl font-bold text-red-600 mb-4">Error</h1>
                <p className="text-lg text-foreground">{errorMessage}</p>
                <p className="text-mini mt-2">Please try again later.</p>
            </div>
            <a href="/" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Go to Home</a>
        </section>
    );
}