import React, {useEffect, useRef} from "react";

interface Props {
    ref: React.RefObject<HTMLDivElement>,
    isLoading: boolean,
    canLoad: boolean,
    callback: () => void,
}
export const useObserver = ({ref, isLoading, canLoad, callback}: Props) => {
    const observer = useRef<any>();
    useEffect(() => {
        if (isLoading) return; // if posts are loading we don't create new observer

        const cb = function (entires: IntersectionObserverEntry[]) {
            if (entires[0].isIntersecting && canLoad) {// canLoad is condition for executing "if"
                callback();
            }
        }

        observer.current = new IntersectionObserver(cb); // create new observer with callback
        setTimeout(observer.current.observe(ref.current), 850); //add timeout function in order to call and execute our callback correctly

        return () => {
            if (observer.current) observer.current.disconnect(); // disconnect observer when our code is executed
        };

    }, [isLoading, canLoad, callback]);
}