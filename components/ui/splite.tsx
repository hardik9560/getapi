'use client'

import { Suspense, lazy } from 'react'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
    scene: string
    className?: string
}

export function SplineScene({ scene, className }: SplineSceneProps) {
    return (
        <Suspense
            fallback={
                <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ width: 48, height: 48, borderRadius: "50%", border: "3px solid rgba(63,114,175,0.15)", borderTopColor: "#3F72AF", animation: "spin 0.8s linear infinite" }} />
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </div>
            }
        >
            <Spline scene={scene} className={className} />
        </Suspense>
    )
}
