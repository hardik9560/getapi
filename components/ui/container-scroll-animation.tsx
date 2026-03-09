"use client";
import React, { useRef } from "react";
import { useScroll, useTransform, motion, MotionValue } from "framer-motion";

export const ContainerScroll = ({
    titleComponent,
    children,
}: {
    titleComponent: string | React.ReactNode;
    children: React.ReactNode;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({ target: containerRef });
    const [isMobile, setIsMobile] = React.useState(false);

    React.useEffect(() => {
        const check = () => setIsMobile(window.innerWidth <= 768);
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    const scaleDimensions = () => (isMobile ? [0.7, 0.9] : [1.05, 1]);

    const rotate = useTransform(scrollYProgress, [0, 1], [20, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions());
    const translate = useTransform(scrollYProgress, [0, 1], [0, -100]);

    return (
        <div
            ref={containerRef}
            style={{
                height: "80rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                padding: 20,
            }}
        >
            <div style={{ paddingTop: 160, paddingBottom: 160, width: "100%", position: "relative", perspective: "1000px" }}>
                <Header translate={translate} titleComponent={titleComponent} />
                <Card rotate={rotate} translate={translate} scale={scale}>
                    {children}
                </Card>
            </div>
        </div>
    );
};

export const Header = ({ translate, titleComponent }: { translate: MotionValue<number>; titleComponent: React.ReactNode }) => (
    <motion.div style={{ translateY: translate }}>
        <div style={{ maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
            {titleComponent}
        </div>
    </motion.div>
);

export const Card = ({
    rotate,
    scale,
    children,
}: {
    rotate: MotionValue<number>;
    scale: MotionValue<number>;
    translate: MotionValue<number>;
    children: React.ReactNode;
}) => (
    <div style={{ maxWidth: 960, width: "100%", margin: "-48px auto 0" }}>
        <motion.div
            style={{
                rotateX: rotate,
                scale,
                boxShadow: "0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003",
                border: "3px solid #1e3a5c",
                padding: 8,
                background: "#0d1f35",
                borderRadius: 28,
                width: "100%",
                height: "clamp(320px, 42vw, 640px)",
            }}
        >
            <div style={{ height: "100%", width: "100%", overflow: "hidden", borderRadius: 20, background: "#F9F7F7" }}>
                {children}
            </div>
        </motion.div>
    </div>
);
